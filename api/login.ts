import {
  buildSessionCookie,
  createSessionToken,
  passwordsMatch,
} from '../lib/auth.js';

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...headers,
    },
  });
}

export async function POST(request: Request) {
  const configuredPassword = process.env.APP_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!configuredPassword || !sessionSecret) {
    console.error('APP_PASSWORD or SESSION_SECRET is not configured.');
    return json({ ok: false, message: 'Server authentication is not configured.' }, 500);
  }

  let submittedPassword = '';
  try {
    const body = await request.json();
    submittedPassword = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return json({ ok: false, message: 'Invalid request.' }, 400);
  }

  if (!passwordsMatch(submittedPassword, configuredPassword)) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return json({ ok: false, message: 'Incorrect password.' }, 401);
  }

  const token = createSessionToken(sessionSecret);
  const secureCookie = new URL(request.url).protocol === 'https:';
  return json(
    { ok: true },
    200,
    { 'set-cookie': buildSessionCookie(token, secureCookie) },
  );
}

export function GET() {
  return json({ ok: false, message: 'Method not allowed.' }, 405, { allow: 'POST' });
}
