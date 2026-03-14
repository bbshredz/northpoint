import { getBezierPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react';
import { TRANSFORM_MAP } from '../data/fields.js';

export function MappingEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, data, selected,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  const hasNotes = data?.notes?.trim().length > 0;
  const typeInfo = TRANSFORM_MAP[data?.transformType || 'tbd'] || TRANSFORM_MAP.tbd;
  const isTyped  = data?.transformType && data.transformType !== 'tbd';

  const edgeColor = selected ? '#f59e0b' : typeInfo.color;
  const edgeOpacity = selected ? 1 : isTyped ? 0.85 : 0.5;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: edgeColor,
          strokeWidth: selected ? 2.5 : 1.5,
          opacity: edgeOpacity,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
          className="nodrag nopan"
        >
          <span
            className={`edge-type-pill${selected ? ' edge-type-selected' : ''}`}
            style={{ '--type-color': typeInfo.color }}
            onClick={() => data?.onNoteClick?.(id)}
            title={`Transform type: ${typeInfo.label}`}
          >
            {typeInfo.short}
          </span>
          <button
            className={`edge-note-btn${hasNotes ? ' has-notes' : ''}${selected ? ' selected' : ''}`}
            onClick={() => data?.onNoteClick?.(id)}
            title={hasNotes ? 'View / edit notes' : 'Add transformation notes'}
          >
            {hasNotes ? 'N' : '+'}
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
