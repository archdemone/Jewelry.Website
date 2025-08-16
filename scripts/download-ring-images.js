const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Map expected filenames to unique Unsplash Source queries (unique sig per file ensures unique URL)
const FILE_SPECS = [
	// Engagement rings
	{ file: 'classic-solitaire-engagement-ring-1.jpg', query: 'jewelry,engagement,solitaire,diamond' },
	{ file: 'classic-solitaire-engagement-ring-2.jpg', query: 'jewelry,engagement,solitaire,ring' },
	{ file: 'vintage-halo-ring-1.jpg', query: 'jewelry,vintage,halo,ring' },
	{ file: 'vintage-halo-ring-2.jpg', query: 'jewelry,antique,halo,ring' },
	{ file: 'modern-three-stone-ring-1.jpg', query: 'jewelry,three-stone,ring' },
	{ file: 'modern-three-stone-ring-2.jpg', query: 'jewelry,modern,three-stone,ring' },

	// Wedding bands
	{ file: 'hammered-wedding-band-1.jpg', query: 'jewelry,hammered,band,ring' },
	{ file: 'hammered-wedding-band-2.jpg', query: 'jewelry,matte,band,ring' },
	{ file: 'classic-plain-wedding-band-1.jpg', query: 'jewelry,plain,band,ring' },
	{ file: 'classic-plain-wedding-band-2.jpg', query: 'jewelry,classic,band,ring' },
	{ file: 'diamond-pave-wedding-band-1.jpg', query: 'jewelry,diamond,pave,band' },
	{ file: 'diamond-pave-wedding-band-2.jpg', query: 'jewelry,diamond,band,ring' },

	// Eternity rings
	{ file: 'sapphire-eternity-ring-1.jpg', query: 'jewelry,sapphire,eternity,ring' },
	{ file: 'sapphire-eternity-ring-2.jpg', query: 'jewelry,blue,gemstone,ring' },
	{ file: 'diamond-eternity-ring-1.jpg', query: 'jewelry,diamond,eternity,ring' },
	{ file: 'diamond-eternity-ring-2.jpg', query: 'jewelry,diamond,eternity,band' },

	// Signet rings
	{ file: 'classic-signet-ring-1.jpg', query: 'jewelry,signet,ring' },
	{ file: 'classic-signet-ring-2.jpg', query: 'jewelry,signet,engraved,ring' },

	// Statement rings
	{ file: 'emerald-statement-ring-1.jpg', query: 'jewelry,emerald,statement,ring' },
	{ file: 'emerald-statement-ring-2.jpg', query: 'jewelry,green,gemstone,ring' },
	{ file: 'ruby-cocktail-ring-1.jpg', query: 'jewelry,ruby,cocktail,ring' },
	{ file: 'ruby-cocktail-ring-2.jpg', query: 'jewelry,red,gemstone,ring' },

	// Stackable rings
	{ file: 'minimalist-gold-band-1.jpg', query: 'jewelry,minimalist,gold,band' },
	{ file: 'minimalist-gold-band-2.jpg', query: 'jewelry,stackable,gold,band' },
	{ file: 'diamond-accent-band-1.jpg', query: 'jewelry,diamond,accent,band' },
	{ file: 'diamond-accent-band-2.jpg', query: 'jewelry,delicate,diamond,band' },

	// Category images
	{ file: 'category-engagement-rings.jpg', query: 'jewelry,engagement,ring,showcase' },
	{ file: 'category-wedding-bands.jpg', query: 'jewelry,wedding,bands' },
	{ file: 'category-eternity-rings.jpg', query: 'jewelry,eternity,ring' },
	{ file: 'category-signet-rings.jpg', query: 'jewelry,signet,ring' },
	{ file: 'category-statement-rings.jpg', query: 'jewelry,statement,ring' },
	{ file: 'category-stackable-rings.jpg', query: 'jewelry,stackable,ring' },

	// Placeholder
	{ file: 'placeholder.jpg', query: 'jewelry,ring' },
];

// Follow redirects up to a limit
function fetchWithRedirects(url, maxRedirects = 5) {
	return new Promise((resolve, reject) => {
		const doRequest = (currentUrl, redirectsLeft) => {
			https.get(currentUrl, (res) => {
				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
					if (redirectsLeft <= 0) return reject(new Error('Too many redirects'));
					const nextUrl = res.headers.location.startsWith('http')
						? res.headers.location
						: new URL(res.headers.location, currentUrl).toString();
					res.resume();
					return doRequest(nextUrl, redirectsLeft - 1);
				}
				if (res.statusCode !== 200) {
					return reject(new Error(`HTTP ${res.statusCode} for ${currentUrl}`));
				}
				resolve(res);
			}).on('error', reject);
		};
		doRequest(url, maxRedirects);
	});
}

async function downloadOne(fileSpec, idx) {
	const sig = idx + 1; // unique per file
	const sourceUrl = `https://source.unsplash.com/800x800/?${encodeURIComponent(fileSpec.query)}&sig=${sig}`;
	const outPath = path.join(OUTPUT_DIR, fileSpec.file);

	if (fs.existsSync(outPath)) {
		console.log(`✓ ${fileSpec.file} exists, skipping`);
		return;
	}

	const res = await fetchWithRedirects(sourceUrl);
	return new Promise((resolve, reject) => {
		const fileStream = fs.createWriteStream(outPath);
		res.pipe(fileStream);
		fileStream.on('finish', () => {
			fileStream.close(() => resolve());
		});
		fileStream.on('error', (err) => {
			fs.unlink(outPath, () => reject(err));
		});
	});
}

async function main() {
	console.log('🚀 Downloading unique jewelry images...');
	console.log(`📁 Output: ${OUTPUT_DIR}`);
	let ok = 0; let fail = 0;
	for (let i = 0; i < FILE_SPECS.length; i++) {
		const spec = FILE_SPECS[i];
		try {
			await downloadOne(spec, i);
			ok++;
			console.log(`✓ ${spec.file}`);
		} catch (e) {
			fail++;
			console.error(`✗ ${spec.file}: ${e.message}`);
		}
	}
	console.log('');
	console.log('📊 Summary');
	console.log(`✓ Downloaded: ${ok}`);
	console.log(`✗ Failed: ${fail}`);
	console.log(`🖼️ Total: ${FILE_SPECS.length}`);
}

main().catch((e) => {
	console.error('Fatal:', e);
	process.exit(1);
});
