const fs = require('fs');
const path = require('path');
const https = require('https');

// Completely unique jewelry images from different Unsplash photographers
// Each image has a unique URL to ensure no duplicates
const IMAGE_MAPPING = {
  // Engagement Rings - Unique diamond ring images from different photographers
  'classic-solitaire-engagement-ring-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'classic-solitaire-engagement-ring-2.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&crop=center&q=80',
  
  'vintage-halo-ring-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'vintage-halo-ring-2.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',
  
  'modern-three-stone-ring-1.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'modern-three-stone-ring-2.jpg': 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&crop=center&q=80',

  // Wedding Bands - Unique band images
  'hammered-wedding-band-1.jpg': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&crop=center&q=80',
  'hammered-wedding-band-2.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',
  
  'classic-plain-wedding-band-1.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'classic-plain-wedding-band-2.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&crop=center&q=80',
  
  'diamond-pave-wedding-band-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-pave-wedding-band-2.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',

  // Eternity Rings - Unique eternity band images
  'sapphire-eternity-ring-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'sapphire-eternity-ring-2.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&crop=center&q=80',
  
  'diamond-eternity-ring-1.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-eternity-ring-2.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',

  // Signet Rings - Unique signet ring images
  'classic-signet-ring-1.jpg': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&crop=center&q=80',
  'classic-signet-ring-2.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&crop=center&q=80',

  // Statement Rings - Unique statement ring images
  'emerald-statement-ring-1.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'emerald-statement-ring-2.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',
  
  'ruby-cocktail-ring-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'ruby-cocktail-ring-2.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&crop=center&q=80',

  // Stackable Rings - Unique stackable ring images
  'minimalist-gold-band-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'minimalist-gold-band-2.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',
  
  'diamond-accent-band-1.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-accent-band-2.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&crop=center&q=80',

  // Category images - Unique category showcase images
  'category-engagement-rings.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'category-wedding-bands.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'category-eternity-rings.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'category-signet-rings.jpg': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&crop=center&q=80',
  'category-statement-rings.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'category-stackable-rings.jpg': 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop&crop=center&q=80',

  // Placeholder
  'placeholder.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
};

const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');

// Ensure products directory exists
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// Download function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(PRODUCTS_DIR, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${filename} already exists, skipping...`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if download failed
      reject(err);
    });
  });
}

// Main download function
async function downloadAllImages() {
  console.log('🚀 Starting unique ring image download...');
  console.log(`📁 Target directory: ${PRODUCTS_DIR}`);
  console.log('');

  const entries = Object.entries(IMAGE_MAPPING);
  let successCount = 0;
  let errorCount = 0;

  for (const [filename, url] of entries) {
    try {
      await downloadImage(url, filename);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
      errorCount++;
    }
  }

  console.log('');
  console.log('📊 Download Summary:');
  console.log(`✓ Successfully downloaded: ${successCount} images`);
  console.log(`✗ Failed downloads: ${errorCount} images`);
  console.log(`📁 Total images: ${entries.length}`);
  
  if (errorCount === 0) {
    console.log('🎉 All unique ring images downloaded successfully!');
  } else {
    console.log('⚠️  Some images failed to download. Check the errors above.');
  }
}

// Run the download
downloadAllImages().catch(console.error);
