// Product image management system
// Using local images stored in /public/images/products/

export const PRODUCT_IMAGES: Record<string, string[]> = {
  // Rings
  'diamond-solitaire-ring': [
    '/images/products/diamond-solitaire-ring-1.jpg',
    '/images/products/diamond-solitaire-ring-2.jpg',
    '/images/products/diamond-solitaire-ring-3.jpg',
  ],
  'gold-wedding-band': [
    '/images/products/gold-wedding-band-1.jpg',
    '/images/products/gold-wedding-band-2.jpg',
  ],
  'emerald-ring': [
    '/images/products/emerald-ring-1.jpg',
    '/images/products/emerald-ring-2.jpg',
  ],

  // Necklaces
  'diamond-pendant-necklace': [
    '/images/products/diamond-pendant-necklace-1.jpg',
    '/images/products/diamond-pendant-necklace-2.jpg',
  ],
  'gold-chain-necklace': [
    '/images/products/gold-chain-necklace-1.jpg',
    '/images/products/gold-chain-necklace-2.jpg',
  ],
  'pearl-necklace': [
    '/images/products/pearl-necklace-1.jpg',
    '/images/products/pearl-necklace-2.jpg',
  ],

  // Bracelets
  'tennis-bracelet': [
    '/images/products/tennis-bracelet-1.jpg',
    '/images/products/tennis-bracelet-2.jpg',
  ],
  'gold-bangle-bracelet': [
    '/images/products/gold-bangle-bracelet-1.jpg',
    '/images/products/gold-bangle-bracelet-2.jpg',
  ],
  'charm-bracelet': [
    '/images/products/charm-bracelet-1.jpg',
    '/images/products/charm-bracelet-2.jpg',
  ],

  // Earrings
  'pearl-drop-earrings': [
    '/images/products/pearl-drop-earrings-1.jpg',
    '/images/products/pearl-drop-earrings-2.jpg',
  ],
  'diamond-stud-earrings': [
    '/images/products/diamond-stud-earrings-1.jpg',
    '/images/products/diamond-stud-earrings-2.jpg',
  ],
  'gold-hoop-earrings': [
    '/images/products/gold-hoop-earrings-1.jpg',
    '/images/products/gold-hoop-earrings-2.jpg',
  ],

  // Watches
  'luxury-automatic-watch': [
    '/images/products/luxury-automatic-watch-1.jpg',
    '/images/products/luxury-automatic-watch-2.jpg',
  ],
  'gold-dress-watch': [
    '/images/products/gold-dress-watch-1.jpg',
    '/images/products/gold-dress-watch-2.jpg',
  ],
  'sport-luxury-watch': [
    '/images/products/sport-luxury-watch-1.jpg',
    '/images/products/sport-luxury-watch-2.jpg',
  ],

  // Pendants
  'diamond-cross-pendant': [
    '/images/products/diamond-cross-pendant-1.jpg',
    '/images/products/diamond-cross-pendant-2.jpg',
  ],
  'gold-heart-pendant': [
    '/images/products/gold-heart-pendant-1.jpg',
    '/images/products/gold-heart-pendant-2.jpg',
  ],
  'emerald-pendant': [
    '/images/products/emerald-pendant-1.jpg',
    '/images/products/emerald-pendant-2.jpg',
  ],
};

// Category-specific jewelry images - each category has its own unique, relevant image
export const CATEGORY_PLACEHOLDERS = {
  rings: '/images/products/placeholder-ring.svg',
  necklaces: '/images/products/placeholder-necklace.svg',
  bracelets: '/images/products/placeholder-bracelet.svg',
  earrings: '/images/products/placeholder-earrings.svg',
  watches: '/images/products/placeholder-watch.svg',
  pendants: '/images/products/placeholder-pendant.svg',
} as const;

// Default placeholder for any missing images
export const DEFAULT_PLACEHOLDER = '/images/products/placeholder.svg';

// Get product images by slug
export function getProductImages(productSlug: string): string[] {
  const images = PRODUCT_IMAGES[productSlug as keyof typeof PRODUCT_IMAGES];
  if (images && images.length > 0) {
    return images;
  }
  
  // Fallback to category placeholder
  return [DEFAULT_PLACEHOLDER];
}

// Get category placeholder
export function getCategoryPlaceholder(categorySlug?: string): string {
  if (!categorySlug) return DEFAULT_PLACEHOLDER;
  return CATEGORY_PLACEHOLDERS[categorySlug as keyof typeof CATEGORY_PLACEHOLDERS] || DEFAULT_PLACEHOLDER;
}

// Get product image fallback with category context
export function getProductImageFallback(opts: { 
  productSlug?: string; 
  categorySlug?: string; 
  name?: string 
}): string[] {
  // First try to get specific product images
  if (opts.productSlug) {
    const productImages = getProductImages(opts.productSlug);
    if (productImages[0] !== DEFAULT_PLACEHOLDER) {
      return productImages;
    }
  }
  
  // Fallback to category placeholder
  const categoryPlaceholder = getCategoryPlaceholder(opts.categorySlug);
  return [categoryPlaceholder];
}

// Legacy function for backward compatibility
export function getCategoryImage(slug?: string): string[] {
  const placeholder = getCategoryPlaceholder(slug);
  return [placeholder];
}


