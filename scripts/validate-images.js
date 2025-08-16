#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

// Product image mapping from our assets file
const PRODUCT_IMAGES = {
  // Engagement Rings
  'classic-solitaire-engagement-ring': [
    '/images/products/classic-solitaire-engagement-ring-1.jpg',
    '/images/products/classic-solitaire-engagement-ring-2.jpg',
  ],
  'vintage-inspired-halo-ring': [
    '/images/products/vintage-halo-ring-1.jpg',
    '/images/products/vintage-halo-ring-2.jpg',
  ],
  'modern-three-stone-ring': [
    '/images/products/modern-three-stone-ring-1.jpg',
    '/images/products/modern-three-stone-ring-2.jpg',
  ],

  // Wedding Bands
  'hammered-wedding-band': [
    '/images/products/hammered-wedding-band-1.jpg',
    '/images/products/hammered-wedding-band-2.jpg',
  ],
  'classic-plain-wedding-band': [
    '/images/products/classic-plain-wedding-band-1.jpg',
    '/images/products/classic-plain-wedding-band-2.jpg',
  ],
  'diamond-pave-wedding-band': [
    '/images/products/diamond-pave-wedding-band-1.jpg',
    '/images/products/diamond-pave-wedding-band-2.jpg',
  ],

  // Eternity Rings
  'sapphire-eternity-ring': [
    '/images/products/sapphire-eternity-ring-1.jpg',
    '/images/products/sapphire-eternity-ring-2.jpg',
  ],
  'diamond-eternity-ring': [
    '/images/products/diamond-eternity-ring-1.jpg',
    '/images/products/diamond-eternity-ring-2.jpg',
  ],

  // Signet Rings
  'classic-signet-ring': [
    '/images/products/classic-signet-ring-1.jpg',
    '/images/products/classic-signet-ring-2.jpg',
  ],

  // Statement Rings
  'emerald-statement-ring': [
    '/images/products/emerald-statement-ring-1.jpg',
    '/images/products/emerald-statement-ring-2.jpg',
  ],
  'ruby-cocktail-ring': [
    '/images/products/ruby-cocktail-ring-1.jpg',
    '/images/products/ruby-cocktail-ring-2.jpg',
  ],

  // Stackable Rings
  'minimalist-gold-band': [
    '/images/products/minimalist-gold-band-1.jpg',
    '/images/products/minimalist-gold-band-2.jpg',
  ],
  'diamond-accent-band': [
    '/images/products/diamond-accent-band-1.jpg',
    '/images/products/diamond-accent-band-2.jpg',
  ],
};

// Required placeholder images (only ring-related ones for our business)
const REQUIRED_PLACEHOLDERS = [
  '/images/products/placeholder.svg',
  '/images/products/placeholder-ring.svg',
];

function getActualFiles() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(PRODUCTS_DIR);
  return files
    .filter(file => IMAGE_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext)))
    .map(file => `/images/products/${file}`);
}

function validateImagePaths() {
  console.log('🔍 Validating product image paths...\n');
  
  const actualFiles = getActualFiles();
  const expectedFiles = new Set();
  const missingFiles = [];
  const unusedFiles = new Set(actualFiles);
  const duplicateEntries = new Map();
  
  // Collect all expected files from PRODUCT_IMAGES
  Object.entries(PRODUCT_IMAGES).forEach(([productSlug, images]) => {
    images.forEach(imagePath => {
      expectedFiles.add(imagePath);
      unusedFiles.delete(imagePath);
      
      // Check for duplicates
      if (duplicateEntries.has(imagePath)) {
        duplicateEntries.get(imagePath).push(productSlug);
      } else {
        duplicateEntries.set(imagePath, [productSlug]);
      }
    });
  });
  
  // Add placeholder files to expected
  REQUIRED_PLACEHOLDERS.forEach(placeholder => {
    expectedFiles.add(placeholder);
    unusedFiles.delete(placeholder);
  });
  
  // Find missing files
  expectedFiles.forEach(expectedFile => {
    if (!actualFiles.includes(expectedFile)) {
      missingFiles.push(expectedFile);
    }
  });
  
  // Report results
  console.log(`📊 Summary:`);
  console.log(`   Total expected files: ${expectedFiles.size}`);
  console.log(`   Total actual files: ${actualFiles.length}`);
  console.log(`   Missing files: ${missingFiles.length}`);
  console.log(`   Unused files: ${unusedFiles.size}`);
  console.log(`   Duplicate entries: ${Array.from(duplicateEntries.values()).filter(products => products.length > 1).length}\n`);
  
  // Report missing files
  if (missingFiles.length > 0) {
    console.log('❌ Missing files:');
    missingFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log('');
  }
  
  // Report unused files
  if (unusedFiles.size > 0) {
    console.log('⚠️  Unused files:');
    Array.from(unusedFiles).forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log('');
  }
  
  // Report duplicate entries
  const duplicates = Array.from(duplicateEntries.entries()).filter(([file, products]) => products.length > 1);
  if (duplicates.length > 0) {
    console.log('🔄 Duplicate image assignments:');
    duplicates.forEach(([file, products]) => {
      console.log(`   - ${file} used by: ${products.join(', ')}`);
    });
    console.log('');
  }
  
  // Report validation status
  const hasErrors = missingFiles.length > 0 || duplicates.length > 0;
  const hasWarnings = unusedFiles.size > 0;
  
  if (!hasErrors && !hasWarnings) {
    console.log('✅ All image paths are valid!');
    return true;
  } else if (!hasErrors) {
    console.log('⚠️  Image validation completed with warnings (unused files)');
    return true;
  } else {
    console.log('❌ Image validation failed - missing files or duplicates found');
    return false;
  }
}

function generatePlaceholderImages() {
  console.log('🎨 Generating placeholder images...\n');
  
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }
  
  // Create a simple SVG placeholder for each required placeholder
  REQUIRED_PLACEHOLDERS.forEach(placeholderPath => {
    const filename = path.basename(placeholderPath);
    const filepath = path.join(PRODUCTS_DIR, filename);
    
    if (!fs.existsSync(filepath)) {
      const svgContent = generateSVGPlaceholder(filename);
      fs.writeFileSync(filepath.replace(/\.(jpg|jpeg|png|webp)$/, '.svg'), svgContent);
      console.log(`   Created: ${filename.replace(/\.(jpg|jpeg|png|webp)$/, '.svg')}`);
    }
  });
  
  console.log('\n✅ Placeholder images generated!');
}

function generateSVGPlaceholder(filename) {
  const name = filename.replace(/\.(jpg|jpeg|png|webp)$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B8941F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B6914;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad)"/>
  <circle cx="200" cy="150" r="40" fill="rgba(255,255,255,0.1)"/>
  <circle cx="300" cy="250" r="30" fill="rgba(255,255,255,0.1)"/>
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white">${name}</text>
  <text x="200" y="240" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.8)">Premium Jewelry</text>
</svg>`;
}

// Main execution
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'validate':
      validateImagePaths();
      break;
    case 'generate-placeholders':
      generatePlaceholderImages();
      break;
    case 'full-check':
      generatePlaceholderImages();
      console.log('');
      validateImagePaths();
      break;
    default:
      console.log('Usage: node validate-images.js [validate|generate-placeholders|full-check]');
      console.log('');
      console.log('Commands:');
      console.log('  validate              - Check for missing, unused, and duplicate images');
      console.log('  generate-placeholders - Create SVG placeholder images');
      console.log('  full-check            - Generate placeholders and validate');
      break;
  }
}

module.exports = { validateImagePaths, generatePlaceholderImages };
