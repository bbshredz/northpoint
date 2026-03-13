import { getBezierPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react';

export function MappingEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, data, selected,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  const hasNotes = data?.notes?.trim().length > 0;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? '#f59e0b' : hasNotes ? '#6366f1' : '#4b5563',
          strokeWidth: selected ? 2.5 : 1.5,
          opacity: selected ? 1 : 0.75,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
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
