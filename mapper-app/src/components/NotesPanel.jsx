import { useState, useEffect } from 'react';
import { TRANSFORM_TYPES } from '../data/fields.js';

export function NotesPanel({ edge, sourceLabel, targetLabel, onSave, onDelete, onClose }) {
  const [notes, setNotes]             = useState('');
  const [transformType, setTransform] = useState('tbd');

  useEffect(() => {
    setNotes(edge?.data?.notes || '');
    setTransform(edge?.data?.transformType || 'tbd');
  }, [edge?.id]);

  if (!edge) return null;

  function handleSave() {
    onSave(edge.id, notes.trim(), transformType);
  }

  function handleDelete() {
    if (confirm('Remove this mapping?')) onDelete(edge.id);
  }

  const selectedType = TRANSFORM_TYPES.find(t => t.value === transformType) || TRANSFORM_TYPES[0];

  return (
    <div className="notes-panel open">
      <div className="notes-panel-header">
        <div className="notes-mapping-info">
          <span className="notes-source">{sourceLabel}</span>
          <span className="notes-arrow"> → </span>
          <span className="notes-target">{targetLabel}</span>
        </div>
        <button className="notes-close-btn" onClick={onClose} title="Close">×</button>
      </div>

      <div className="notes-panel-body">
        <label className="notes-label">Transformation Type</label>
        <div className="notes-type-row">
          {TRANSFORM_TYPES.map(t => (
            <button
              key={t.value}
              className={`notes-type-btn${transformType === t.value ? ' active' : ''}`}
              style={{ '--type-color': t.color }}
              onClick={() => setTransform(t.value)}
              title={t.label}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="notes-label" style={{ marginTop: 10 }}>Transformation Notes</label>
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Describe the transformation logic, lookup tables, scripts, or dependencies..."
          rows={5}
          autoFocus
        />
      </div>

      <div className="notes-panel-footer">
        <button className="notes-delete-btn" onClick={handleDelete}>Remove Mapping</button>
        <div className="notes-panel-actions">
          <button className="notes-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="notes-save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
