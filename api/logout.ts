import { buildExpiredSessionCookie } from '../lib/auth.js';

export function POST(request: Request) {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'set-cookie': buildExpiredSessionCookie(new URL(request.url).protocol === 'https:'),
    },
  });
}

export function GET(request: Request) {
  return new Response(null, {
    status: 302,
    headers: {
      location: '/login.html',
      'cache-control': 'no-store',
      'set-cookie': buildExpiredSessionCookie(new URL(request.url).protocol === 'https:'),
    },
  });
}
