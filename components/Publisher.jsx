'use client';
import { useState } from 'react';
import Link from 'next/link';
import Media from './Media';
import { EMPTY_STORY as blank } from '../lib/config/workspace.js';
import StoryEditor from './publishing/StoryEditor.jsx';
export default function Publisher({ initial }) {
  const [stories, setStories] = useState(initial);
  const [edit, setEdit] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function save(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set('action', 'save');
    form.set('id', edit.id || '');
    form.set('published', String(edit.published));
    form.set('keep', JSON.stringify(edit.media.map((m) => m.name)));
    await send(form);
  }
  async function send(form) {
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/stories', { method: 'POST', body: form });
      const result = await response.json();
      if (!response.ok) throw Error(result.error);
      setStories(result);
      setEdit(null);
      setNotice(
        form.get('action') === 'delete'
          ? 'Story deleted.'
          : 'Story saved. Published stories are now visible on your website.',
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="admin-main">
      <div className="page-heading">
        <div>
          <p className="eyebrow">SHARE THE FINISHING TOUCH</p>
          <h1>Project stories</h1>
          <p className="admin-subtitle">
            Turn completed projects into inspiration for your next client.
          </p>
        </div>
        <button
          className="pill dark"
          onClick={() => {
            setEdit({ ...blank });
            setError('');
            setNotice('');
          }}
        >
          ＋ New story
        </button>
      </div>
      {notice && (
        <p className="form-message" role="status">
          {notice} <Link href="/projects">View Projects ↗</Link>
        </p>
      )}
      {!edit && error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {edit ? (
        <StoryEditor edit={edit} setEdit={setEdit} busy={busy} error={error} save={save} />
      ) : stories.length ? (
        <div className="story-admin-grid">
          {stories.map((s) => (
            <article key={s.id}>
              {s.media[0] ? (
                <Media item={s.media[0]} />
              ) : (
                <div className="draft-placeholder">No media yet</div>
              )}
              <div>
                <span className="eyebrow">{s.published ? '● Published' : '○ Draft'}</span>
                <h2>{s.title}</h2>
                <p>{s.location || s.category}</p>
                <div className="story-actions">
                  <button
                    onClick={() => {
                      setEdit({ ...s });
                      setError('');
                    }}
                  >
                    Edit story ↗
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this story?')) {
                        const f = new FormData();
                        f.set('action', 'delete');
                        f.set('id', s.id);
                        send(f);
                      }
                    }}
                    disabled={busy}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>↗</span>
          <h2>Your work deserves to be seen.</h2>
          <p>Add your first completed project with photographs, a film and a few words.</p>
          <button className="underlined" onClick={() => setEdit({ ...blank })}>
            Create your first story ↗
          </button>
        </div>
      )}
    </main>
  );
}
