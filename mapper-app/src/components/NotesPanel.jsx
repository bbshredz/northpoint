import { useState, useEffect } from 'react';

export function NotesPanel({ edge, sourceLabel, targetLabel, onSave, onDelete, onClose }) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setNotes(edge?.data?.notes || '');
  }, [edge?.id]);

  if (!edge) return null;

  function handleSave() {
    onSave(edge.id, notes.trim());
  }

  function handleDelete() {
    if (confirm('Remove this mapping?')) onDelete(edge.id);
  }

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
        <label className="notes-label">Transformation Notes</label>
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Describe the transformation logic, scripts, lookup tables, or dependencies on other integrations..."
          rows={6}
          autoFocus
        />
      </div>

      <div className="notes-panel-footer">
        <button className="notes-delete-btn" onClick={handleDelete}>Remove Mapping</button>
        <div className="notes-panel-actions">
          <button className="notes-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="notes-save-btn" onClick={handleSave}>Save Notes</button>
        </div>
      </div>
    </div>
  );
}
