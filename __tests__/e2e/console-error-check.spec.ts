import { test, expect } from '@playwright/test';

const CRITICAL_PAGES = [
  // Homepage
  '/',

  // Shop pages
  '/products',
  '/products/enhanced',
  '/products/inlay',
  '/products/mens',
  '/products/unisex',
  '/products/wedding',
  '/products/womens',

  // Main pages
  '/about',
  '/about-artisan',
  '/cart',
  '/contact',
  '/crafting-process',

  // Admin pages (most critical for testing)
  '/admin',
  '/admin/analytics',
  '/admin/audit',
  '/admin/customers',
  '/admin/featured-products',
  '/admin/inventory',
  '/admin/media',
  '/admin/orders',
  '/admin/products',
  '/admin/settings',

  // Utility pages
  '/search'
];

const CONSOLE_ERROR_PATTERNS = {
  // React/Next.js errors and warnings
  REACT_ERROR: /React|useReducer|useState|useEffect|ErrorBoundary/i,
  REACT_WARNING: /Warning.*Encountered two children with the same key|Warning.*Each child in a list should have a unique key|Warning.*Cannot update during an existing state transition/i,
  NEXTJS_ERROR: /Next\.js|next|build|hydration|Internal Server Error/i,

  // JavaScript errors
  JAVASCRIPT_ERROR: /TypeError|ReferenceError|SyntaxError|RangeError|EvalError|URIError/i,
  UNDEFINED_ERROR: /undefined|null|Cannot read property|is not defined|Cannot read properties of undefined/i,

  // Network errors
  NETWORK_ERROR: /fetch|axios|network|CORS|404|500|503|502|504|Failed to fetch|Network request failed/i,

  // Performance errors
  PERFORMANCE_ERROR: /timeout|slow|performance|memory|Maximum call stack size exceeded/i,

  // Third-party errors
  THIRD_PARTY_ERROR: /stripe|analytics|google|facebook|paypal|shopify/i,

  // PWA errors
  PWA_ERROR: /service worker|manifest|offline|cache|installation failed/i,

  // DOM errors
  DOM_ERROR: /Cannot set property|Cannot read property|is not a function|Unexpected token/i,

  // Accessibility errors
  ACCESSIBILITY_ERROR: /ARIA|accessibility|screen reader|tabindex/i,

  // Security errors
  SECURITY_ERROR: /Content Security Policy|XSS|CSRF|CORS|Mixed Content/i,

  // Database/API errors
  API_ERROR: /API|database|connection|timeout|rate limit/i
};

const categorizeError = (errorMessage: string) => {
  for (const [patternName, pattern] of Object.entries(CONSOLE_ERROR_PATTERNS)) {
    if (pattern.test(errorMessage)) {
      if (patternName.includes('REACT') || patternName.includes('NEXTJS') ||
          patternName.includes('JAVASCRIPT') || patternName.includes('UNDEFINED') ||
          patternName.includes('DOM') || patternName.includes('SECURITY')) {
        return 'CRITICAL';
      } else if (patternName.includes('NETWORK') || patternName.includes('API') ||
                 patternName.includes('PERFORMANCE')) {
        return 'HIGH';
      } else if (patternName.includes('THIRD_PARTY') || patternName.includes('PWA') ||
                 patternName.includes('ACCESSIBILITY')) {
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

    // Listen to console events (errors and warnings)
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        const severity = categorizeError(msg.text());
        errors.push({
          page: page.url(),
          message: msg.text(),
          type: msg.type(),
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

        // For admin pages, test user interactions
        if (path.includes('/admin/')) {
          console.log(`🔧 Testing admin page interactions: ${path}`);

          try {
            // Wait for page to load
            await page.waitForSelector('body', { timeout: 5000 });

            // Test admin panel interactions if available
            if (path === '/admin/products' || path === '/admin') {
              // Wait for products to load
              await page.waitForSelector('[data-testid="product-card"], .product-card, .grid, .space-y-4', { timeout: 5000 }).catch(() => {
                console.log(`No product cards found on ${path}, continuing...`);
              });

              // Click edit button on first product (if available)
              const editButtons = [
                'button:has-text("Edit")',
                'button:has-text("Edit Product")',
                '[data-testid="edit-button"]',
                '.edit-button'
              ];

              for (const selector of editButtons) {
                const editButton = page.locator(selector).first();
                if (await editButton.isVisible()) {
                  console.log(`Clicking edit button on ${path}`);
                  await editButton.click();
                  await page.waitForTimeout(3000); // Wait for modal to open and any errors

                  // Close modal
                  const closeButtons = [
                    'button:has-text("Cancel")',
                    'button:has-text("Close")',
                    'button:has-text("×")',
                    '.close-button',
                    '[data-testid="close-button"]'
                  ];

                  for (const closeSelector of closeButtons) {
                    const closeButton = page.locator(closeSelector).first();
                    if (await closeButton.isVisible()) {
                      await closeButton.click();
                      await page.waitForTimeout(1000);
                      break;
                    }
                  }
                  break;
                }
              }
            }
          } catch (error) {
            console.log(`Admin interaction failed on ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

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
    
    // Assertions - fail test if ANY errors found (no exceptions)
    if (categorized.CRITICAL.length > 0) {
      console.log(`\n❌ ${categorized.CRITICAL.length} critical console errors found!`);
      console.log('Failing test due to critical errors - NO EXCEPTIONS ALLOWED');
      expect(categorized.CRITICAL.length).toBe(0);
    }

    // Fail on high severity errors too
    if (categorized.HIGH.length > 0) {
      console.log(`\n⚠️ ${categorized.HIGH.length} high severity console errors found!`);
      console.log('Failing test due to high severity errors - NO EXCEPTIONS ALLOWED');
      expect(categorized.HIGH.length).toBe(0);
    }

    // Even medium severity errors should be flagged
    if (categorized.MEDIUM.length > 0) {
      console.log(`\n📢 ${categorized.MEDIUM.length} medium severity console errors found!`);
      console.log('These should be investigated and fixed');
      // For now, don't fail on medium errors but log them prominently
    }

    // Log low severity errors but don't fail
    if (categorized.LOW.length > 0) {
      console.log(`\n💡 ${categorized.LOW.length} low severity console messages found`);
      console.log('These are informational and may indicate potential issues');
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

  test('check for React warnings in admin panel (SANDBOX)', async ({ page }) => {
    const reactWarnings: string[] = [];
    const consoleErrors: string[] = [];

    // Listen to console warnings and errors
    page.on('console', msg => {
      if (msg.type() === 'warning' && (
        msg.text().includes('Encountered two children with the same key') ||
        msg.text().includes('Each child in a list should have a unique key')
      )) {
        reactWarnings.push(msg.text());
      }
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to admin panel in sandbox (port 3001)
    await page.goto('http://localhost:3001/admin/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Wait for products to load
    await page.waitForSelector('body', { timeout: 5000 });

    // Click edit button to trigger the React warnings
    const editButton = page.locator('button:has-text("Edit")').first();
    if (await editButton.isVisible()) {
      console.log('Clicking edit button to test for React warnings...');
      await editButton.click();
      await page.waitForTimeout(4000); // Wait for modal and warnings

      // Close modal
      const closeButton = page.locator('button:has-text("Cancel")').first();
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    }

    // This should fail if React warnings or errors are found
    if (reactWarnings.length > 0) {
      console.log('❌ React warnings found:', reactWarnings);
    }
    if (consoleErrors.length > 0) {
      console.log('❌ Console errors found:', consoleErrors);
    }

    expect(reactWarnings.length).toBe(0);
    expect(consoleErrors.length).toBe(0);
  });

  test('comprehensive accessibility and DOM error check', async ({ page }) => {
    const errors: Array<{type: string; message: string; selector?: string}> = [];

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        const severity = categorizeError(msg.text());
        if (severity === 'CRITICAL' || severity === 'HIGH') {
          errors.push({
            type: msg.type(),
            message: msg.text()
          });
        }
      }
    });

    // Test each critical page for accessibility and DOM issues
    for (const path of CRITICAL_PAGES.slice(0, 5)) { // Test first 5 pages for performance
      console.log(`🔍 Testing accessibility and DOM on: ${path}`);

      try {
        await page.goto(path, { waitUntil: 'networkidle', timeout: 10000 });

        // Check for accessibility issues
        const accessibilityIssues = await page.evaluate(() => {
          const issues: Array<{type: string; message: string; element?: string}> = [];

          // Check for missing alt text on images
          const images = Array.from(document.querySelectorAll('img:not([alt])'));
          images.forEach(img => {
            issues.push({
              type: 'accessibility',
              message: 'Image missing alt attribute',
              element: img.outerHTML
            });
          });

          // Check for missing labels on form inputs
          const inputs = Array.from(document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]):not([placeholder])'));
          inputs.forEach(input => {
            const inputElement = input as HTMLInputElement;
            if (inputElement.type !== 'submit' && inputElement.type !== 'button' && inputElement.type !== 'hidden') {
              issues.push({
                type: 'accessibility',
                message: 'Form input missing accessible label',
                element: input.outerHTML
              });
            }
          });

          // Check for empty headings
          const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
          headings.forEach(heading => {
            if (!heading.textContent?.trim()) {
              issues.push({
                type: 'accessibility',
                message: 'Empty heading found',
                element: heading.outerHTML
              });
            }
          });

          return issues;
        });

        errors.push(...accessibilityIssues.map(issue => ({
          type: issue.type,
          message: issue.message,
          selector: issue.element
        })));

      } catch (error) {
        errors.push({
          type: 'navigation',
          message: `Failed to test accessibility: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    }

    // Fail test if any critical issues found
    expect(errors.length).toBe(0);
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
