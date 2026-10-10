# C2A Cabinetry — Next.js website & workspace

First working version of the public website and private business workspace, built with Next.js App Router and React.

## Run locally

Use Node.js 20.9+ (Node.js 24 recommended).

```sh
npm install
cp .env.example .env.local
# Set ADMIN_USERNAME, ADMIN_PASSWORD and a random SESSION_SECRET of at least 32 characters.
npm run dev
```

Open http://127.0.0.1:3000. A local `.env.local` was already generated for this workspace; do not overwrite it unless changing the credentials. The username is `admin`; the generated password is in that file. Never commit it.

```sh
npm run build
npm start
```

Production uses Secure cookies and must be served over HTTPS. The scripts bind to localhost; use a reverse proxy for self-hosting.

## Public pages

- `/`: original video, frosted glass navigation, introduction and contact links.
- `/why-made-in-china`: editable introductory copy and a material study. Real factory photography/video is still needed.
- `/projects`: published project photographs, videos and descriptions. Real content is added in Publishing; no fabricated portfolio entries are seeded.
- `/projects/[id]`: project details and media gallery.
- `/about`: initial company copy and a clearly labelled factory-photo placeholder.
- `/login`: server-validated single-admin sign-in.

## Private workspace

- `/admin`: summary and feature entry points.
- `/admin/board`: create/edit/delete projects; six stages, drag between stages, table view, search, client, owner, due date, priority and notes.
- `/admin/agreements`: original preliminary design, supply/installation and installation-only agreement editors, with their calculations, browser autosave, JSON import/export and PDF printing.
- `/admin/publishing`: draft/published stories; upload JPG/PNG/WebP and MP4/WebM; edit descriptions, remove media, publish, unpublish and delete stories. Maximum 12 media per story; 50 MB per file and 60 MB per upload.

## Persistence and scope

This is a **local / single-process prototype**, not a completed cloud deployment.

Project board and stories use `.data/workspace.json`; media uses `.data/media`. Updates are serialised within one server process. Draft media is restricted to authenticated requests. Public media supports byte-range requests for video playback. Deleting stories or removing media detaches the file from public access but retains the binary on disk, allowing later recovery and avoiding accidental file destruction. Periodic storage cleanup is not implemented yet.

Contracts retain their existing browser-local storage, one current document per agreement type. They are not yet linked to Project Board records and do not sync across browsers. Export important agreements as JSON. If moving from the former Vite port/domain, export JSON there and import it in this app because localStorage belongs to each origin.

Before production deployment, replace the file adapter with a database and object storage, use durable shared rate limiting, and decide whether single-admin login or individual team accounts are appropriate. Vercel's ephemeral filesystem is not suitable for this storage adapter. Do not deploy this prototype to Vercel expecting uploaded content to persist. Keep `.env.local` and `.data` private and backed up.

Remaining editorial work: approved company wording, factory photos/video, completed project media. The current text is an initial draft.

## Verification

`npm run build` checks the production build. With the local development server running and `.env.local` configured:

```sh
node scripts/smoke-test.mjs
```

The smoke test checks public/protected routes, credentials, origin checks, board persistence, upload, draft privacy, publish/unpublish, byte ranges and logout. It creates uniquely named temporary records and removes those records afterwards.

The original Vite entry files are retained as legacy source; `app/` is the active application. `src/editors/` contains the reused agreement tools.
