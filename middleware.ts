import { next } from '@vercel/functions';
import {
  readCookie,
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from './lib/auth.js';

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!login\\.html|api/login|api/logout|favicon\\.ico).*)'],
};

export default function middleware(request: Request) {
  const sessionSecret = process.env.SESSION_SECRET;
  const token = readCookie(request.headers.get('cookie'), SESSION_COOKIE_NAME);

  if (sessionSecret && verifySessionToken(token, sessionSecret)) {
    return next({
      headers: {
        'cache-control': 'private, no-store, max-age=0',
      },
    });
  }

  const requestedUrl = new URL(request.url);
  const loginUrl = new URL('/login.html', request.url);
  loginUrl.searchParams.set('returnTo', `${requestedUrl.pathname}${requestedUrl.search}`);
  return Response.redirect(loginUrl, 302);
}
