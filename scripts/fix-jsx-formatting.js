#!/usr/bin/env node

/**
 * Auto-fix JSX Formatting Issues
 * Fixes broken prop alignment and indentation
 */

const fs = require('fs');
const glob = require('glob');

function fixJsxFormatting(content) {
  let fixed = content;
  
  // Fix broken prop alignment (props with excessive indentation)
  fixed = fixed.replace(/(\s{15,})(\w+)=\{([^}]+)\}/g, (match, spaces, prop, value) => {
    // Calculate proper indentation (2 spaces per level)
    const baseIndent = '              '; // 14 spaces for props
    return `${baseIndent}${prop}={${value}}`;
  });
  
  // Fix props that are broken across lines
  fixed = fixed.replace(/(\s+)(\w+)=\{([^}]*)\}\s*\n\s{1,3}(\w+)=\{([^}]*)\}/g, (match, spaces1, prop1, value1, spaces2, prop2, value2) => {
    const baseIndent = '              '; // 14 spaces for props
    return `${baseIndent}${prop1}={${value1}}\n${baseIndent}${prop2}={${value2}}`;
  });
  
  return fixed;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixJsxFormatting(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Auto-fixing JSX formatting issues...\n');
  
  // Get all TSX/JSX files
  const files = glob.sync('src/**/*.{tsx,jsx}', {
    ignore: ['node_modules/**', '.next/**', 'out/**']
  });
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (processFile(file)) {
      console.log(`✅ Fixed: ${file}`);
      fixedCount++;
    }
  });
  
  console.log(`\n🎉 Fixed ${fixedCount} files!`);
  
  if (fixedCount > 0) {
    console.log('\n📝 Run "npm run validate:fast" to verify fixes.');
  }
}

if (require.main === module) {
  main();
}
