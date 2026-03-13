import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

import { supabase } from './supabase.js';
import { SOURCE_SYSTEMS, NETSUITE_RECORDS, SOURCE_FIELD_MAP, TARGET_FIELD_MAP } from './data/fields.js';
import { SourceFieldNode, TargetFieldNode, GroupHeaderNode } from './components/FieldNode.jsx';
import { MappingEdge } from './components/MappingEdge.jsx';
import { NotesPanel } from './components/NotesPanel.jsx';

// ── Layout constants ──────────────────────────────────────────────────────────
const COL_SOURCE = 0;
const COL_TARGET = 640;
const NODE_H     = 38;
const NODE_W     = 280;
const GAP        = 6;
const GROUP_H    = 44;

// ── Build static nodes from field definitions ─────────────────────────────────
function buildStaticNodes() {
  const nodes = [];
  let yLeft = 0;

  SOURCE_SYSTEMS.forEach(sys => {
    sys.groups.forEach(grp => {
      nodes.push({
        id:        `gh-${sys.id}-${grp.label}`,
        type:      'groupHeader',
        position:  { x: COL_SOURCE, y: yLeft },
        data:      { label: grp.label, system: sys.label, color: sys.color },
        draggable: false,
        selectable: false,
        style:     { width: NODE_W },
      });
      yLeft += GROUP_H + GAP;

      grp.fields.forEach(field => {
        nodes.push({
          id:        field.id,
          type:      'sourceField',
          position:  { x: COL_SOURCE, y: yLeft },
          data:      { label: field.label, system: sys.label, color: sys.color },
          draggable: false,
          selectable: false,
          style:     { width: NODE_W },
        });
        yLeft += NODE_H + GAP;
      });
      yLeft += 16;
    });
    yLeft += 24;
  });

  let yRight = 0;
  NETSUITE_RECORDS.forEach(rec => {
    nodes.push({
      id:        `gh-ns-${rec.id}`,
      type:      'groupHeader',
      position:  { x: COL_TARGET, y: yRight },
      data:      { label: rec.label, system: 'NetSuite', color: rec.color },
      draggable: false,
      selectable: false,
      style:     { width: NODE_W },
    });
    yRight += GROUP_H + GAP;

    rec.fields.forEach(field => {
      nodes.push({
        id:        field.id,
        type:      'targetField',
        position:  { x: COL_TARGET, y: yRight },
        data:      { label: field.label, record: rec.label, color: rec.color },
        draggable: false,
        selectable: false,
        style:     { width: NODE_W },
      });
      yRight += NODE_H + GAP;
    });
    yRight += 24;
  });

  return nodes;
}

const STATIC_NODES = buildStaticNodes();

const NODE_TYPES = {
  sourceField: SourceFieldNode,
  targetField: TargetFieldNode,
  groupHeader: GroupHeaderNode,
};

const EDGE_TYPES = { mappingEdge: MappingEdge };

// ── Presence avatar color (deterministic) ─────────────────────────────────────
function presenceColor(name = '') {
  const palette = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % palette.length;
  return palette[h];
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser]         = useState(null);
  const [displayName, setDisplay] = useState('');
  const [loading, setLoading]   = useState(true);
  const [saveStatus, setSave]   = useState('');
  const [presence, setPresence] = useState([]);
  const [activeEdge, setActiveEdge] = useState(null);

  const [nodes, , onNodesChange] = useNodesState(STATIC_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const channelRef  = useRef(null);
  const presRef     = useRef(null);

  // ── Auth ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        window.location.href = '/login/index.html';
        return;
      }
      setUser(session.user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session.user.id)
        .single();
      const name = profile?.display_name || session.user.email?.split('@')[0] || 'User';
      setDisplay(name);

      await loadMappings();
      subscribeRealtime(session.user.id, name);
      setLoading(false);
    });

    return () => {
      channelRef.current?.unsubscribe();
      presRef.current?.unsubscribe();
    };
  }, []);

  // ── Load ────────────────────────────────────────────────────────────────────
  async function loadMappings() {
    const { data, error } = await supabase
      .from('migration_mappings')
      .select('*')
      .order('created_at');
    if (error) { console.error('load:', error); return; }
    setEdges((data || []).map(rowToEdge));
  }

  function rowToEdge(row) {
    return {
      id:        row.id,
      source:    row.source_field,
      target:    row.target_field,
      type:      'mappingEdge',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 14, height: 14 },
      data: {
        notes:       row.notes || '',
        createdBy:   row.created_by_name || '',
        onNoteClick: openNotes,
      },
    };
  }

  // ── Realtime ────────────────────────────────────────────────────────────────
  function subscribeRealtime(userId, name) {
    const ch = supabase
      .channel('mapper-data')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'migration_mappings' }, ({ new: row }) => {
        if (row.created_by === userId) return;
        setEdges(prev => [...prev, rowToEdge(row)]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'migration_mappings' }, ({ new: row }) => {
        if (row.updated_by === userId) return;
        setEdges(prev => prev.map(e =>
          e.id === row.id ? { ...e, data: { ...e.data, notes: row.notes || '' } } : e
        ));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'migration_mappings' }, ({ old: row }) => {
        setEdges(prev => prev.filter(e => e.id !== row.id));
      })
      .subscribe();
    channelRef.current = ch;

    const pc = supabase.channel('mapper-presence');
    pc.on('presence', { event: 'sync' }, () => {
      const state = pc.presenceState();
      setPresence(Object.values(state).flat());
    })
    .subscribe(async status => {
      if (status === 'SUBSCRIBED') {
        await pc.track({ userId, name, ts: Date.now() });
      }
    });
    presRef.current = pc;
  }

  // ── Connect ─────────────────────────────────────────────────────────────────
  const onConnect = useCallback(async (connection) => {
    if (!user) return;
    if (edges.some(e => e.source === connection.source && e.target === connection.target)) return;

    const { data, error } = await supabase.from('migration_mappings').insert({
      source_field:    connection.source,
      target_field:    connection.target,
      notes:           '',
      created_by:      user.id,
      created_by_name: displayName,
      updated_by:      user.id,
      updated_by_name: displayName,
    }).select().single();

    if (error) { console.error('connect:', error); return; }

    setEdges(prev => addEdge(rowToEdge(data), prev));
    flashSaved();
  }, [user, displayName, edges]);

  // ── Notes ───────────────────────────────────────────────────────────────────
  function openNotes(edgeId) {
    setActiveEdge(edges.find(e => e.id === edgeId) || null);
  }

  async function saveNotes(edgeId, notes) {
    const { error } = await supabase
      .from('migration_mappings')
      .update({ notes, updated_by: user.id, updated_by_name: displayName, updated_at: new Date().toISOString() })
      .eq('id', edgeId);
    if (error) { console.error('save notes:', error); return; }

    setEdges(prev => prev.map(e =>
      e.id === edgeId ? { ...e, data: { ...e.data, notes } } : e
    ));
    setActiveEdge(prev => prev ? { ...prev, data: { ...prev.data, notes } } : null);
    flashSaved();
  }

  async function deleteEdge(edgeId) {
    const { error } = await supabase.from('migration_mappings').delete().eq('id', edgeId);
    if (error) { console.error('delete:', error); return; }
    setEdges(prev => prev.filter(e => e.id !== edgeId));
    setActiveEdge(null);
  }

  function flashSaved() {
    setSave('saved');
    setTimeout(() => setSave(''), 2500);
  }

  // Inject fresh onNoteClick into every edge (closure must reference current edges)
  const liveEdges = edges.map(e => ({
    ...e,
    data: { ...e.data, onNoteClick: openNotes },
  }));

  const activeSourceLabel = activeEdge ? (SOURCE_FIELD_MAP[activeEdge.source]?.label || activeEdge.source) : '';
  const activeTargetLabel = activeEdge ? (TARGET_FIELD_MAP[activeEdge.target]?.label || activeEdge.target) : '';

  if (loading) return <div className="mapper-loading">Loading...</div>;

  return (
    <div className="mapper-root">
      {/* ── Header ── */}
      <header className="mapper-header">
        <div className="mapper-header-left">
          <a href="/projects/netsuite/" className="mapper-back">← NetSuite</a>
          <div className="mapper-title-block">
            <span className="mapper-title">Data Migration Mapper</span>
            <span className="mapper-subtitle">GP · DocLink · UKG → NetSuite</span>
          </div>
        </div>
        <div className="mapper-header-right">
          <div className="mapper-presence">
            {presence.map((p, i) => (
              <span
                key={i}
                className="presence-dot"
                title={p.name}
                style={{ background: presenceColor(p.name) }}
              >
                {(p.name || '?')[0].toUpperCase()}
              </span>
            ))}
          </div>
          {saveStatus && <span className="mapper-save-status">Saved</span>}
          <span className="mapper-user">{displayName}</span>
        </div>
      </header>

      {/* ── Legend ── */}
      <div className="mapper-legend">
        <span className="legend-section">Source:</span>
        <span className="legend-dot" style={{ background: '#3b82f6' }}>GP</span>
        <span className="legend-dot" style={{ background: '#8b5cf6' }}>DocLink</span>
        <span className="legend-dot" style={{ background: '#10b981' }}>UKG</span>
        <span className="legend-arrow">→</span>
        <span className="legend-section">NetSuite:</span>
        <span className="legend-dot" style={{ background: '#f59e0b' }}>Vendor</span>
        <span className="legend-dot" style={{ background: '#ef4444' }}>Employee</span>
        <span className="legend-dot" style={{ background: '#06b6d4' }}>COA</span>
        <span className="legend-dot" style={{ background: '#f97316' }}>Bill</span>
        <span className="legend-tip">
          Drag a field's right handle to a destination field's left handle to map. Click the dot on a line to add notes.
        </span>
      </div>

      {/* ── Canvas ── */}
      <div className="mapper-canvas">
        <ReactFlow
          nodes={nodes}
          edges={liveEdges}
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={(_, edge) => openNotes(edge.id)}
          fitView
          fitViewOptions={{ padding: 0.08 }}
          minZoom={0.15}
          maxZoom={1.5}
          deleteKeyCode={null}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={20} size={1} />
          <Controls showInteractive={false} />
          <MiniMap
            nodeColor={n => {
              if (n.type === 'sourceField') return SOURCE_FIELD_MAP[n.id]?.color || '#6366f1';
              if (n.type === 'targetField') return TARGET_FIELD_MAP[n.id]?.color || '#f59e0b';
              return '#0f172a';
            }}
            maskColor="rgba(8,15,26,0.75)"
            style={{ background: '#0f172a', border: '1px solid #1e293b' }}
          />
        </ReactFlow>
      </div>

      {/* ── Notes panel ── */}
      <NotesPanel
        edge={activeEdge}
        sourceLabel={activeSourceLabel}
        targetLabel={activeTargetLabel}
        onSave={saveNotes}
        onDelete={deleteEdge}
        onClose={() => setActiveEdge(null)}
      />
    </div>
  );
}
