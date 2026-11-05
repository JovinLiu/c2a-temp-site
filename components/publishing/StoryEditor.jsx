import Media from '../Media.jsx';
import { STORY_CATEGORIES, MEDIA_FORMATS } from '../../lib/config/workspace.js';
export default function StoryEditor({ edit, setEdit, busy, error, save }) {
  return (
    <section className="publisher-editor">
      <div className="page-heading">
        <h2>{edit.id ? 'Edit story' : 'A new project story'}</h2>
        <button disabled={busy} onClick={() => setEdit(null)}>
          Cancel
        </button>
      </div>
      <form onSubmit={save}>
        <label>
          Project title
          <input name="title" required maxLength={160} defaultValue={edit.title} />
        </label>
        <div className="two-fields">
          <label>
            Location
            <input
              name="location"
              maxLength={160}
              defaultValue={edit.location}
              placeholder="e.g. Melbourne, VIC"
            />
          </label>
          <label>
            Category
            <select name="category" defaultValue={edit.category}>
              {STORY_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Tell the story
          <textarea
            name="description"
            required
            maxLength={4000}
            rows={5}
            defaultValue={edit.description}
            placeholder="The brief, the materials, and the details that made it special."
          />
        </label>
        <label className="upload-area">
          ＋ Add photographs or videos
          <input name="media" type="file" multiple accept={Object.keys(MEDIA_FORMATS).join(',')} />
          <small>
            JPG, PNG, WebP, MP4 or WebM. Up to 12 files per story, 50 MB per file and 60 MB per
            upload.
          </small>
        </label>
        {edit.media.length > 0 && (
          <div className="media-thumbnails">
            {edit.media.map((m) => (
              <div key={m.name}>
                <Media item={m} />
                <button
                  type="button"
                  onClick={() =>
                    setEdit({ ...edit, media: edit.media.filter((x) => x.name !== m.name) })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="publish-check">
          <input
            type="checkbox"
            checked={edit.published}
            onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
          />
          Publish on the website <small>Leave unchecked to save as a private draft.</small>
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="pill dark" disabled={busy}>
          {busy ? 'Uploading & saving…' : edit.published ? 'Save & publish ↗' : 'Save draft'}
        </button>
      </form>
    </section>
  );
}
