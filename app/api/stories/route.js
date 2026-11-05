import { NextResponse } from 'next/server';
import { authenticated, sameOrigin } from '../../../lib/server/auth';
import { handleStoryAction } from '../../../lib/server/stories.js';

export async function POST(request) {
  if (!(await authenticated()))
    return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    return NextResponse.json(await handleStoryAction(await request.formData()));
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Could not save story.' }, { status: 400 });
  }
}
