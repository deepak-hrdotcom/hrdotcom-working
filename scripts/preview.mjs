import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// Serve only the demo app, not the workspace's other files or uploads.
const app = new URL('../test/test-2.html', import.meta.url);
const port = Number(process.env.PORT || 3000);
const routes = new Set(['/', '/test-2.html', '/test/test-2.html']);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://preview.invalid').pathname;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }
  if (pathname === '/favicon.ico') {
    response.writeHead(204);
    response.end();
    return;
  }
  if (!routes.has(pathname)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : 'Not found');
    return;
  }
  try {
    const html = await readFile(app);
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': html.length,
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : html);
  } catch (error) {
    console.error('Cannot read test/test-2.html:', error);
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : 'Cannot load test/test-2.html. Check the server log.');
  }
});

server.on('error', error => {
  console.error('Preview failed to start:', error.message);
  process.exit(1);
});
server.listen(port, '0.0.0.0', () => {
  console.log(`Daily desk preview listening on port ${port}`);
});
