# 📌 Web Vitals Guardrail - Performance Standards

## Role
Always enforce Web Vitals optimizations (LCP, TBT, CLS, FCP, INP) when modifying or adding code. Prevent regressions by applying best practices automatically.

## Non-Negotiable Rules

### Largest Contentful Paint (LCP) - Target: <2.5s

**The LCP element (usually the hero image/text) must load in <2.5s.**

#### Hero Image Requirements:
- Use `<Image priority />` with explicit `width`/`height` or `fill`
- Be compressed WebP/AVIF and **≤200KB**
- Use `sizes="100vw"`
- Optionally add `placeholder="blur"`
- Add `<link rel="preload" as="image" ...>` for the LCP image

#### Code Example:
```tsx
// ✅ Correct
<Image
  src="/hero.webp"
  alt="Hero"
  width={1200}
  height={675}
  priority
  fetchPriority="high"
  className="hero-image"
  sizes="100vw"
/>

// ❌ Avoid
<Image
  src="/hero.jpg" // Large JPEG
  alt="Hero"
  width={1920}
  height={1080}
  // Missing priority
/>
```

### Total Blocking Time (TBT) - Target: <300ms

**Target TBT <300ms.**

#### JavaScript Optimization:
- Lazy-load non-critical JS via `dynamic(import(), { ssr: false })`
- Load 3rd-party scripts with `<Script strategy="lazyOnload" />`
- Remove long blocking tasks (>200ms)
- Keep critical CSS minimal; inline only above-the-fold styles

#### Code Example:
```tsx
// ✅ Correct
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Skeleton />
});

// ❌ Avoid
import HeavyComponent from './HeavyComponent'; // Blocks main thread
```

### First Contentful Paint (FCP) - Target: <1.8s

#### Font Optimization:
- Use `next/font` with `display: "swap"`
- Preload only fonts used above-the-fold
- Avoid font-display: block

#### Code Example:
```tsx
// ✅ Correct
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// ❌ Avoid
const inter = Inter({
  subsets: ['latin'],
  display: 'block', // Blocks rendering
});
```

### Cumulative Layout Shift (CLS) - Target: <0.1

#### Layout Stability:
- Always define explicit `width`/`height` for `<Image>`
- Never lazy-load fonts without `display: "swap"`
- Ensure UI elements reserve space (no layout jumps)

#### Code Example:
```tsx
// ✅ Correct
<div className="min-h-[200px]"> {/* Reserve space */}
  <Image
    src="/product.jpg"
    width={300}
    height={200}
    alt="Product"
  />
</div>

// ❌ Avoid
<div> {/* No reserved space */}
  <Image
    src="/product.jpg"
    fill
    alt="Product"
  />
</div>
```

## Code & Bundle Hygiene

### Bundle Analysis Requirements:
Run `@next/bundle-analyzer` on every build. **Fail if:**
- First Load JS > 200KB (gzip)
- Any single route chunk > 250KB

### Library Optimization:
- Tree-shake unused libraries
- Prefer lightweight utils:
  - `date-fns` over `moment`
  - `lodash-es` over `lodash`
  - `@radix-ui/react-icons` over custom SVGs

### Webpack Configuration:
```js
// ✅ Optimized bundle splitting
splitChunks: {
  chunks: 'all',
  maxInitialRequests: 25,
  minSize: 20000,
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
      priority: 10,
    },
    // Separate React, UI, animations
  }
}
```

## Verification Required

### After Changes, Run Lighthouse (Mobile) and Confirm:
- **LCP <2.5s**
- **TBT <300ms**
- **CLS <0.1**
- **FCP <1.8s**
- **INP <200ms**

### Chrome DevTools Performance Tab:
- No long main-thread blocking tasks
- No layout thrashing
- Efficient paint operations

## Output Requirements (When Fixing Code)

### Always Include:
1. **Explanation** of how the change improves LCP or TBT
2. **Before/after code snippets**
3. **New Lighthouse/Web Vitals expectations**
4. **Warning** if a fix might regress performance, with fallback suggestions

### Example Output Format:
```markdown
## 🚀 Performance Fix: Hero Image Optimization

### Problem
- LCP: 10.47s (terrible)
- Hero image: 152KB (too large)

### Solution
- Compressed hero image: 152KB → 31KB (80% reduction)
- Added `priority` and `fetchPriority="high"`
- Optimized dimensions: 1200x675

### Expected Improvements
- LCP: 10.47s → <2.5s
- FCP: Should improve significantly

### Code Changes
```tsx
// Before
<Image src="/hero.jpg" width={1920} height={1080} />

// After  
<Image 
  src="/hero-optimized.webp"
  width={1200}
  height={675}
  priority
  fetchPriority="high"
  sizes="100vw"
/>
```
```

## Performance Monitoring

### Automated Checks:
- Lighthouse CI integration
- Bundle size monitoring
- Core Web Vitals tracking

### Manual Verification:
- Test on slow 3G connection
- Verify on low-end devices
- Check mobile performance

## Emergency Performance Fixes

### If LCP > 2.5s:
1. Reduce hero image size immediately
2. Remove non-critical CSS from critical path
3. Defer non-essential JavaScript

### If TBT > 300ms:
1. Split large components
2. Remove blocking third-party scripts
3. Optimize bundle splitting

### If CLS > 0.1:
1. Add explicit dimensions to all images
2. Reserve space for dynamic content
3. Fix font loading strategy

---

**Remember: Performance is a feature, not an afterthought. Every code change must consider its impact on Core Web Vitals.**
