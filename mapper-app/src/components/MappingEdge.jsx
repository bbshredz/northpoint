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

  // Move label 60% of the way from bezier midpoint toward target —
  // spreads labels vertically since targets are stacked, avoids midpoint pile-up
  const lx = labelX + (targetX - labelX) * 0.6;
  const ly = labelY + (targetY - labelY) * 0.6;

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
            transform: `translate(-50%, -50%) translate(${lx}px,${ly}px)`,
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
            title={`${typeInfo.label}${hasNotes ? ' · has notes' : ''} — click to edit`}
          >
            {typeInfo.short}{hasNotes && <span className="edge-pill-dot" />}
          </span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
