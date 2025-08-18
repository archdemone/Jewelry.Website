# Performance Optimization Guide

## 🎯 **Performance Targets**

- **Lighthouse Performance:** ≥ 90 (from current ~74)
- **LCP:** ≤ 2.5s (from current ~9.6s)
- **CLS:** ≤ 0.1
- **TBT:** ≤ 200ms
- **Initial JS:** ≤ 200KB parsed

## 📊 **Current Performance (Before Optimization)**

- **Performance Score:** ~74/100
- **LCP:** ~9.6s (❌ Poor)
- **Speed Index:** ~4.9s (⚠️ Needs Improvement)
- **FCP:** ~2.3s (✅ Good)
- **Bundle Size:** ~2.51MB (❌ Too Large)

## 🚀 **Optimization Checklist**

### **1. Production Build Setup** ✅

- [x] Add `build:prod` and `start:prod` scripts
- [x] Create performance testing documentation
- [x] Set up Lighthouse CI workflow

### **2. Render-Blocking Resources** 🔄

- [ ] Inline critical CSS for above-the-fold content
- [ ] Load non-critical CSS asynchronously
- [ ] Defer non-critical JavaScript
- [ ] Optimize font loading with `font-display: swap`

### **3. Code Splitting & Lazy Loading** 🔄

- [ ] Split large routes using dynamic imports
- [ ] Lazy-load below-the-fold components
- [ ] Guard expensive modules behind interactions
- [ ] Implement route-based code splitting

### **4. Bundle Optimization** 🔄

- [ ] Remove unused CSS and JavaScript
- [ ] Enable tree-shaking for production builds
- [ ] Replace heavy libraries with lighter alternatives
- [ ] Minify CSS and JavaScript

### **5. Image Optimization** 🔄

- [ ] Convert images to WebP/AVIF format
- [ ] Add `loading="lazy"` to offscreen images
- [ ] Provide explicit width/height to prevent layout shifts
- [ ] Optimize hero image for LCP

### **6. Critical Asset Preloading** 🔄

- [ ] Preload critical fonts
- [ ] Preload hero image
- [ ] Preload critical CSS chunks
- [ ] Add preconnect for external origins

### **7. Layout Stability** 🔄

- [ ] Reserve space for images and iframes
- [ ] Avoid late-loading fonts without fallbacks
- [ ] Implement proper aspect ratios
- [ ] Use CSS containment where appropriate

## 🛠️ **Implementation Steps**

### **Step 1: Production Build Scripts**

```bash
# Build production version
npm run build:prod

# Start production server
npm run start:prod

# Run Lighthouse test
npm run perf:lighthouse
```

### **Step 2: Critical CSS Inlining**

- Extract critical CSS for above-the-fold content
- Inline critical styles in `<head>`
- Load remaining CSS asynchronously

### **Step 3: Code Splitting**

- Implement dynamic imports for routes
- Lazy-load non-critical components
- Split vendor bundles

### **Step 4: Image Optimization**

- Convert hero image to WebP
- Implement responsive images
- Add proper lazy loading

### **Step 5: Bundle Analysis**

- Analyze bundle size with webpack-bundle-analyzer
- Remove unused dependencies
- Optimize imports

## 📈 **Expected Results (After Optimization)**

- **Performance Score:** ≥ 90/100
- **LCP:** ≤ 2.5s (70% improvement)
- **Speed Index:** ≤ 3.0s (40% improvement)
- **Bundle Size:** ≤ 200KB initial JS
- **CLS:** ≤ 0.1 (stable layout)

## 🔍 **Testing Commands**

```bash
# Run performance tests
npm run perf:lighthouse

# Check bundle size
npm run size-limit

# Run Web Vitals check
npm run web-vitals-check
```

## 📝 **Notes**

- Focus on localhost performance (no CDN/caching)
- Maintain development experience
- Test on both desktop and mobile
- Monitor Core Web Vitals in production
