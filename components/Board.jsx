'use client';
import { useState } from 'react';
import { PROJECT_STAGES as statuses, EMPTY_PROJECT as blank } from '../lib/config/workspace.js';
import ProjectEditor from './board/ProjectEditor.jsx';
export default function Board({ initial }) {
  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('Board');
  const [edit, setEdit] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function save(item, action = 'save') {
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, item }),
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error);
      setItems(data.board);
      setEdit(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  const visible = items.filter((p) =>
    [p.name, p.client, p.owner].join(' ').toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className="admin-main board-main">
      <div className="page-heading">
        <div>
          <p className="eyebrow">FROM IDEA TO INSTALLATION</p>
          <h1>Project Board</h1>
          <p className="admin-subtitle">A clear view of every project, at every stage.</p>
        </div>
        <button className="pill dark" onClick={() => setEdit({ ...blank })}>
          ＋ New project
        </button>
      </div>
      <div className="board-tools">
        <div className="view-switch">
          {['Board', 'Table'].map((v) => (
            <button className={view === v ? 'selected' : ''} key={v} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </div>
        <input
          aria-label="Search projects"
          placeholder="Search projects, clients or owners…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>{items.length} projects</span>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {view === 'Board' ? (
        <div className="kanban">
          {statuses.map((status, i) => (
            <section
              className={'kanban-column stage-' + i}
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const item = items.find((p) => p.id === e.dataTransfer.getData('text/plain'));
                if (item && !busy) save({ ...item, status });
              }}
            >
              <h2>
                <span className="status-dot" />
                {status}
                <small>{visible.filter((p) => p.status === status).length}</small>
              </h2>
              {visible
                .filter((p) => p.status === status)
                .map((p) => (
                  <button
                    className="project-task"
                    key={p.id}
                    draggable={!busy}
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', p.id)}
                    onClick={() => setEdit({ ...p })}
                  >
                    <span className={'priority priority-' + p.priority}>{p.priority}</span>
                    <h3>{p.name}</h3>
                    <p>{p.client || 'Client to be confirmed'}</p>
                    <div>
                      <span>{p.owner || 'Unassigned'}</span>
                      <small>{p.due || 'No due date'}</small>
                    </div>
                  </button>
                ))}
              <button className="add-card" onClick={() => setEdit({ ...blank, status })}>
                ＋ Add project
              </button>
            </section>
          ))}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="board-table">
            <thead>
              <tr>
                {['Project', 'Client', 'Stage', 'Owner', 'Due date', 'Priority', ''].map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.client || '—'}</td>
                  <td>
                    <select
                      aria-label={'Stage for ' + p.name}
                      value={p.status}
                      disabled={busy}
                      onChange={(e) => save({ ...p, status: e.target.value })}
                    >
                      {statuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>{p.owner || '—'}</td>
                  <td>{p.due || '—'}</td>
                  <td>{p.priority}</td>
                  <td>
                    <button onClick={() => setEdit({ ...p })}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length && (
            <p className="empty-note">No projects yet. Add your first project to get started.</p>
          )}
        </div>
      )}
      <p className="board-hint">Drag a card to change its stage, or open it to edit the details.</p>
      {edit && (
        <ProjectEditor edit={edit} setEdit={setEdit} busy={busy} error={error} save={save} />
      )}
    </main>
  );
}
