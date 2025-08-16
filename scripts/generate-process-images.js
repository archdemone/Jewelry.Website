#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const OUT_DIR = path.join(__dirname, '../public/images/process')

const images = [
	{ filename: 'workshop-hero.jpg', title: 'Workshop Overview', size: { w: 1920, h: 1080 } },
	{ filename: 'material-selection.jpg', title: 'Material Selection', size: { w: 1200, h: 800 } },
	{ filename: 'crafting-action.jpg', title: 'Crafting Action', size: { w: 1200, h: 800 } },
	{ filename: 'final-polish.jpg', title: 'Final Polish', size: { w: 1200, h: 800 } },
]

async function ensureDir(dir) {
	await fs.promises.mkdir(dir, { recursive: true })
}

function svgPlaceholder(width, height, title) {
	return `<?xml version="1.0" encoding="UTF-8"?>
	<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<defs>
			<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#FFE8B5"/>
				<stop offset="50%" stop-color="#FCD581"/>
				<stop offset="100%" stop-color="#F0B429"/>
			</linearGradient>
		</defs>
		<rect width="100%" height="100%" fill="url(#grad)"/>
		<g fill="rgba(0,0,0,0.15)">
			<circle cx="${width*0.2}" cy="${height*0.3}" r="${Math.min(width,height)*0.08}" />
			<circle cx="${width*0.8}" cy="${height*0.6}" r="${Math.min(width,height)*0.06}" />
			<rect x="${width*0.3}" y="${height*0.5}" width="${width*0.4}" height="${height*0.08}" rx="${height*0.02}" />
		</g>
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.min(width,height)*0.06}" fill="#1F2937" font-weight="700">${title}</text>
		<text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.min(width,height)*0.03}" fill="#374151">Image coming soon</text>
	</svg>`
}

async function generate() {
	await ensureDir(OUT_DIR)
	for (const img of images) {
		const outPath = path.join(OUT_DIR, img.filename)
		if (fs.existsSync(outPath)) {
			console.log(`✔️  Exists: ${img.filename}`)
			continue
		}
		const svg = svgPlaceholder(img.size.w, img.size.h, img.title)
		const buffer = Buffer.from(svg)
		await sharp(buffer)
			.jpeg({ quality: 85 })
			.toFile(outPath)
		console.log(`✅ Created: ${img.filename}`)
	}
	console.log('\nDone creating process placeholder images.')
}

if (require.main === module) {
	generate().catch((err) => {
		console.error('Failed to generate process images:', err)
		process.exit(1)
	})
}