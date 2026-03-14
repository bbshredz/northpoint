import { Handle, Position } from '@xyflow/react';

export function SourceFieldNode({ data }) {
  return (
    <div className="field-node source-node" style={{ '--node-color': data.color }}>
      <div className="field-label">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function TargetFieldNode({ data }) {
  const reqUnmapped = data.required && !data.isMapped;
  const reqMapped   = data.required && data.isMapped;

  return (
    <div
      className={`field-node target-node${reqUnmapped ? ' req-unmapped' : ''}`}
      style={{ '--node-color': reqUnmapped ? '#ef4444' : data.color }}
    >
      <Handle type="target" position={Position.Left} />
      <div className="field-label">{data.label}</div>
      {data.required && (
        <span className={`req-badge${reqMapped ? ' req-badge-ok' : ''}`}>REQ</span>
      )}
    </div>
  );
}

export function GroupHeaderNode({ data }) {
  return (
    <div className="group-header-node" style={{ '--node-color': data.color }}>
      <div className="group-header-system">{data.system}</div>
      <div className="group-header-label">{data.label}</div>
    </div>
  );
}
