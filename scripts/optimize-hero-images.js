#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const heroDir = path.join(process.cwd(), 'public', 'images', 'header');

async function optimizeHeroImages() {
  console.log('Optimizing hero images...');

  try {
    const files = fs.readdirSync(heroDir);
    const imageFiles = files.filter((file) => file.match(/\.(jpg|jpeg|png)$/i));

    for (const file of imageFiles) {
      const inputPath = path.join(heroDir, file);
      const outputPath = path.join(heroDir, `optimized-${file}`);

      const stats = fs.statSync(inputPath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`Processing ${file} (${sizeInMB}MB)...`);

      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({
          quality: 85,
          progressive: true,
          mozjpeg: true,
        })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSizeInMB = (newStats.size / (1024 * 1024)).toFixed(2);

      console.log(`✓ Optimized ${file}: ${sizeInMB}MB → ${newSizeInMB}MB`);

      // Replace original with optimized version
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath, inputPath);
    }

    console.log('✅ All hero images optimized successfully!');
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeHeroImages();
