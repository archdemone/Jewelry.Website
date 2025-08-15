const fs = require('fs');
const path = require('path');

// Define the image mappings directly in this script to avoid TypeScript import issues
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
  'pearl-drop-earrings': [
    '/images/products/pearl-drop-earrings-1.jpg',
    '/images/products/pearl-drop-earrings-2.jpg',
  ],
  'diamond-stud-earrings': [
    '/images/products/diamond-stud-earrings-1.jpg',
    '/images/products/diamond-stud-earrings-2.jpg',
  ],
  'gold-hoop-earrings': [
    '/images/products/gold-hoop-earrings-1.jpg',
    '/images/products/gold-hoop-earrings-2.jpg',
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

const CATEGORY_PLACEHOLDERS = {
  rings: '/images/products/category-rings.jpg',
  necklaces: '/images/products/category-necklaces.jpg',
  bracelets: '/images/products/category-bracelets.jpg',
  earrings: '/images/products/category-earrings.jpg',
  watches: '/images/products/category-watches.jpg',
  pendants: '/images/products/category-pendants.jpg',
};

const DEFAULT_PLACEHOLDER = '/images/products/placeholder.jpg';

const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');

// QA Validation Functions
function checkImageFiles() {
  console.log('🔍 Checking image files...');
  
  const allImagePaths = [];
  
  // Collect all image paths from PRODUCT_IMAGES
  Object.values(PRODUCT_IMAGES).forEach(images => {
    allImagePaths.push(...images);
  });
  
  // Add category images
  Object.values(CATEGORY_PLACEHOLDERS).forEach(image => {
    allImagePaths.push(image);
  });
  
  // Add default placeholder
  allImagePaths.push(DEFAULT_PLACEHOLDER);
  
  const missingFiles = [];
  const existingFiles = [];
  
  allImagePaths.forEach(imagePath => {
    // Convert web path to filesystem path - handle Windows paths correctly
    const relativePath = imagePath.replace(/^\//, ''); // Remove leading slash
    const fullPath = path.join(__dirname, '..', 'public', relativePath);
    
    if (fs.existsSync(fullPath)) {
      existingFiles.push(imagePath);
    } else {
      missingFiles.push(imagePath);
    }
  });
  
  console.log(`✓ Found ${existingFiles.length} existing image files`);
  if (missingFiles.length > 0) {
    console.log(`✗ Missing ${missingFiles.length} image files:`);
    missingFiles.forEach(file => console.log(`  - ${file}`));
  }
  
  return { missingFiles, existingFiles };
}

function checkDuplicateImages() {
  console.log('\n🔍 Checking for duplicate images...');
  
  const allImages = [];
  const duplicates = [];
  
  // Collect all images from PRODUCT_IMAGES
  Object.entries(PRODUCT_IMAGES).forEach(([productSlug, images]) => {
    images.forEach(image => {
      allImages.push({ productSlug, image });
    });
  });
  
  // Check for duplicates
  const imageCounts = {};
  allImages.forEach(({ productSlug, image }) => {
    if (!imageCounts[image]) {
      imageCounts[image] = [];
    }
    imageCounts[image].push(productSlug);
  });
  
  Object.entries(imageCounts).forEach(([image, products]) => {
    if (products.length > 1) {
      duplicates.push({ image, products });
    }
  });
  
  if (duplicates.length > 0) {
    console.log(`✗ Found ${duplicates.length} duplicate images:`);
    duplicates.forEach(({ image, products }) => {
      console.log(`  - ${image} used by: ${products.join(', ')}`);
    });
  } else {
    console.log('✓ No duplicate images found');
  }
  
  return duplicates;
}

function validateImageNaming() {
  console.log('\n🔍 Validating image naming conventions...');
  
  const namingIssues = [];
  
  Object.entries(PRODUCT_IMAGES).forEach(([productSlug, images]) => {
    images.forEach(image => {
      const filename = path.basename(image);
      
      // Check if filename matches product slug (more flexible matching)
      const productName = productSlug.replace(/-/g, '');
      const fileNameWithoutExt = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '').replace(/-/g, '');
      
      if (!fileNameWithoutExt.includes(productName) && !productName.includes(fileNameWithoutExt)) {
        namingIssues.push({
          productSlug,
          image,
          issue: 'Filename does not match product slug'
        });
      }
      
      // Check for proper extension
      if (!filename.endsWith('.jpg')) {
        namingIssues.push({
          productSlug,
          image,
          issue: 'File should have .jpg extension'
        });
      }
    });
  });
  
  if (namingIssues.length > 0) {
    console.log(`✗ Found ${namingIssues.length} naming issues:`);
    namingIssues.forEach(({ productSlug, image, issue }) => {
      console.log(`  - ${productSlug}: ${image} - ${issue}`);
    });
  } else {
    console.log('✓ All images follow naming conventions');
  }
  
  return namingIssues;
}

function checkCategoryImageRelevance() {
  console.log('\n🔍 Checking category image relevance...');
  
  const relevanceIssues = [];
  
  Object.entries(CATEGORY_PLACEHOLDERS).forEach(([categorySlug, image]) => {
    const filename = path.basename(image);
    
    // Check if category image filename contains category name
    if (!filename.includes(categorySlug)) {
      relevanceIssues.push({
        categorySlug,
        image,
        issue: 'Category image filename does not match category name'
      });
    }
  });
  
  if (relevanceIssues.length > 0) {
    console.log(`✗ Found ${relevanceIssues.length} relevance issues:`);
    relevanceIssues.forEach(({ categorySlug, image, issue }) => {
      console.log(`  - ${categorySlug}: ${image} - ${issue}`);
    });
  } else {
    console.log('✓ All category images are relevant');
  }
  
  return relevanceIssues;
}

function generateReport() {
  console.log('📊 Generating QA Report...\n');
  
  const fileCheck = checkImageFiles();
  const duplicateCheck = checkDuplicateImages();
  const namingCheck = validateImageNaming();
  const relevanceCheck = checkCategoryImageRelevance();
  
  console.log('\n📋 QA Report Summary:');
  console.log('=====================');
  console.log(`📁 Total image files: ${fileCheck.existingFiles.length}`);
  console.log(`❌ Missing files: ${fileCheck.missingFiles.length}`);
  console.log(`🔄 Duplicate images: ${duplicateCheck.length}`);
  console.log(`📝 Naming issues: ${namingCheck.length}`);
  console.log(`🎯 Relevance issues: ${relevanceCheck.length}`);
  
  const totalIssues = fileCheck.missingFiles.length + duplicateCheck.length + namingCheck.length + relevanceCheck.length;
  
  if (totalIssues === 0) {
    console.log('\n🎉 All checks passed! Image system is ready.');
  } else {
    console.log(`\n⚠️  Found ${totalIssues} issues that need attention.`);
  }
  
  return {
    fileCheck,
    duplicateCheck,
    namingCheck,
    relevanceCheck,
    totalIssues
  };
}

// Run the QA validation
if (require.main === module) {
  generateReport();
}

module.exports = {
  checkImageFiles,
  checkDuplicateImages,
  validateImageNaming,
  checkCategoryImageRelevance,
  generateReport
};
