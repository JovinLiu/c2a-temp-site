import { NextResponse } from 'next/server';
import { authenticated, sameOrigin } from '../../../lib/server/auth';
import { readStore, mutateStore } from '../../../lib/server/store';
import { applyProjectAction } from '../../../lib/domain/projects.js';
export async function GET() {
  if (!(await authenticated()))
    return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
  return NextResponse.json(await readStore(), { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(request) {
  if (!(await authenticated()))
    return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const { action, item } = await request.json();
    const result = await mutateStore((db) => applyProjectAction(db, action, item));
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Could not save project.' }, { status: 400 });
  }
}
