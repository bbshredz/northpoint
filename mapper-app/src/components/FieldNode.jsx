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
  return (
    <div className="field-node target-node" style={{ '--node-color': data.color }}>
      <Handle type="target" position={Position.Left} />
      <div className="field-label">{data.label}</div>
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
