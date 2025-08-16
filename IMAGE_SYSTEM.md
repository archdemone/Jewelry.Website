# Product Image Management System

## Overview

This document describes the product image management system for the jewelry e-commerce website. The system ensures each product has unique, relevant images with proper fallbacks.

## Architecture

### File Structure
```
public/
└── images/
    └── products/
        ├── diamond-solitaire-ring-1.jpg
        ├── diamond-solitaire-ring-2.jpg
        ├── gold-wedding-band-1.jpg
        ├── placeholder.svg
        ├── placeholder-ring.svg
        └── ... (other product images)
```

### Image Naming Convention
- **Product Images**: `{product-slug}-{number}.{extension}`
  - Example: `diamond-solitaire-ring-1.jpg`
- **Placeholder Images**: `placeholder-{category}.{extension}`
  - Example: `placeholder-ring.svg`

## Core Components

### 1. Image Configuration (`src/lib/assets/images.ts`)

#### Product Image Mapping
```typescript
export const PRODUCT_IMAGES: Record<string, string[]> = {
  'diamond-solitaire-ring': [
    '/images/products/diamond-solitaire-ring-1.jpg',
    '/images/products/diamond-solitaire-ring-2.jpg',
    '/images/products/diamond-solitaire-ring-3.jpg',
  ],
  // ... other products
};
```

#### Category Placeholders
```typescript
export const CATEGORY_PLACEHOLDERS = {
  rings: '/images/products/placeholder-ring.svg',
  necklaces: '/images/products/placeholder-necklace.svg',
  bracelets: '/images/products/placeholder-bracelet.svg',
  earrings: '/images/products/placeholder-earrings.svg',
  watches: '/images/products/placeholder-watch.svg',
  pendants: '/images/products/placeholder-pendant.svg',
};
```

### 2. Smart Image Component (`src/components/common/SmartImage.tsx`)

Features:
- **Multiple Image Support**: Tries multiple images in sequence
- **Error Handling**: Falls back to CSS gradient if all images fail
- **Local Image Support**: Optimized for `/public/images/` paths
- **Responsive Design**: Maintains aspect ratios

### 3. Image Helper Functions

#### `getProductImages(productSlug: string): string[]`
Returns the specific images for a product by slug.

#### `getProductImageFallback(opts): string[]`
Returns images with fallback logic:
1. Try specific product images
2. Fall back to category placeholder
3. Use default placeholder as last resort

## Usage Examples

### In Product Components
```typescript
import { getProductImageFallback } from '@/lib/assets/images'
import SmartImage from '@/components/common/SmartImage'

// Get images for a specific product
const productImages = getProductImageFallback({ 
  productSlug: 'diamond-solitaire-ring',
  categorySlug: 'rings',
  name: 'Diamond Solitaire Ring'
})

// Use in component
<SmartImage 
  srcs={productImages}
  alt="Diamond Solitaire Ring"
  className="h-full w-full"
  width={300}
  height={300}
/>
```

### In Product Lists
```typescript
{products.map((product) => {
  const images = getProductImageFallback({ 
    productSlug: product.slug,
    categorySlug: product.category?.slug,
    name: product.name 
  })
  
  return (
    <SmartImage 
      srcs={images}
      alt={product.name}
      className="h-full w-full"
    />
  )
})}
```

## Validation System

### QA Script (`scripts/validate-images.js`)

The validation script checks for:
- ✅ **Missing Images**: Products without corresponding image files
- ✅ **Unused Images**: Files not referenced in the code
- ✅ **Duplicate Assignments**: Same image used by multiple products
- ✅ **Path Validation**: Ensures all paths are correct

### Available Commands

```bash
# Validate all image paths
npm run validate-images

# Generate SVG placeholder images
npm run generate-placeholders

# Full check (generate placeholders + validate)
npm run check-images

# Build with validation (runs automatically)
npm run build
```

### Validation Output Example
```
🔍 Validating product image paths...

📊 Summary:
   Total expected files: 44
   Total actual files: 7
   Missing files: 37
   Unused files: 0
   Duplicate entries: 0

❌ Missing files:
   - /images/products/diamond-solitaire-ring-1.jpg
   - /images/products/diamond-solitaire-ring-2.jpg
   ...

❌ Image validation failed - missing files or duplicates found
```

## Adding New Products

### 1. Add Product Images
1. Place images in `/public/images/products/`
2. Follow naming convention: `{product-slug}-{number}.{extension}`
3. Use descriptive, relevant images

### 2. Update Configuration
```typescript
// In src/lib/assets/images.ts
export const PRODUCT_IMAGES: Record<string, string[]> = {
  // ... existing products
  'new-product-slug': [
    '/images/products/new-product-slug-1.jpg',
    '/images/products/new-product-slug-2.jpg',
  ],
};
```

### 3. Validate
```bash
npm run validate-images
```

## Fallback Strategy

### Image Loading Priority
1. **Specific Product Images**: Exact matches for product slug
2. **Category Placeholders**: Relevant category placeholder
3. **Default Placeholder**: Generic jewelry placeholder (SVG)
4. **CSS Gradient**: Beautiful gold gradient with text overlay

### Error Handling
- **Network Errors**: Automatic retry with next image
- **Missing Files**: Graceful fallback to CSS gradient
- **Invalid Paths**: Validation script catches these

## Best Practices

### Image Guidelines
- **Format**: Use JPG for photos, SVG for placeholders
- **Size**: Optimize for web (max 800px width)
- **Quality**: High quality, professional jewelry photos
- **Consistency**: Similar lighting and background across category

### Performance
- **Lazy Loading**: Images load as needed
- **Optimization**: Next.js Image component handles optimization
- **Caching**: Static images are cached by browser

### Maintenance
- **Regular Validation**: Run validation before deployments
- **Version Control**: Track image changes in git
- **Backup**: Keep original high-resolution images

## Troubleshooting

### Common Issues

#### Missing Images
```bash
# Check what's missing
npm run validate-images

# Generate placeholders
npm run generate-placeholders
```

#### Wrong Images Showing
1. Check product slug matches in `PRODUCT_IMAGES`
2. Verify image paths are correct
3. Clear browser cache

#### Build Failures
```bash
# Validate before building
npm run validate-images

# If validation passes, try building
npm run build
```

### Debug Mode
Add console logs to see which images are being loaded:
```typescript
const productImages = getProductImageFallback({ 
  productSlug: product.slug,
  categorySlug: product.category?.slug,
  name: product.name 
})
console.log('Product images:', productImages)
```

## Future Enhancements

### Planned Features
- **Image CDN Integration**: Cloud storage for better performance
- **Dynamic Image Generation**: AI-powered product images
- **Image Analytics**: Track which images perform best
- **Bulk Upload**: Admin interface for image management

### Scalability
- **Category-based Organization**: Subdirectories for categories
- **Image Metadata**: Alt text, captions, and SEO data
- **Multiple Formats**: WebP, AVIF for modern browsers
- **Responsive Images**: Different sizes for different devices
