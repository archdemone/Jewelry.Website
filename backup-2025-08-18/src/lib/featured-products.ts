// Featured Products Data Store
// This file manages the featured products that appear on the homepage
// Changes made in the admin panel will update this data

export interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
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
    price: 299,
    originalPrice: 349,
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
    price: 449,
    originalPrice: null,
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
    price: 599,
    originalPrice: 699,
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
    price: 399,
    originalPrice: null,
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
    price: 349,
    originalPrice: 399,
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
    price: 279,
    originalPrice: null,
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
    price: 499,
    originalPrice: 599,
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

// Functions to manage featured products
export function getFeaturedProducts(): FeaturedProduct[] {
  // In a real app, this would fetch from a database
  // For now, we'll use localStorage to persist changes
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('featuredProducts');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return featuredProducts;
}

export function updateFeaturedProduct(id: string, updates: Partial<FeaturedProduct>): void {
  const products = getFeaturedProducts();
  const updatedProducts = products.map((product) =>
    product.id === id ? { ...product, ...updates } : product,
  );

  if (typeof window !== 'undefined') {
    localStorage.setItem('featuredProducts', JSON.stringify(updatedProducts));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('featuredProductsUpdated'));
  }
}

export function addFeaturedProduct(product: Omit<FeaturedProduct, 'id'>): void {
  const products = getFeaturedProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(), // Simple ID generation
  };

  const updatedProducts = [...products, newProduct];

  if (typeof window !== 'undefined') {
    localStorage.setItem('featuredProducts', JSON.stringify(updatedProducts));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('featuredProductsUpdated'));
  }
}

export function deleteFeaturedProduct(id: string): void {
  const products = getFeaturedProducts();
  const updatedProducts = products.filter((product) => product.id !== id);

  if (typeof window !== 'undefined') {
    localStorage.setItem('featuredProducts', JSON.stringify(updatedProducts));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('featuredProductsUpdated'));
  }
}

export function resetToDefault(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('featuredProductsUpdated'));
  }
}
