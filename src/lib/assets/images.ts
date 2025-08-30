// Ring image management system
// Using local images stored in /public/images/MyImages/

export const RING_IMAGES: Record<string, string[]> = {
  // Engagement Rings
  'classic-solitaire-engagement-ring': [
    '/images/MyImages/IMG-20250816-WA0000.jpg',
    '/images/MyImages/IMG-20250816-WA0001.jpg',
  ],
  'vintage-inspired-halo-ring': [
    '/images/MyImages/IMG-20250816-WA0002.jpg',
    '/images/MyImages/IMG-20250816-WA0003.jpg',
  ],
  'modern-three-stone-ring': [
    '/images/MyImages/IMG-20250816-WA0004.jpg',
    '/images/MyImages/IMG-20250816-WA0005.jpg',
  ],

  // Wedding Bands
  'hammered-wedding-band': [
    '/images/MyImages/IMG-20250816-WA0006.jpg',
    '/images/MyImages/IMG-20250816-WA0007.jpg',
  ],
  'classic-plain-wedding-band': [
    '/images/MyImages/IMG-20250816-WA0008.jpg',
    '/images/MyImages/IMG-20250816-WA0009.jpg',
  ],
  'diamond-pave-wedding-band': [
    '/images/MyImages/IMG-20250816-WA0010.jpg',
    '/images/MyImages/IMG-20250816-WA0011.jpg',
  ],

  // Eternity Rings
  'sapphire-eternity-ring': [
    '/images/MyImages/IMG-20250816-WA0012.jpg',
    '/images/MyImages/IMG-20250816-WA0013.jpg',
  ],
  'diamond-eternity-ring': [
    '/images/MyImages/IMG-20250816-WA0014.jpg',
    '/images/MyImages/IMG-20250816-WA0015.jpg',
  ],

  // Signet Rings
  'classic-signet-ring': [
    '/images/MyImages/IMG-20250816-WA0016.jpg',
    '/images/MyImages/IMG-20250816-WA0017.jpg',
  ],

  // Statement Rings
  'emerald-statement-ring': [
    '/images/MyImages/IMG-20250816-WA0018.jpg',
    '/images/MyImages/IMG-20250816-WA0019.jpg',
  ],
  'ruby-cocktail-ring': [
    '/images/MyImages/IMG-20250816-WA0020.jpg',
    '/images/MyImages/IMG-20250816-WA0021.jpg',
  ],

  // Stackable Rings
  'minimalist-gold-band': [
    '/images/MyImages/IMG-20250816-WA0022.jpg',
    '/images/MyImages/IMG-20250816-WA0023.jpg',
  ],
  'diamond-accent-band': [
    '/images/MyImages/IMG-20250816-WA0024.jpg',
    '/images/MyImages/IMG-20250816-WA0025.jpg',
  ],
};

// Category-specific jewelry images - each category has its own unique, relevant image
export const CATEGORY_PLACEHOLDERS = {
  rings: '/images/MyImages/IMG-20250816-WA0000.jpg',
  necklaces: '/images/MyImages/IMG-20250816-WA0001.jpg',
  bracelets: '/images/MyImages/IMG-20250816-WA0002.jpg',
  earrings: '/images/MyImages/IMG-20250816-WA0003.jpg',
  watches: '/images/MyImages/IMG-20250816-WA0004.jpg',
  pendants: '/images/MyImages/IMG-20250816-WA0005.jpg',
} as const;

// Default placeholder for any missing images
export const DEFAULT_PLACEHOLDER = '/images/MyImages/IMG-20250816-WA0000.jpg';

// Get ring images by slug
export function getRingImages(ringSlug: string): string[] {
  const images = RING_IMAGES[ringSlug as keyof typeof RING_IMAGES];
  if (images && images.length > 0) {
    return images;
  }

  // Fallback to default placeholder
  return [DEFAULT_PLACEHOLDER];
}

// Get category placeholder
export function getCategoryPlaceholder(categorySlug?: string): string {
  if (!categorySlug) return DEFAULT_PLACEHOLDER;
  return (
    CATEGORY_PLACEHOLDERS[categorySlug as keyof typeof CATEGORY_PLACEHOLDERS] || DEFAULT_PLACEHOLDER
  );
}

// Shared helper for product images - handles both Blob URLs and local paths
export function getProductImage(product: { images?: string[] }) {
  const img = product?.images?.[0];
  if (!img) return '/images/placeholder.png';
  if (/^https?:\/\//i.test(img)) return img;   // Blob/CDN
  if (img.startsWith('/images/')) return img;  // absolute public path
  return `/images/${img.replace(/^\/+/, '')}`; // legacy filename
}

// Get product image fallback with category context (updated for rings)
export function getProductImageFallback(opts: {
  productSlug?: string;
  categorySlug?: string;
  name?: string;
}): string[] {
  // First try to get specific ring images
  if (opts.productSlug) {
    const ringImages = getRingImages(opts.productSlug);
    if (ringImages[0] !== DEFAULT_PLACEHOLDER) {
      return ringImages;
    }
  }

  // Fallback to category placeholder
  const categoryPlaceholder = getCategoryPlaceholder(opts.categorySlug);
  return [categoryPlaceholder];
}

// Legacy helpers for backward compatibility
export function getProductImages(productSlug: string): string[] {
  return getRingImages(productSlug);
}

export function getCategoryImage(slug?: string): string[] {
  const placeholder = getCategoryPlaceholder(slug);
  return [placeholder];
}
