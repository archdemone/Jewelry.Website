#!/usr/bin/env node

/**
 * Bulk Cache Busting Update Script
 * 
 * This script finds all image references in your Next.js project and updates them
 * to use the cache busting utility.
 * 
 * Usage: node scripts/bulk-cache-busting-update.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const SRC_DIR = './src';
const IMAGE_PATTERNS = [
  '**/*.tsx',
  '**/*.ts',
  '**/*.jsx',
  '**/*.js'
];

// Image path patterns to match
const IMAGE_PATH_PATTERNS = [
  /src=["']\/images\/([^"']+)["']/g,
  /src=["']\/images\/([^"']+)["']/g,
  /backgroundImage:\s*url\(["']\/images\/([^"']+)["']\)/g,
  /url\(["']\/images\/([^"']+)["']\)/g
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/dist/**',
  '**/build/**',
  '**/*.test.*',
  '**/*.spec.*'
];

function findFiles() {
  const patterns = IMAGE_PATTERNS.map(pattern => path.join(SRC_DIR, pattern));
  const excludePatterns = EXCLUDE_PATTERNS.map(pattern => path.join(SRC_DIR, pattern));
  
  let files = [];
  patterns.forEach(pattern => {
    const found = glob.sync(pattern, { ignore: excludePatterns });
    files = files.concat(found);
  });
  
  return [...new Set(files)]; // Remove duplicates
}

function updateFileContent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  let changes = [];

  // Check if file already imports the utility
  const hasImport = content.includes('getImageUrlWithVersion') || content.includes('getImageUrl');
  
  // Pattern 1: Next.js Image component src
  content = content.replace(
    /src=["']\/images\/([^"']+)["']/g,
    (match, imagePath) => {
      if (!match.includes('getImageUrlWithVersion')) {
        updated = true;
        changes.push(`Updated: ${match} -> src={getImageUrlWithVersion("/images/${imagePath}")}`);
        return `src={getImageUrlWithVersion("/images/${imagePath}")}`;
      }
      return match;
    }
  );

  // Pattern 2: Regular img tag src
  content = content.replace(
    /<img[^>]*src=["']\/images\/([^"']+)["'][^>]*>/g,
    (match, imagePath) => {
      if (!match.includes('getImageUrlWithVersion')) {
        updated = true;
        changes.push(`Updated img tag: ${match.substring(0, 50)}...`);
        return match.replace(
          /src=["']\/images\/([^"']+)["']/,
          'src={getImageUrlWithVersion("/images/$1")}'
        );
      }
      return match;
    }
  );

  // Pattern 3: CSS background-image
  content = content.replace(
    /backgroundImage:\s*url\(["']\/images\/([^"']+)["']\)/g,
    (match, imagePath) => {
      if (!match.includes('getImageUrlWithVersion')) {
        updated = true;
        changes.push(`Updated background: ${match}`);
        return `backgroundImage: \`url(\${getImageUrlWithVersion("/images/${imagePath}")})\``;
      }
      return match;
    }
  );

  // Add import if needed and changes were made
  if (updated && !hasImport) {
    const importStatement = "import { getImageUrlWithVersion } from '@/lib/utils';";
    
    // Find the best place to add the import
    if (content.includes("import ")) {
      // Add after existing imports
      const lastImportIndex = content.lastIndexOf("import ");
      const nextLineIndex = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, nextLineIndex + 1) + importStatement + '\n' + content.slice(nextLineIndex + 1);
    } else {
      // Add at the beginning
      content = importStatement + '\n\n' + content;
    }
    
    changes.push('Added import: getImageUrlWithVersion');
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    return changes;
  }
  
  return null;
}

function main() {
  console.log('🔍 Finding files to update...');
  const files = findFiles();
  console.log(`Found ${files.length} files to check\n`);

  let totalUpdated = 0;
  let totalChanges = 0;

  files.forEach(filePath => {
    try {
      const changes = updateFileContent(filePath);
      if (changes) {
        totalUpdated++;
        totalChanges += changes.length;
        console.log(`✅ Updated: ${filePath}`);
        changes.forEach(change => console.log(`   ${change}`));
        console.log('');
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
    }
  });

  console.log('🎉 Update complete!');
  console.log(`📊 Summary:`);
  console.log(`   Files updated: ${totalUpdated}`);
  console.log(`   Total changes: ${totalChanges}`);
  
  if (totalUpdated > 0) {
    console.log('\n📝 Next steps:');
    console.log('   1. Review the changes in your code editor');
    console.log('   2. Test that images load correctly');
    console.log('   3. Run your development server to verify cache busting works');
    console.log('   4. Commit the changes when satisfied');
  } else {
    console.log('\n✨ No files needed updating - your images are already using cache busting!');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { findFiles, updateFileContent };
