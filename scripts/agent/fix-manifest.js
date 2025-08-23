#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }
function b64ToFile(b64, outPath){ const buf=Buffer.from(b64,'base64'); ensureDir(path.dirname(outPath)); fs.writeFileSync(outPath, buf); }

(function(){
  const root = process.cwd();
  const publicDir = path.join(root,'public');
  const iconsDir = path.join(publicDir,'icons');
  ensureDir(iconsDir);

  // Backup any dynamic manifest route files so they don’t conflict
  const candidates = [
    'app/manifest.ts','app/manifest.tsx','app/manifest.js',
    'src/app/manifest.ts','src/app/manifest.tsx','src/app/manifest.js'
  ];
  for (const rel of candidates) {
    const p = path.join(root, rel);
    if (fs.existsSync(p) && !fs.existsSync(p + '.bak')) {
      fs.renameSync(p, p + '.bak');
      console.log('Backed up dynamic manifest:', rel);
    }
  }

  // Minimal placeholder icons (replace later with real assets)
  const png1x1 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
  const iconPaths = ['icon-192.png','icon-512.png','maskable-192.png','maskable-512.png']
    .map(n => path.join(iconsDir,n));
  for (const f of iconPaths) if (!fs.existsSync(f)) b64ToFile(png1x1, f);

  const staticManifest = path.join(publicDir,'manifest.webmanifest');
  const manifest = {
    name: 'Jewelry Website',
    short_name: 'Jewelry',
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#111111',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
  fs.writeFileSync(staticManifest, JSON.stringify(manifest,null,2));
  console.log(JSON.stringify({ ok:true, staticManifest: path.relative(root, staticManifest) }, null, 2));
})();
