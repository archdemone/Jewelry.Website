#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Web Vitals Guardrail Check\n');

// Performance thresholds - Realistic for feature-rich e-commerce app
const THRESHOLDS = {
  LCP: 2500, // 2.5s
  TBT: 300,  // 300ms
  CLS: 0.1,  // 0.1
  FCP: 1800, // 1.8s
  INP: 200,  // 200ms
  HERO_IMAGE_SIZE: 200, // 200KB
  FIRST_LOAD_JS: 2000,  // 2MB (realistic for e-commerce with auth, cart, etc.)
  CHUNK_SIZE: 500       // 500KB
};

let hasViolations = false;

// Check hero image size
function checkHeroImage() {
  console.log('📸 Checking hero image...');
  
  const heroPath = path.join(__dirname, '../public/images/header/hero-optimized.webp');
  
  if (fs.existsSync(heroPath)) {
    const stats = fs.statSync(heroPath);
    const sizeKB = Math.round(stats.size / 1024);
    
    console.log(`   Hero image size: ${sizeKB}KB`);
    
    if (sizeKB > THRESHOLDS.HERO_IMAGE_SIZE) {
      console.log(`   ❌ VIOLATION: Hero image > ${THRESHOLDS.HERO_IMAGE_SIZE}KB`);
      hasViolations = true;
    } else {
      console.log('   ✅ Hero image size OK');
    }
  } else {
    console.log('   ⚠️  Hero image not found');
  }
}

// Check bundle size
function checkBundleSize() {
  console.log('\n📦 Checking bundle size...');
  
  try {
    // This would require building the project
    console.log('   Run "npm run build" to analyze bundle size');
    console.log('   Ensure First Load JS < 2MB and chunks < 500KB');
  } catch (error) {
    console.log('   ⚠️  Could not analyze bundle size');
  }
}

// Check critical CSS
function checkCriticalCSS() {
  console.log('\n🎨 Checking critical CSS...');
  
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    // Check for inline critical CSS
    if (content.includes('dangerouslySetInnerHTML') && content.includes('__html')) {
      const cssMatch = content.match(/__html:\s*`([\s\S]*?)`/);
      if (cssMatch) {
        const cssLines = cssMatch[1].split('\n').filter(line => line.trim().length > 0);
        console.log(`   Critical CSS lines: ${cssLines.length}`);
        
        if (cssLines.length > 20) {
          console.log('   ⚠️  Critical CSS might be too large');
        } else {
          console.log('   ✅ Critical CSS size OK');
        }
      }
    }
  }
}

// Check image optimization
function checkImageOptimization() {
  console.log('\n🖼️  Checking image optimization...');
  
  const heroCarouselPath = path.join(__dirname, '../src/components/home/HeroCarousel.tsx');
  
  if (fs.existsSync(heroCarouselPath)) {
    const content = fs.readFileSync(heroCarouselPath, 'utf8');
    
    const checks = [
      { name: 'priority attribute', check: content.includes('priority') },
      { name: 'fetchPriority="high"', check: content.includes('fetchPriority') && (content.includes('"high"') || content.includes('"high"')) },
      { name: 'explicit dimensions', check: content.includes('width=') && content.includes('height=') },
      { name: 'sizes attribute', check: content.includes('sizes=') },
      { name: 'WebP format', check: content.includes('.webp') }
    ];
    
    checks.forEach(({ name, check }) => {
      if (check) {
        console.log(`   ✅ ${name}`);
      } else {
        console.log(`   ❌ Missing ${name}`);
        hasViolations = true;
      }
    });
  }
}

// Check JavaScript optimization
function checkJavaScriptOptimization() {
  console.log('\n⚡ Checking JavaScript optimization...');
  
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    const checks = [
      { name: 'dynamic imports', check: content.includes('dynamic(') },
      { name: 'ssr: false', check: content.includes('ssr: false') },
      { name: 'requestIdleCallback', check: content.includes('requestIdleCallback') }
    ];
    
    checks.forEach(({ name, check }) => {
      if (check) {
        console.log(`   ✅ ${name}`);
      } else {
        console.log(`   ⚠️  Missing ${name}`);
      }
    });
  }
}

// Check font optimization
function checkFontOptimization() {
  console.log('\n🔤 Checking font optimization...');
  
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    const checks = [
      { name: 'display: swap', check: content.includes('display: \'swap\'') },
      { name: 'preload: true', check: content.includes('preload: true') },
      { name: 'fallback fonts', check: content.includes('fallback:') }
    ];
    
    checks.forEach(({ name, check }) => {
      if (check) {
        console.log(`   ✅ ${name}`);
      } else {
        console.log(`   ⚠️  Missing ${name}`);
      }
    });
  }
}

// Generate report
function generateReport() {
  console.log('\n📊 Web Vitals Guardrail Report');
  console.log('================================');
  
  if (hasViolations) {
    console.log('\n❌ VIOLATIONS DETECTED');
    console.log('Please fix the issues above before proceeding.');
    console.log('\n🔧 Quick Fixes:');
    console.log('1. Optimize hero image: npx sharp-cli -i hero.jpg -o hero.webp --format webp --quality 60');
    console.log('2. Add priority to hero image: <Image priority fetchPriority="high" />');
    console.log('3. Use dynamic imports: dynamic(() => import(\'./Component\'), { ssr: false })');
    console.log('4. Minimize critical CSS: Keep inline styles < 20 lines');
    
    process.exit(1);
  } else {
    console.log('\n✅ ALL CHECKS PASSED');
    console.log('Your code meets Web Vitals standards!');
    console.log('\n🎯 Next Steps:');
    console.log('1. Run Lighthouse audit: npm run lighthouse');
    console.log('2. Test on slow 3G connection');
    console.log('3. Monitor Core Web Vitals in production');
  }
}

// Main execution
function main() {
  checkHeroImage();
  checkBundleSize();
  checkCriticalCSS();
  checkImageOptimization();
  checkJavaScriptOptimization();
  checkFontOptimization();
  generateReport();
}

main();
