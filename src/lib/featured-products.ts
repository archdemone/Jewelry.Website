// Featured Products Data Store
// This file manages the featured products that appear on the homepage
// Changes made in the admin panel will update this data

export interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  material: string;
  gemColor: string;
  gemDensity: string;
  gemVariation: string;
  craftTime: string;
  image: string;
  description: string;
  isReadyToShip: boolean;
  rating: number;
  reviews: number;
  category: string;
  subCategory?: string;
  mixColors: string[];
  ringSizes: {
    us: number[];
    eu: number[];
  };
  ringWidth: number[];
  status: 'active' | 'draft' | 'archived';
  sku: string;
}

// Initial featured products data
export const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    slug: 'womens-silver-inlay-ring-dark-red',
    name: "Women's Silver Inlay Ring - Dark Red",
    price: 89,
    originalPrice: 109,
    material: 'Silver',
    gemColor: 'Red',
    gemDensity: 'medium',
    gemVariation: 'Dark',
    craftTime: '2-3 weeks',
    image: '/images/MyImages/IMG-20250816-WA0000.jpg',
    description:
      'Beautiful handcrafted silver ring with dark red gem inlay. Perfect for everyday wear or special occasions.',
    isReadyToShip: true,
    rating: 4.8,
    reviews: 24,
    category: 'Womens',
    subCategory: 'Inlay Ring',
    mixColors: [],
    ringSizes: { us: [5, 6, 7, 8, 9], eu: [49, 52, 54, 57, 59] },
    ringWidth: [4, 6, 8],
    status: 'active',
    sku: 'RNG-W-SIL-RED-001',
  },
  {
    id: '2',
    slug: 'mens-damascus-wedding-ring-bright-blue',
    name: "Men's Damascus Wedding Ring - Bright Blue",
    price: 95,
    originalPrice: 115,
    material: 'Damascus',
    gemColor: 'Blue',
    gemDensity: 'large',
    gemVariation: 'Bright',
    craftTime: '3-4 weeks',
    image: '/images/MyImages/IMG-20250816-WA0001.jpg',
    description:
      'Stunning Damascus steel wedding ring with bright blue gem inlay. A unique and durable choice for your special day.',
    isReadyToShip: true,
    rating: 4.9,
    reviews: 18,
    category: 'Mens',
    subCategory: 'Wedding',
    mixColors: [],
    ringSizes: { us: [8, 9, 10, 11, 12], eu: [57, 59, 61, 63, 65] },
    ringWidth: [6, 8, 10],
    status: 'active',
    sku: 'RNG-M-DAM-BLU-001',
  },
  {
    id: '3',
    slug: 'unisex-carbon-inlay-ring-mixed-green',
    name: 'Unisex Carbon Inlay Ring - Mixed Green',
    price: 199,
    originalPrice: 249,
    material: 'Carbon',
    gemColor: 'Green',
    gemDensity: 'small',
    gemVariation: 'Mixed',
    craftTime: '1-2 weeks',
    image: '/images/MyImages/IMG-20250816-WA0002.jpg',
    description:
      'Lightweight carbon ring with mixed green and blue gem inlay. Perfect for active lifestyles.',
    isReadyToShip: true,
    rating: 4.7,
    reviews: 31,
    category: 'Unisex',
    subCategory: 'Inlay Ring',
    mixColors: ['Green', 'Blue'],
    ringSizes: { us: [6, 7, 8, 9, 10], eu: [52, 54, 57, 59, 61] },
    ringWidth: [4, 6],
    status: 'active',
    sku: 'RNG-U-CAR-GRN-001',
  },
  {
    id: '4',
    slug: 'couple-ring-set-silver-gold',
    name: 'Couple Ring Set - Silver & Gold',
    price: 109,
    originalPrice: 120,
    material: 'Silver & Gold',
    gemColor: 'Mixed',
    gemDensity: 'medium',
    gemVariation: 'Bright',
    craftTime: '4-5 weeks',
    image: '/images/MyImages/IMG-20250816-WA0003.jpg',
    description:
      'Matching couple rings featuring silver and gold with mixed gem inlays. Perfect for weddings and anniversaries.',
    isReadyToShip: false,
    rating: 4.9,
    reviews: 42,
    category: 'Couple Ring Set',
    subCategory: 'Wedding',
    mixColors: ['Red', 'Blue', 'Green'],
    ringSizes: { us: [5, 6, 7, 8, 9, 10], eu: [49, 52, 54, 57, 59, 61] },
    ringWidth: [4, 6, 8],
    status: 'active',
    sku: 'RNG-C-SG-MIX-001',
  },
  {
    id: '5',
    slug: 'titanium-wedding-band-purple',
    name: 'Titanium Wedding Band - Purple',
    price: 85,
    originalPrice: 105,
    material: 'Titanium',
    gemColor: 'Purple',
    gemDensity: 'large',
    gemVariation: 'Dark',
    craftTime: '2-3 weeks',
    image: '/images/MyImages/IMG-20250816-WA0004.jpg',
    description:
      'Modern titanium wedding band with deep purple gem inlay. Lightweight and hypoallergenic.',
    isReadyToShip: true,
    rating: 4.6,
    reviews: 15,
    category: 'Mens',
    subCategory: 'Wedding',
    mixColors: [],
    ringSizes: { us: [8, 9, 10, 11, 12], eu: [57, 59, 61, 63, 65] },
    ringWidth: [6, 8, 10],
    status: 'active',
    sku: 'RNG-M-TIT-PUR-001',
  },
  {
    id: '6',
    slug: 'ceramic-eternity-ring-yellow',
    name: 'Ceramic Eternity Ring - Yellow',
    price: 79,
    originalPrice: 95,
    material: 'Ceramic',
    gemColor: 'Yellow',
    gemDensity: 'small',
    gemVariation: 'Bright',
    craftTime: '3-4 weeks',
    image: '/images/MyImages/IMG-20250816-WA0005.jpg',
    description:
      'Elegant ceramic eternity ring with bright yellow gem inlay. Scratch-resistant and lightweight.',
    isReadyToShip: true,
    rating: 4.5,
    reviews: 28,
    category: 'Womens',
    subCategory: 'Eternity Ring',
    mixColors: [],
    ringSizes: { us: [5, 6, 7, 8, 9], eu: [49, 52, 54, 57, 59] },
    ringWidth: [4, 6],
    status: 'active',
    sku: 'RNG-W-CER-YEL-001',
  },
  {
    id: '7',
    slug: 'tungsten-signet-ring-custom',
    name: 'Tungsten Signet Ring - Custom',
    price: 69,
    originalPrice: 85,
    material: 'Tungsten',
    gemColor: 'Custom',
    gemDensity: 'medium',
    gemVariation: 'Mixed',
    craftTime: '2-3 weeks',
    image: '/images/MyImages/IMG-20250816-WA0006.jpg',
    description:
      'Durable tungsten signet ring with custom gem inlay. Perfect for engraving and personalization.',
    isReadyToShip: false,
    rating: 4.8,
    reviews: 19,
    category: 'Mens',
    subCategory: 'Signet Ring',
    mixColors: [],
    ringSizes: { us: [8, 9, 10, 11, 12], eu: [57, 59, 61, 63, 65] },
    ringWidth: [6, 8],
    status: 'active',
    sku: 'RNG-M-TUN-CUS-001',
  },
  {
    id: '8',
    slug: 'stainless-steel-couple-set',
    name: 'Stainless Steel Couple Set',
    price: 99,
    originalPrice: 120,
    material: 'Stainless Steel',
    gemColor: 'Blue & Red',
    gemDensity: 'large',
    gemVariation: 'Bright',
    craftTime: '3-4 weeks',
    image: '/images/MyImages/IMG-20250816-WA0007.jpg',
    description:
      'Matching stainless steel couple rings with blue and red gem inlays. Corrosion-resistant and elegant.',
    isReadyToShip: false,
    rating: 4.7,
    reviews: 33,
    category: 'Couple Ring Set',
    subCategory: 'Wedding',
    mixColors: ['Blue', 'Red'],
    ringSizes: { us: [5, 6, 7, 8, 9, 10], eu: [49, 52, 54, 57, 59, 61] },
    ringWidth: [4, 6, 8],
    status: 'active',
    sku: 'RNG-C-SS-BR-001',
  },
];

// Enhanced storage with backup to localStorage
const STORAGE_KEY = 'featured-products-v2';
const BACKUP_KEY = 'featured-products-backup';

// Initialize with default products if none exist
function initializeFeaturedProducts(): FeaturedProduct[] {
  if (typeof window === 'undefined') return featuredProducts;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // Try backup if main storage is empty
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      const parsedBackup = JSON.parse(backup);
      if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
        // Restore from backup
        localStorage.setItem(STORAGE_KEY, backup);
        return parsedBackup;
      }
    }

    // Initialize with defaults
    localStorage.setItem(STORAGE_KEY, JSON.stringify(featuredProducts));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(featuredProducts));
    return featuredProducts;
  } catch (error) {
    console.error('Error initializing featured products:', error);
    return featuredProducts;
  }
}

export function getFeaturedProducts(): FeaturedProduct[] {
  if (typeof window === 'undefined') return featuredProducts;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return initializeFeaturedProducts();
  } catch (error) {
    console.error('Error getting featured products:', error);
    return featuredProducts;
  }
}

export function updateFeaturedProduct(id: string, updatedProduct: FeaturedProduct): void {
  if (typeof window === 'undefined') return;

  try {
    const products = getFeaturedProducts();
    const updatedProducts = products.map(product =>
      product.id === id ? updatedProduct : product
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error updating featured product:', error);
  }
}

export function addFeaturedProduct(product: FeaturedProduct): void {
  if (typeof window === 'undefined') return;

  try {
    const products = getFeaturedProducts();
    const updatedProducts = [product, ...products];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error adding featured product:', error);
  }
}

export function deleteFeaturedProduct(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const products = getFeaturedProducts();
    const updatedProducts = products.filter(product => product.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error deleting featured product:', error);
  }
}

export function resetToDefault(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(featuredProducts));
    localStorage.setItem(BACKUP_KEY, JSON.stringify(featuredProducts));
  } catch (error) {
    console.error('Error resetting featured products:', error);
  }
}

// Available options for dropdowns
export const availableMaterials = [
  'Silver',
  'Damascus',
  'Ceramic(white)',
  'Ceramic(black)',
  'Carbon',
  'Tungsten',
  'Titanium',
  'Stainless Steel',
  'Gold',
];

export const availableGemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
export const availableGemDensities = ['small', 'medium', 'large'];
export const availableGemVariations = ['Dark', 'Mixed', 'Bright'];
export const availableCategories = [
  'Wedding',
  'Inlay Ring',
  'Couple Ring Set',
  'Mens',
  'Womens',
  'Unisex',
  'Single Inlay',
  'Double Inlay',
  'Eternity Ring',
  'Signet Ring',
];
