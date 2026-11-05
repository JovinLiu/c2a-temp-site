// Runs the existing HTTP smoke checks against an isolated local server and temporary data.
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { once } from 'node:events';

const probe = net.createServer();
await new Promise((resolve) => probe.listen(0, '127.0.0.1', resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const directory = await mkdtemp(path.join(tmpdir(), 'c2a-integration-'));
const env = {
  ...process.env,
  NODE_ENV: 'development',
  ADMIN_USERNAME: 'test-admin',
  ADMIN_PASSWORD: randomBytes(24).toString('hex'),
  SESSION_SECRET: randomBytes(32).toString('hex'),
  DATA_DIR: directory,
  C2A_TEST_BASE_URL: `http://127.0.0.1:${port}`,
  C2A_SKIP_ENV_FILE: '1',
};
let output = '';
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port)],
  { env, stdio: ['ignore', 'pipe', 'pipe'] },
);
server.stdout.on('data', (chunk) => {
  output += chunk;
});
server.stderr.on('data', (chunk) => {
  output += chunk;
});
const serverExited = once(server, 'exit');
try {
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    if (server.exitCode !== null) throw Error('Test server exited: ' + output);
    try {
      const response = await fetch(env.C2A_TEST_BASE_URL, { signal: AbortSignal.timeout(2000) });
      ready = response.ok;
    } catch {}
    if (ready) break;
    await delay(500);
  }
  if (!ready) throw Error('Test server was not ready: ' + output);
  const checks = spawn(process.execPath, ['scripts/smoke-test.mjs'], { env, stdio: 'inherit' });
  const [code] = await once(checks, 'exit');
  if (code !== 0) throw Error('HTTP smoke checks failed.');
} finally {
  server.kill('SIGTERM');
  const forceStop = setTimeout(() => server.kill('SIGKILL'), 5000);
  await serverExited;
  clearTimeout(forceStop);
  await rm(directory, { recursive: true, force: true });
}
