const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Expected filenames mapped to keyword groups for relevance
const SPECS = [
  // Engagement rings
  ['classic-solitaire-engagement-ring-1.jpg', 'jewelry,ring,solitaire,diamond'],
  ['classic-solitaire-engagement-ring-2.jpg', 'jewelry,ring,solitaire,proposal'],
  ['vintage-halo-ring-1.jpg', 'jewelry,ring,vintage,halo'],
  ['vintage-halo-ring-2.jpg', 'jewelry,ring,antique,halo'],
  ['modern-three-stone-ring-1.jpg', 'jewelry,ring,three-stone,modern'],
  ['modern-three-stone-ring-2.jpg', 'jewelry,ring,three-stone,luxury'],

  // Wedding bands
  ['hammered-wedding-band-1.jpg', 'jewelry,ring,band,hammered'],
  ['hammered-wedding-band-2.jpg', 'jewelry,ring,band,textured'],
  ['classic-plain-wedding-band-1.jpg', 'jewelry,ring,band,plain'],
  ['classic-plain-wedding-band-2.jpg', 'jewelry,ring,band,classy'],
  ['diamond-pave-wedding-band-1.jpg', 'jewelry,ring,band,diamond'],
  ['diamond-pave-wedding-band-2.jpg', 'jewelry,ring,band,pave'],

  // Eternity rings
  ['sapphire-eternity-ring-1.jpg', 'jewelry,ring,sapphire,eternity'],
  ['sapphire-eternity-ring-2.jpg', 'jewelry,ring,sapphire,blue'],
  ['diamond-eternity-ring-1.jpg', 'jewelry,ring,diamond,eternity'],
  ['diamond-eternity-ring-2.jpg', 'jewelry,ring,eternity,gemstone'],

  // Signet rings
  ['classic-signet-ring-1.jpg', 'jewelry,ring,signet,engraved'],
  ['classic-signet-ring-2.jpg', 'jewelry,ring,signet,crest'],

  // Statement rings
  ['emerald-statement-ring-1.jpg', 'jewelry,ring,emerald,green'],
  ['emerald-statement-ring-2.jpg', 'jewelry,ring,emerald,statement'],
  ['ruby-cocktail-ring-1.jpg', 'jewelry,ring,ruby,red'],
  ['ruby-cocktail-ring-2.jpg', 'jewelry,ring,ruby,cocktail'],

  // Stackable rings
  ['minimalist-gold-band-1.jpg', 'jewelry,ring,gold,minimalist'],
  ['minimalist-gold-band-2.jpg', 'jewelry,ring,gold,stackable'],
  ['diamond-accent-band-1.jpg', 'jewelry,ring,diamond,delicate'],
  ['diamond-accent-band-2.jpg', 'jewelry,ring,diamond,accent'],

  // Category images
  ['category-engagement-rings.jpg', 'jewelry,engagement,ring,romance'],
  ['category-wedding-bands.jpg', 'jewelry,wedding,bands'],
  ['category-eternity-rings.jpg', 'jewelry,eternity,ring'],
  ['category-signet-rings.jpg', 'jewelry,signet,ring'],
  ['category-statement-rings.jpg', 'jewelry,statement,ring'],
  ['category-stackable-rings.jpg', 'jewelry,stackable,ring'],

  // Placeholder
  ['placeholder.jpg', 'jewelry,ring,luxury'],
];

function fetchWithRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const doReq = (currentUrl, left) => {
      https
        .get(currentUrl, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            if (left <= 0) return reject(new Error('Too many redirects'));
            const next = res.headers.location.startsWith('http')
              ? res.headers.location
              : new URL(res.headers.location, currentUrl).toString();
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

async function downloadOne([file, keywords], idx) {
  const seed = idx + 101; // stable, unique per file
  const url = `https://loremflickr.com/800/800/${encodeURIComponent(keywords)}?lock=${seed}`;
  const out = path.join(OUTPUT_DIR, file);
  if (fs.existsSync(out)) {
    console.log(`✓ ${file} exists, skipping`);
    return;
  }
  const res = await fetchWithRedirects(url);
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(out);
    res.pipe(ws);
    ws.on('finish', () => ws.close(resolve));
    ws.on('error', (e) => {
      fs.unlink(out, () => reject(e));
    });
  });
}

(async function main() {
  console.log('🚀 Downloading unique jewelry images from LoremFlickr...');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  let ok = 0,
    fail = 0;
  for (let i = 0; i < SPECS.length; i++) {
    try {
      await downloadOne(SPECS[i], i);
      ok++;
      console.log(`✓ ${SPECS[i][0]}`);
    } catch (e) {
      fail++;
      console.error(`✗ ${SPECS[i][0]}: ${e.message}`);
    }
  }
  console.log('\n📊 Summary');
  console.log(`✓ Downloaded: ${ok}`);
  console.log(`✗ Failed: ${fail}`);
  console.log(`🖼️ Total: ${SPECS.length}`);
})();
