const fs = require('fs');
const path = require('path');
const https = require('https');

// Image mapping with Unsplash URLs and local filenames
const IMAGE_MAPPING = {
  // Rings
  'diamond-solitaire-ring-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-solitaire-ring-2.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=60',
  'diamond-solitaire-ring-3.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=40',
  
  'gold-wedding-band-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'gold-wedding-band-2.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=60',
  
  'emerald-ring-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'emerald-ring-2.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=60',

  // Necklaces
  'diamond-pendant-necklace-1.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-pendant-necklace-2.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=60',
  
  'gold-chain-necklace-1.jpg': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&crop=center&q=80',
  'gold-chain-necklace-2.jpg': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&crop=center&q=60',
  
  'pearl-necklace-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'pearl-necklace-2.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=60',

  // Bracelets
  'tennis-bracelet-1.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'tennis-bracelet-2.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=60',
  
  'gold-bangle-bracelet-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'gold-bangle-bracelet-2.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=60',
  
  'charm-bracelet-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'charm-bracelet-2.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=60',

  // Earrings
  'pearl-drop-earrings-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'pearl-drop-earrings-2.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=60',
  
  'diamond-stud-earrings-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-stud-earrings-2.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=60',
  
  'gold-hoop-earrings-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'gold-hoop-earrings-2.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=60',

  // Watches
  'luxury-automatic-watch-1.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'luxury-automatic-watch-2.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=60',
  
  'gold-dress-watch-1.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'gold-dress-watch-2.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=60',
  
  'sport-luxury-watch-1.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'sport-luxury-watch-2.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=60',

  // Pendants
  'diamond-cross-pendant-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'diamond-cross-pendant-2.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=60',
  
  'gold-heart-pendant-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=80',
  'gold-heart-pendant-2.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center&q=60',
  
  'emerald-pendant-1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'emerald-pendant-2.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=60',

  // Category images
  'category-rings.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center&q=80',
  'category-necklaces.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'category-bracelets.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',
  'category-earrings.jpg': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&crop=center&q=80',
  'category-watches.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80',
  'category-pendants.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=center&q=80',

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
  console.log('🚀 Starting image download...');
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
    console.log('🎉 All images downloaded successfully!');
  } else {
    console.log('⚠️  Some images failed to download. Check the errors above.');
  }
}

// Run the download
downloadAllImages().catch(console.error);
