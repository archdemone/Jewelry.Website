// Ring image management system
// Using local images stored in /public/images/products/

export const RING_IMAGES: Record<string, string[]> = {
  // Engagement Rings
  'classic-solitaire-engagement-ring': [
    '/images/products/classic-solitaire-engagement-ring-1.jpg',
    '/images/products/classic-solitaire-engagement-ring-2.jpg',
  ],
  'vintage-inspired-halo-ring': [
    '/images/products/vintage-halo-ring-1.jpg',
    '/images/products/vintage-halo-ring-2.jpg',
  ],
  'modern-three-stone-ring': [
    '/images/products/modern-three-stone-ring-1.jpg',
    '/images/products/modern-three-stone-ring-2.jpg',
  ],

  // Wedding Bands
  'hammered-wedding-band': [
    '/images/products/hammered-wedding-band-1.jpg',
    '/images/products/hammered-wedding-band-2.jpg',
  ],
  'classic-plain-wedding-band': [
    '/images/products/classic-plain-wedding-band-1.jpg',
    '/images/products/classic-plain-wedding-band-2.jpg',
  ],
  'diamond-pave-wedding-band': [
    '/images/products/diamond-pave-wedding-band-1.jpg',
    '/images/products/diamond-pave-wedding-band-2.jpg',
  ],

  // Eternity Rings
  'sapphire-eternity-ring': [
    '/images/products/sapphire-eternity-ring-1.jpg',
    '/images/products/sapphire-eternity-ring-2.jpg',
  ],
  'diamond-eternity-ring': [
    '/images/products/diamond-eternity-ring-1.jpg',
    '/images/products/diamond-eternity-ring-2.jpg',
  ],

  // Signet Rings
  'classic-signet-ring': [
    '/images/products/classic-signet-ring-1.jpg',
    '/images/products/classic-signet-ring-2.jpg',
  ],

  // Statement Rings
  'emerald-statement-ring': [
    '/images/products/emerald-statement-ring-1.jpg',
    '/images/products/emerald-statement-ring-2.jpg',
  ],
  'ruby-cocktail-ring': [
    '/images/products/ruby-cocktail-ring-1.jpg',
    '/images/products/ruby-cocktail-ring-2.jpg',
  ],

  // Stackable Rings
  'minimalist-gold-band': [
    '/images/products/minimalist-gold-band-1.jpg',
    '/images/products/minimalist-gold-band-2.jpg',
  ],
  'diamond-accent-band': [
    '/images/products/diamond-accent-band-1.jpg',
    '/images/products/diamond-accent-band-2.jpg',
  ],
};

// Ring category placeholder images
export const RING_CATEGORY_PLACEHOLDERS = {
  'engagement-rings': '/images/products/category-engagement-rings.jpg',
  'wedding-bands': '/images/products/category-wedding-bands.jpg',
  'eternity-rings': '/images/products/category-eternity-rings.jpg',
  'signet-rings': '/images/products/category-signet-rings.jpg',
  'statement-rings': '/images/products/category-statement-rings.jpg',
  'stackable-rings': '/images/products/category-stackable-rings.jpg',
} as const;

// Default placeholder for any missing images
export const DEFAULT_PLACEHOLDER = '/images/products/placeholder.jpg';

// Get ring images by slug
export function getRingImages(ringSlug: string): string[] {
  const images = RING_IMAGES[ringSlug as keyof typeof RING_IMAGES];
  if (images && images.length > 0) {
    return images;
  }
  
  // Fallback to default placeholder
  return [DEFAULT_PLACEHOLDER];
}

// Get ring category placeholder
export function getRingCategoryPlaceholder(categorySlug?: string): string {
  if (!categorySlug) return DEFAULT_PLACEHOLDER;
  return RING_CATEGORY_PLACEHOLDERS[categorySlug as keyof typeof RING_CATEGORY_PLACEHOLDERS] || DEFAULT_PLACEHOLDER;
}

// Get product image fallback with category context (updated for rings)
export function getProductImageFallback(opts: { 
  productSlug?: string; 
  categorySlug?: string; 
  name?: string 
}): string[] {
  // First try to get specific ring images
  if (opts.productSlug) {
    const ringImages = getRingImages(opts.productSlug);
    if (ringImages[0] !== DEFAULT_PLACEHOLDER) {
      return ringImages;
    }
  }
  
  // Fallback to ring category placeholder
  const categoryPlaceholder = getRingCategoryPlaceholder(opts.categorySlug);
  return [categoryPlaceholder];
}

// Legacy function for backward compatibility (updated for rings)
export function getCategoryImage(slug?: string): string[] {
  const placeholder = getRingCategoryPlaceholder(slug);
  return [placeholder];
}

// Get product images by slug (legacy compatibility)
export function getProductImages(productSlug: string): string[] {
  return getRingImages(productSlug);
}

// Get category placeholder (legacy compatibility)
export function getCategoryPlaceholder(categorySlug?: string): string {
  return getRingCategoryPlaceholder(categorySlug);
}


