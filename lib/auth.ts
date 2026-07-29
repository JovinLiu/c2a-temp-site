import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE_NAME = 'c2a_agreement_session';
export const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

type SessionPayload = {
  exp: number;
  version: 1;
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createSessionToken(secret: string): string {
  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
    version: 1,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload, secret)}`;
}

export function verifySessionToken(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const [encodedPayload, suppliedSignature] = token.split('.');
  if (!encodedPayload || !suppliedSignature) return false;

  const expectedSignature = sign(encodedPayload, secret);
  if (!safeEqual(suppliedSignature, expectedSignature)) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    return payload.version === 1 && Number.isFinite(payload.exp) && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function readCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const prefix = `${name}=`;
  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
}

export function buildSessionCookie(token: string, secure = true): string {
  return [
    `${SESSION_COOKIE_NAME}=${token}`,
    'Path=/',
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    'HttpOnly',
    secure ? 'Secure' : '',
    'SameSite=Strict',
  ].filter(Boolean).join('; ');
}

export function buildExpiredSessionCookie(secure = true): string {
  return [
    `${SESSION_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    secure ? 'Secure' : '',
    'SameSite=Strict',
  ].filter(Boolean).join('; ');
}

export function passwordsMatch(submitted: string, configured: string): boolean {
  return safeEqual(submitted, configured);
}
