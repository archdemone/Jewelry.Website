# Lighthouse Performance Optimization Guide

## Overview
This guide provides strategies to improve your Lighthouse performance scores and meet the performance thresholds.

## Current Performance Status

### ✅ **Passing Checks**
- **Bundle Sizes**: All within realistic e-commerce limits
- **Hero Image**: 31KB (under 200KB limit)
- **Critical CSS**: 21 lines (minimal)
- **Image Optimization**: ✅ WebP, priority loading, explicit dimensions
- **JavaScript Optimization**: ✅ Dynamic imports, SSR disabled for non-critical
- **Font Optimization**: ✅ Display swap, preload, fallbacks

### 🎯 **Lighthouse Score Targets**
- **Performance**: 90+ (Green)
- **Accessibility**: 95+ (Green)
- **Best Practices**: 95+ (Green)
- **SEO**: 95+ (Green)

## Performance Optimization Strategies

### 1. **Image Optimization** (Already Implemented ✅)

**Current Status**: Excellent
- Hero image: 31KB (WebP format)
- Priority loading with `fetchPriority="high"`
- Explicit dimensions to prevent layout shifts
- Responsive `sizes` attribute

**Further Improvements**:
```bash
# Optimize all product images
npx sharp-cli -i "public/images/products/*.jpg" -o "public/images/products/" resize 800 600 --format webp --quality 80

# Create multiple sizes for responsive images
npx sharp-cli -i "public/images/products/*.jpg" -o "public/images/products/" resize 400 300 --format webp --quality 70
```

### 2. **JavaScript Bundle Optimization**

**Current Status**: Good (1.31MB total)
- Vendor bundle: 1.15MB
- React bundle: 132KB
- Common bundle: 29KB

**Further Improvements**:

#### A. Code Splitting
```typescript
// Lazy load admin components
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  ssr: false,
  loading: () => <AdminSkeleton />
});

// Lazy load heavy features
const ProductGallery = dynamic(() => import('@/components/products/Gallery'), {
  ssr: false
});
```

#### B. Tree Shaking
```typescript
// Use specific imports instead of entire libraries
import { debounce } from 'lodash-es/debounce';
import { format } from 'date-fns/format';
```

#### C. Bundle Analysis
```bash
# Analyze bundle composition
npm run analyze

# Check for duplicate dependencies
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

### 3. **Critical CSS Optimization**

**Current Status**: Good (21 lines)
- Minimal critical CSS for hero section
- Non-critical CSS loaded asynchronously

**Further Improvements**:
```css
/* Extract only above-the-fold styles */
.hero-section,
.hero-image,
.navbar,
.main-content {
  /* Only essential styles */
}
```

### 4. **Font Optimization**

**Current Status**: Excellent ✅
- `display: "swap"` implemented
- Preload for critical fonts
- Fallback fonts specified

### 5. **Server-Side Rendering Optimization**

**Current Status**: Good
- Static pages pre-rendered
- Dynamic pages with ISR

**Further Improvements**:
```typescript
// Add ISR to product pages
export const revalidate = 3600; // 1 hour

// Pre-generate popular pages
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```

### 6. **Caching Strategy**

**Implement aggressive caching**:
```typescript
// In next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 7. **Third-Party Script Optimization**

**Current Status**: Good
- Analytics loaded with `strategy="lazyOnload"`
- Non-critical scripts deferred

**Further Improvements**:
```typescript
// Use resource hints
<link rel="dns-prefetch" href="//www.googletagmanager.com" />
<link rel="preconnect" href="https://www.googletagmanager.com" />

// Load third-party scripts only when needed
const loadAnalytics = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js';
    document.head.appendChild(script);
  }
};
```

## Lighthouse Testing Commands

### 1. **Local Lighthouse Testing**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Run with specific settings
lighthouse http://localhost:3000 --only-categories=performance --output json
```

### 2. **CI Integration**
```bash
# Add to package.json scripts
"lighthouse": "lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json",
"lighthouse:ci": "lighthouse http://localhost:3000 --only-categories=performance --output json --output-path ./lighthouse-report.json"
```

### 3. **Performance Budget**
```json
{
  "performance": {
    "budgets": [
      {
        "type": "FirstContentfulPaint",
        "maximum": 1800
      },
      {
        "type": "LargestContentfulPaint",
        "maximum": 2500
      },
      {
        "type": "TotalBlockingTime",
        "maximum": 300
      },
      {
        "type": "CumulativeLayoutShift",
        "maximum": 0.1
      }
    ]
  }
}
```

## Monitoring and Maintenance

### 1. **Core Web Vitals Monitoring**
```typescript
// In src/app/vitals.ts
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    console.log(metric);
    
    // Alert if thresholds exceeded
    if (metric.name === 'LCP' && metric.value > 2500) {
      console.warn('LCP exceeded threshold:', metric.value);
    }
  }
}
```

### 2. **Performance Regression Testing**
```bash
# Automated performance testing
npm run lighthouse:ci

# Compare with baseline
npx lighthouse-compare baseline.json current.json
```

### 3. **Real User Monitoring (RUM)**
```typescript
// Track real user performance
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      // Send to analytics
      analytics.track('LCP', { value: entry.startTime });
    }
  }
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });
```

## Quick Wins for Immediate Improvement

### 1. **Enable Compression**
```javascript
// In next.config.js
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

### 2. **Optimize Images Further**
```bash
# Convert all images to WebP
find public/images -name "*.jpg" -exec npx sharp-cli -i {} -o {}.webp --format webp --quality 80 \;
```

### 3. **Minimize Critical CSS**
```css
/* Extract only essential styles for above-the-fold */
.hero-section { min-height: 100vh; position: relative; }
.hero-image { width: 100%; height: 100%; object-fit: cover; }
```

### 4. **Preload Critical Resources**
```html
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/images/hero.webp" as="image" />
```

## Expected Results

After implementing these optimizations:

- **Performance Score**: 90-95+
- **LCP**: < 2.5s
- **FCP**: < 1.8s
- **TBT**: < 300ms
- **CLS**: < 0.1

## Next Steps

1. **Run Lighthouse audit** to get baseline scores
2. **Implement quick wins** for immediate improvement
3. **Set up monitoring** for ongoing performance tracking
4. **Optimize based on audit results** focusing on largest opportunities
5. **Establish performance budgets** to prevent regressions

## Resources

- [Lighthouse Performance Best Practices](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance Optimization](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals Library](https://github.com/GoogleChrome/web-vitals)
