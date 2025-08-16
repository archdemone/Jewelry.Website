const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

function hashString(str) {
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
	}
	return h >>> 0;
}

function hsl(h, s, l) {
	return `hsl(${h % 360}, ${s}%, ${l}%)`;
}

function buildGradientSVG(seedText) {
	const h = hashString(seedText);
	const h1 = h % 360;
	const h2 = (h1 + 37) % 360;
	const h3 = (h1 + 74) % 360;
	const g1 = hsl(h1, 60, 45);
	const g2 = hsl(h2, 70, 30);
	const g3 = hsl(h3, 65, 20);
	return `<?xml version="1.0" encoding="UTF-8"?>
	<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
		<defs>
			<radialGradient id="rg" cx="30%" cy="30%" r="80%">
				<stop offset="0%" stop-color="${g1}"/>
				<stop offset="60%" stop-color="${g2}"/>
				<stop offset="100%" stop-color="${g3}"/>
			</radialGradient>
		</defs>
		<rect width="800" height="800" fill="url(#rg)"/>
	</svg>`;
}

function buildRingSVG(seedText, label) {
	// Colors derived from seed
	const h = hashString(seedText);
	const gold = `hsl(${(h % 360)}, 65%, 55%)`;
	const metal = `hsl(${((h + 120) % 360)}, 20%, 85%)`;
	const gem = `hsl(${((h + 200) % 360)}, 70%, 50%)`;
	// Simple ring + gemstone + sparkles
	return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
	<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
		<g transform="translate(400,420)">
			<circle cx="0" cy="0" r="180" fill="none" stroke="${metal}" stroke-width="44"/>
			<circle cx="0" cy="0" r="180" fill="none" stroke="${gold}" stroke-width="16" stroke-dasharray="8 6"/>
		</g>
		<g transform="translate(400,220)">
			<polygon points="0,-40 36,0 0,40 -36,0" fill="${gem}" stroke="white" stroke-width="6"/>
			<rect x="-18" y="36" width="36" height="20" rx="6" fill="${metal}"/>
		</g>
		<g fill="white" opacity="0.9">
			<circle cx="560" cy="180" r="3"/>
			<circle cx="600" cy="160" r="2"/>
			<circle cx="580" cy="140" r="1.5"/>
		</g>
		<text x="400" y="740" font-size="36" text-anchor="middle" fill="white" opacity="0.9" font-family="Segoe UI, Arial, sans-serif">${label}</text>
	</svg>`);
}

async function generateOne(file) {
	const label = file.replace(/-/g, ' ').replace(/\.jpg$/i, '');
	const gradient = Buffer.from(buildGradientSVG(file));
	const ring = buildRingSVG(file, label);
	const outPath = path.join(OUT_DIR, file);
	const base = await sharp(gradient).jpeg({ quality: 86 }).toBuffer();
	await sharp(base)
		.composite([{ input: ring, gravity: 'center' }])
		.jpeg({ quality: 86 })
		.toFile(outPath);
}

(async function main() {
	console.log('🎨 Generating ring-themed images with Sharp...');
	let ok = 0, fail = 0;
	for (const f of FILES) {
		try {
			await generateOne(f);
			ok++;
			console.log(`✓ ${f}`);
		} catch (e) {
			fail++;
			console.error(`✗ ${f}:`, e.message);
		}
	}
	console.log(`\n📊 Summary  ✓ ${ok}  ✗ ${fail}  total ${FILES.length}`);
})();
