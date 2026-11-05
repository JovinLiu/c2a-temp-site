import { PROJECT_STAGES as statuses, PROJECT_PRIORITIES } from '../../lib/config/workspace.js';
export default function ProjectEditor({ edit, setEdit, busy, error, save }) {
  return (
    <div className="modal-backdrop">
      <section className="edit-dialog" role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <div className="page-heading">
          <h2 id="edit-title">{edit.id ? 'Project details' : 'New project'}</h2>
          <button aria-label="Close project editor" disabled={busy} onClick={() => setEdit(null)}>
            ✕
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save(edit);
          }}
        >
          {[
            ['name', 'Project name'],
            ['client', 'Client'],
            ['owner', 'Project owner'],
            ['due', 'Due date'],
          ].map(([k, l]) => (
            <label key={k}>
              {l}
              <input
                autoFocus={k === 'name'}
                required={k === 'name'}
                maxLength={200}
                type={k === 'due' ? 'date' : 'text'}
                value={edit[k]}
                onChange={(e) => setEdit({ ...edit, [k]: e.target.value })}
              />
            </label>
          ))}
          <div className="two-fields">
            <label>
              Stage
              <select
                value={edit.status}
                onChange={(e) => setEdit({ ...edit, status: e.target.value })}
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Priority
              <select
                value={edit.priority}
                onChange={(e) => setEdit({ ...edit, priority: e.target.value })}
              >
                {PROJECT_PRIORITIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Notes
            <textarea
              maxLength={2000}
              rows={3}
              value={edit.notes}
              onChange={(e) => setEdit({ ...edit, notes: e.target.value })}
            />
          </label>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <div className="dialog-actions">
            {edit.id && (
              <button
                type="button"
                className="delete-button"
                disabled={busy}
                onClick={() => {
                  if (confirm('Delete this project?')) save(edit, 'delete');
                }}
              >
                Delete project
              </button>
            )}
            <button className="pill dark" disabled={busy}>
              {busy ? 'Saving…' : 'Save project'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
