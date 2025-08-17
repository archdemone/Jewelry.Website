const sharp = require('sharp');
const path = require('path');

async function optimizeHeroImage() {
  try {
    const inputPath = path.join(__dirname, '../public/images/header/hero-1.jpg');
    const outputPath = path.join(__dirname, '../public/images/header/hero-optimized.webp');
    const blurPath = path.join(__dirname, '../public/images/header/hero-blur.webp');

    console.log('🖼️  Optimizing hero image...');

    // Create optimized WebP version
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    // Create blur placeholder (small version)
    await sharp(inputPath)
      .resize(32, 32, { fit: 'cover' })
      .webp({ quality: 20 })
      .toFile(blurPath);

    console.log('✅ Hero image optimized successfully!');
    console.log(`📁 Optimized: ${outputPath}`);
    console.log(`📁 Blur placeholder: ${blurPath}`);

    // Get file sizes
    const fs = require('fs');
    const optimizedSize = fs.statSync(outputPath).size;
    const blurSize = fs.statSync(blurPath).size;

    console.log(`📊 Optimized size: ${(optimizedSize / 1024).toFixed(1)}KB`);
    console.log(`📊 Blur size: ${(blurSize / 1024).toFixed(1)}KB`);

  } catch (error) {
    console.error('❌ Error optimizing hero image:', error);
  }
}

optimizeHeroImage();
