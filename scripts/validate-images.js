#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

// Product image mapping from our assets file
const PRODUCT_IMAGES = {
  // Rings
  'diamond-solitaire-ring': [
    '/images/products/diamond-solitaire-ring-1.jpg',
    '/images/products/diamond-solitaire-ring-2.jpg',
    '/images/products/diamond-solitaire-ring-3.jpg',
  ],
  'gold-wedding-band': [
    '/images/products/gold-wedding-band-1.jpg',
    '/images/products/gold-wedding-band-2.jpg',
  ],
  'emerald-ring': [
    '/images/products/emerald-ring-1.jpg',
    '/images/products/emerald-ring-2.jpg',
  ],
  
  // Necklaces
  'diamond-pendant-necklace': [
    '/images/products/diamond-pendant-necklace-1.jpg',
    '/images/products/diamond-pendant-necklace-2.jpg',
  ],
  'gold-chain-necklace': [
    '/images/products/gold-chain-necklace-1.jpg',
    '/images/products/gold-chain-necklace-2.jpg',
  ],
  'pearl-necklace': [
    '/images/products/pearl-necklace-1.jpg',
    '/images/products/pearl-necklace-2.jpg',
  ],
  
  // Bracelets
  'tennis-bracelet': [
    '/images/products/tennis-bracelet-1.jpg',
    '/images/products/tennis-bracelet-2.jpg',
  ],
  'gold-bangle-bracelet': [
    '/images/products/gold-bangle-bracelet-1.jpg',
    '/images/products/gold-bangle-bracelet-2.jpg',
  ],
  'charm-bracelet': [
    '/images/products/charm-bracelet-1.jpg',
    '/images/products/charm-bracelet-2.jpg',
  ],
  
  // Earrings
  'diamond-stud-earrings': [
    '/images/products/diamond-stud-earrings-1.jpg',
    '/images/products/diamond-stud-earrings-2.jpg',
  ],
  'gold-hoop-earrings': [
    '/images/products/gold-hoop-earrings-1.jpg',
    '/images/products/gold-hoop-earrings-2.jpg',
  ],
  'pearl-drop-earrings': [
    '/images/products/pearl-drop-earrings-1.jpg',
    '/images/products/pearl-drop-earrings-2.jpg',
  ],
  
  // Watches
  'luxury-automatic-watch': [
    '/images/products/luxury-automatic-watch-1.jpg',
    '/images/products/luxury-automatic-watch-2.jpg',
  ],
  'gold-dress-watch': [
    '/images/products/gold-dress-watch-1.jpg',
    '/images/products/gold-dress-watch-2.jpg',
  ],
  'sport-luxury-watch': [
    '/images/products/sport-luxury-watch-1.jpg',
    '/images/products/sport-luxury-watch-2.jpg',
  ],
  
  // Pendants
  'diamond-cross-pendant': [
    '/images/products/diamond-cross-pendant-1.jpg',
    '/images/products/diamond-cross-pendant-2.jpg',
  ],
  'gold-heart-pendant': [
    '/images/products/gold-heart-pendant-1.jpg',
    '/images/products/gold-heart-pendant-2.jpg',
  ],
  'emerald-pendant': [
    '/images/products/emerald-pendant-1.jpg',
    '/images/products/emerald-pendant-2.jpg',
  ],
};

// Required placeholder images
const REQUIRED_PLACEHOLDERS = [
  '/images/products/placeholder.svg',
  '/images/products/placeholder-ring.svg',
  '/images/products/placeholder-necklace.svg',
  '/images/products/placeholder-bracelet.svg',
  '/images/products/placeholder-earrings.svg',
  '/images/products/placeholder-watch.svg',
  '/images/products/placeholder-pendant.svg',
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
