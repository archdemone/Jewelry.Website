#!/usr/bin/env node
const http = require('http');

function check(url, attempts = 3, timeoutMs = 3000) {
  return new Promise((resolve) => {
    let tries = 0;
    const tryOnce = () => {
      tries += 1;
      const req = http.get(url, (res) => {
        res.resume(); // discard body
        resolve({ url, status: res.statusCode });
      });
      req.on('error', () => {
        if (tries < attempts) setTimeout(tryOnce, 300);
        else resolve({ url, status: 0 });
      });
      req.setTimeout(timeoutMs, () => {
        req.destroy();
        if (tries < attempts) setTimeout(tryOnce, 300);
        else resolve({ url, status: 0 });
      });
    };
    tryOnce();
  });
}

(async () => {
  const urls = [
    'http://localhost:3000/',
    'http://localhost:3001/',
    'http://localhost:3001/manifest.webmanifest'
  ];
  const checks = await Promise.all(urls.map((u) => check(u)));
  const ok = checks.every((c) => c.status === 200);
  const result = { ok, checks };
  // Always valid JSON, pretty printed
  console.log(JSON.stringify(result, null, 2));
  process.exit(ok ? 0 : 1);
})();
