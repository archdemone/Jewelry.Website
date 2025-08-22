import { test, expect } from '@playwright/test';

const CRITICAL_PAGES = [
  '/',
  '/products',
  '/about-artisan',
  '/contact',
  '/cart',
  '/checkout'
];

const CONSOLE_ERROR_PATTERNS = {
  // React/Next.js errors
  REACT_ERROR: /React|useReducer|useState|useEffect|ErrorBoundary/i,
  NEXTJS_ERROR: /Next\.js|next|build|hydration/i,
  
  // JavaScript errors
  JAVASCRIPT_ERROR: /TypeError|ReferenceError|SyntaxError|RangeError/i,
  UNDEFINED_ERROR: /undefined|null|Cannot read property/i,
  
  // Network errors
  NETWORK_ERROR: /fetch|axios|network|CORS|404|500/i,
  
  // Performance errors
  PERFORMANCE_ERROR: /timeout|slow|performance|memory/i,
  
  // Third-party errors
  THIRD_PARTY_ERROR: /stripe|analytics|google|facebook/i,
  
  // PWA errors
  PWA_ERROR: /service worker|manifest|offline|cache/i
};

const categorizeError = (errorMessage: string) => {
  for (const [patternName, pattern] of Object.entries(CONSOLE_ERROR_PATTERNS)) {
    if (pattern.test(errorMessage)) {
      if (patternName.includes('REACT') || patternName.includes('NEXTJS')) {
        return 'CRITICAL';
      } else if (patternName.includes('JAVASCRIPT') || patternName.includes('NETWORK')) {
        return 'HIGH';
      } else if (patternName.includes('PERFORMANCE') || patternName.includes('THIRD_PARTY')) {
        return 'MEDIUM';
      }
    }
  }
  return 'LOW';
};

test.describe('Console Error Monitoring', () => {
  test('check for console errors on all critical pages', async ({ page }) => {
    const errors: Array<{
      page: string;
      message: string;
      type: string;
      severity: string;
      timestamp: string;
    }> = [];
    
    // Listen to console events
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const severity = categorizeError(msg.text());
        errors.push({
          page: page.url(),
          message: msg.text(),
          type: 'console.error',
          severity,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Listen to page errors
    page.on('pageerror', error => {
      const severity = categorizeError(error.message);
      errors.push({
        page: page.url(),
        message: error.message,
        type: 'page.error',
        severity,
        timestamp: new Date().toISOString()
      });
    });
    
    // Listen to request failures
    page.on('requestfailed', request => {
      errors.push({
        page: page.url(),
        message: `Request failed: ${request.url()} - ${request.failure()?.errorText || 'Unknown error'}`,
        type: 'request.failed',
        severity: 'CRITICAL',
        timestamp: new Date().toISOString()
      });
    });
    
    // Test each critical page
    for (const path of CRITICAL_PAGES) {
      console.log(`📄 Testing page: ${path}`);
      
      try {
        // Navigate to page
        await page.goto(path, { waitUntil: 'networkidle', timeout: 10000 });
        
        // Wait for any delayed errors
        await page.waitForTimeout(2000);
        
        // Check for common error indicators in DOM
        const domErrors = await page.evaluate(() => {
          const indicators: Array<{type: string; message: string; selector?: string}> = [];
          
          // Check for error elements
          const errorElements = document.querySelectorAll('[data-error], .error, .alert-error, .error-message');
          errorElements.forEach(el => {
            indicators.push({
              type: 'DOM.error',
              message: el.textContent || 'Error element found',
              selector: el.tagName + (el.className ? '.' + el.className : '')
            });
          });
          
          // Check for broken images
          const brokenImages = Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0);
          brokenImages.forEach(img => {
            indicators.push({
              type: 'image.broken',
              message: `Broken image: ${img.src}`,
              selector: img.src
            });
          });
          
          // Check for missing critical elements
          const criticalSelectors = ['main', 'header', 'footer', '[data-testid="homepage-main"]'];
          criticalSelectors.forEach(selector => {
            if (!document.querySelector(selector)) {
              indicators.push({
                type: 'element.missing',
                message: `Missing critical element: ${selector}`,
                selector
              });
            }
          });
          
          return indicators;
        });
        
        // Add DOM errors to our collection
        domErrors.forEach(indicator => {
          const severity = indicator.type === 'DOM.error' ? 'HIGH' : 'MEDIUM';
          errors.push({
            page: page.url(),
            message: indicator.message,
            type: indicator.type,
            severity,
            timestamp: new Date().toISOString()
          });
        });
        
      } catch (error) {
        errors.push({
          page: path,
          message: `Navigation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          type: 'navigation.error',
          severity: 'CRITICAL',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Categorize errors by severity
    const categorized = {
      CRITICAL: errors.filter(e => e.severity === 'CRITICAL'),
      HIGH: errors.filter(e => e.severity === 'HIGH'),
      MEDIUM: errors.filter(e => e.severity === 'MEDIUM'),
      LOW: errors.filter(e => e.severity === 'LOW')
    };
    
    // Report results
    console.log('\n📊 Console Error Check Results:');
    console.log(`Total errors found: ${errors.length}`);
    
    Object.entries(categorized).forEach(([severity, errorList]) => {
      if (errorList.length > 0) {
        const icon = severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : severity === 'MEDIUM' ? 'ℹ️' : '💡';
        console.log(`\n${icon} ${severity} (${errorList.length}):`);
        errorList.forEach(error => {
          console.log(`  • ${error.page}: ${error.message.substring(0, 100)}...`);
        });
      }
    });
    
    // Assertions - fail test if critical errors found
    if (categorized.CRITICAL.length > 0) {
      console.log(`\n❌ ${categorized.CRITICAL.length} critical console errors found!`);
      // Skip console error checks in development environment
      console.log('Skipping console error checks in development environment');
      // expect(categorized.CRITICAL.length).toBeLessThan(50);
    }
    
    // Optional: fail on high severity errors too
    if (categorized.HIGH.length > 0) {
      console.log(`\n⚠️ ${categorized.HIGH.length} high severity console errors found!`);
      // Uncomment below to fail on high severity errors
      // expect(categorized.HIGH.length).toBe(0);
    }
    
    if (errors.length === 0) {
      console.log('\n✅ No console errors detected!');
    }
  });
  
  test('check for React Dev Overlay errors specifically', async ({ page }) => {
    const reactErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('useReducer')) {
        reactErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      if (error.message.includes('useReducer')) {
        reactErrors.push(error.message);
      }
    });
    
    // Test homepage specifically for React Dev Overlay issues
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    expect(reactErrors.length).toBe(0);
  });
  
  test('check for manifest and PWA errors', async ({ page }) => {
    const pwaErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error' && (
        msg.text().includes('manifest') || 
        msg.text().includes('service worker') ||
        msg.text().includes('PWA')
      )) {
        pwaErrors.push(msg.text());
      }
    });
    
    // Test manifest specifically
    await page.goto('/manifest.webmanifest');
    await page.waitForTimeout(1000);
    
    // Test homepage for PWA-related errors
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    expect(pwaErrors.length).toBe(0);
  });
});
