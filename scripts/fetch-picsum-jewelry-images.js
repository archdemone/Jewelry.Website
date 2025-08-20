const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Expected filenames per images.ts and prisma/seed.ts
const FILES = [
  // Engagement rings
  'classic-solitaire-engagement-ring-1.jpg',
  'classic-solitaire-engagement-ring-2.jpg',
  'vintage-halo-ring-1.jpg',
  'vintage-halo-ring-2.jpg',
  'modern-three-stone-ring-1.jpg',
  'modern-three-stone-ring-2.jpg',
  // Wedding bands
  'hammered-wedding-band-1.jpg',
  'hammered-wedding-band-2.jpg',
  'classic-plain-wedding-band-1.jpg',
  'classic-plain-wedding-band-2.jpg',
  'diamond-pave-wedding-band-1.jpg',
  'diamond-pave-wedding-band-2.jpg',
  // Eternity rings
  'sapphire-eternity-ring-1.jpg',
  'sapphire-eternity-ring-2.jpg',
  'diamond-eternity-ring-1.jpg',
  'diamond-eternity-ring-2.jpg',
  // Signet rings
  'classic-signet-ring-1.jpg',
  'classic-signet-ring-2.jpg',
  // Statement rings
  'emerald-statement-ring-1.jpg',
  'emerald-statement-ring-2.jpg',
  'ruby-cocktail-ring-1.jpg',
  'ruby-cocktail-ring-2.jpg',
  // Stackable rings
  'minimalist-gold-band-1.jpg',
  'minimalist-gold-band-2.jpg',
  'diamond-accent-band-1.jpg',
  'diamond-accent-band-2.jpg',
  // Categories
  'category-engagement-rings.jpg',
  'category-wedding-bands.jpg',
  'category-eternity-rings.jpg',
  'category-signet-rings.jpg',
  'category-statement-rings.jpg',
  'category-stackable-rings.jpg',
  // Placeholder
  'placeholder.jpg',
];

function fetchWithRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const doReq = (u, left) => {
      https
        .get(u, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            if (left <= 0) return reject(new Error('Too many redirects'));
            const next = res.headers.location.startsWith('http')
              ? res.headers.location
              : new URL(res.headers.location, u).toString();
            res.resume();
            return doReq(next, left - 1);
          }
          if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
          resolve(res);
        })
        .on('error', reject);
    };
    doReq(url, maxRedirects);
  });
}

async function streamToFile(res, outPath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(outPath);
    res.pipe(ws);
    ws.on('finish', () => ws.close(resolve));
    ws.on('error', (e) => {
      fs.unlink(outPath, () => reject(e));
    });
  });
}

async function downloadWithRetries(file, seedBase) {
  const outPath = path.join(OUT_DIR, file);
  if (fs.existsSync(outPath)) return;
  const attempts = [
    `https://picsum.photos/seed/${encodeURIComponent(seedBase)}/800/800`,
    `https://picsum.photos/seed/${encodeURIComponent(seedBase + '-alt')}/800/800`,
    // Fallback: deterministic placeholder to guarantee file creation
    `https://placehold.co/800x800/jpeg?text=${encodeURIComponent(seedBase)}`,
  ];
  let lastErr = null;
  for (const url of attempts) {
    try {
      const res = await fetchWithRedirects(url);
      await streamToFile(res, outPath);
      return;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Failed all attempts');
}

(async function main() {
  console.log('🚀 Fetching unique images (Picsum with fallback)...');
  console.log(`📁 Output: ${OUT_DIR}`);
  let ok = 0,
    fail = 0;
  for (let i = 0; i < FILES.length; i++) {
    const file = FILES[i];
    const seed = file.replace(/\.jpg$/i, '');
    try {
      await downloadWithRetries(file, seed);
      ok++;
      console.log(`✓ ${file}`);
    } catch (e) {
      fail++;
      console.error(`✗ ${file}: ${e.message}`);
    }
  }
  console.log('\n📊 Summary');
  console.log(`✓ Downloaded: ${ok}`);
  console.log(`✗ Failed: ${fail}`);
  console.log(`🖼️ Total: ${FILES.length}`);
})();
