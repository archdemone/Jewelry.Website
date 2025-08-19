#!/usr/bin/env node

/**
 * Script to fix common TypeScript errors in the project
 * This script helps identify and fix the most common TypeScript issues
 */

const fs = require('fs');
const path = require('path');

// Common fixes for TypeScript errors
const fixes = {
  // Fix Framer Motion className errors
  'Property \'className\' does not exist on type': (filePath, line) => {
    // This is usually a Framer Motion issue - the types should handle this
    // We'll need to check if the motion import is correct
    return `// TODO: Check motion import and ensure framer-motion types are loaded`;
  },
  
  // Fix null params errors
  '\'params\' is possibly \'null\'': (filePath, line) => {
    return `// Add null check: params?.id instead of params.id`;
  },
  
  // Fix undefined to null conversion
  'Type \'Product | undefined\' is not assignable to type \'Product | null\'': (filePath, line) => {
    return `// Convert undefined to null: product ?? null`;
  },
  
  // Fix CartItem id property
  '\'id\' does not exist in type \'Omit<CartItem, "quantity">\'': (filePath, line) => {
    return `// Use productId instead of id in CartItem`;
  },
  
  // Fix getProductImageFallback array access
  'Expected 1 arguments, but got 0': (filePath, line) => {
    return `// Add required argument to getProductImageFallback call`;
  }
};

function analyzeTypeScriptErrors() {
  console.log('🔍 Analyzing TypeScript errors...\n');
  
  // Run TypeScript check and capture output
  const { execSync } = require('child_process');
  
  try {
    const output = execSync('npx tsc --noEmit --skipLibCheck 2>&1', { encoding: 'utf8' });
    
    // Parse the output to extract error patterns
    const lines = output.split('\n');
    const errorPatterns = {};
    
    lines.forEach(line => {
      if (line.includes('error TS')) {
        const match = line.match(/error TS\d+: (.+)/);
        if (match) {
          const errorMessage = match[1];
          errorPatterns[errorMessage] = (errorPatterns[errorMessage] || 0) + 1;
        }
      }
    });
    
    console.log('📊 Error Analysis:');
    console.log('==================\n');
    
    Object.entries(errorPatterns)
      .sort(([,a], [,b]) => b - a)
      .forEach(([error, count]) => {
        console.log(`${count}x: ${error}`);
        
        // Suggest fixes
        for (const [pattern, fix] of Object.entries(fixes)) {
          if (error.includes(pattern)) {
            console.log(`   💡 Fix: ${fix}`);
          }
        }
        console.log('');
      });
    
    console.log('🎯 Recommended Actions:');
    console.log('=======================');
    console.log('1. Fix Framer Motion types by ensuring proper imports');
    console.log('2. Add null checks for useParams() calls');
    console.log('3. Fix CartItem interface to use productId instead of id');
    console.log('4. Update getProductImageFallback calls with required arguments');
    console.log('5. Convert undefined to null where needed');
    
  } catch (error) {
    console.error('❌ Error running TypeScript check:', error.message);
  }
}

function generateFixReport() {
  console.log('\n📝 Generating Fix Report...\n');
  
  const report = `
# TypeScript Error Fix Report

## Summary
This report outlines the TypeScript errors found in the project and their solutions.

## Common Error Patterns

### 1. Framer Motion Type Errors
**Error**: Property 'className' does not exist on type 'IntrinsicAttributes & HTMLAttributesWithoutMotionProps<unknown, unknown> & MotionProps & RefAttributes<unknown>'

**Solution**: 
- Ensure proper motion imports: \`import { motion } from 'framer-motion'\`
- Check that framer-motion.d.ts is properly loaded
- Use proper motion component types

### 2. Null Params Errors
**Error**: 'params' is possibly 'null'

**Solution**: Add null checks
\`\`\`typescript
const params = useParams();
const id = params?.id; // Use optional chaining
\`\`\`

### 3. CartItem Interface Issues
**Error**: 'id' does not exist in type 'Omit<CartItem, "quantity">'

**Solution**: Use productId instead of id
\`\`\`typescript
addItem({
  productId: product.id.toString(), // Use productId
  name: product.name,
  price: product.price,
  image: product.images?.[0] || '',
});
\`\`\`

### 4. getProductImageFallback Arguments
**Error**: Expected 1 arguments, but got 0

**Solution**: Provide required arguments
\`\`\`typescript
getProductImageFallback({ productSlug: product.slug, name: product.name })
\`\`\`

## Files to Check
- src/app/contact/page.tsx (24 errors)
- src/app/crafting-process/page.tsx (17 errors)
- src/components/home/*.tsx (multiple files)
- src/components/products/CategoryPage.tsx (9 errors)

## Next Steps
1. Fix Framer Motion imports and types
2. Add null checks for useParams
3. Update CartItem interface usage
4. Fix getProductImageFallback calls
5. Run type-check:ci to verify fixes
`;

  fs.writeFileSync('typescript-fix-report.md', report);
  console.log('✅ Fix report generated: typescript-fix-report.md');
}

if (require.main === module) {
  analyzeTypeScriptErrors();
  generateFixReport();
}

module.exports = { analyzeTypeScriptErrors, generateFixReport };
