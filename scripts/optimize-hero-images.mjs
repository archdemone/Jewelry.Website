#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC_DIR = path.resolve('public/images/header');
const OUT_DIR = SRC_DIR; // write optimized formats next to originals

const targets = [
  { width: 1920, quality: 70, suffix: '1920' },
  { width: 1280, quality: 70, suffix: '1280' },
  { width: 768, quality: 70, suffix: '768' }
];

const isHero = (name) =>
  /hero|banner|slide/i.test(name) || name.startsWith('hero') || name.startsWith('banner');

const files = fs.readdirSync(SRC_DIR).filter(f =>
  /\.(jpe?g|png|webp|avif)$/i.test(f) && isHero(f) && !f.includes('-1920') && !f.includes('-1280') && !f.includes('-768') && !f.includes('-blur')
);

if (!files.length) {
  console.log('No hero images found in public/images/header');
  process.exit(0);
}

console.log(`Found ${files.length} hero images to optimize:`);
files.forEach(f => console.log(`  - ${f}`));

async function optimize(file) {
  const inFile = path.join(SRC_DIR, file);
  const base = file.replace(/\.(jpe?g|png|webp|avif)$/i, '');
  const buf = fs.readFileSync(inFile);

  console.log(`\nOptimizing: ${file}`);

  for (const { width, quality, suffix } of targets) {
    // WebP
    const webpOut = path.join(OUT_DIR, `${base}-${suffix}.webp`);
    await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(webpOut);
    
    const webpStats = fs.statSync(webpOut);
    console.log(`  ✓ ${suffix}.webp: ${(webpStats.size / 1024).toFixed(1)}KB`);

    // AVIF (for modern browsers)
    const avifOut = path.join(OUT_DIR, `${base}-${suffix}.avif`);
    await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality, effort: 6 })
      .toFile(avifOut);
    
    const avifStats = fs.statSync(avifOut);
    console.log(`  ✓ ${suffix}.avif: ${(avifStats.size / 1024).toFixed(1)}KB`);
  }

  // Generate tiny blur placeholder for first image only
  if (base === 'hero-1') {
    const blurOut = path.join(OUT_DIR, `${base}-blur.webp`);
    await sharp(buf)
      .resize(24, 24, { fit: 'cover' })
      .webp({ quality: 30 })
      .toFile(blurOut);
    
    const blurStats = fs.statSync(blurOut);
    console.log(`  ✓ blur.webp: ${(blurStats.size / 1024).toFixed(1)}KB`);
  }
}

Promise.all(files.map(optimize))
  .then(() => {
    console.log('\n✅ Hero images optimized successfully!');
    console.log('\nOptimized files created:');
    console.log('- hero-1-1920.webp (LCP target)');
    console.log('- hero-1-1280.webp (tablet)');
    console.log('- hero-1-768.webp (mobile)');
    console.log('- hero-1-blur.webp (placeholder)');
    console.log('- AVIF versions for modern browsers');
  })
  .catch(err => { 
    console.error('❌ Error optimizing images:', err); 
    process.exit(1); 
  });
