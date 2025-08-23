'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Grid3x3,
  Square,
  Sparkles,
  Diamond,
  X,
  ChevronDown,
  Star,
  Eye,
  ArrowUpDown,
  Filter,
  Search,
  Zap,
  TrendingUp,
  Award,
} from 'lucide-react';
import { getAllCategories, getPaginatedProducts } from '@/lib/queries';
import { getProductImageFallback } from '@/lib/assets/images';
import { useCartStore } from '@/store/cart';
import CategoryShowcase from '@/components/home/CategoryShowcase';

interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number | null;
  images?: string[];
  material:
  | 'Silver'
  | 'Damascus'
  | 'Ceramic(white)'
  | 'Ceramic(black)'
  | 'Carbon'
  | 'Tungsten'
  | 'Titanium'
  | 'Stainless Steel'
  | 'Gold';
  gemColor: 'Red' | 'Green' | 'Blue' | 'Purple' | 'Yellow' | 'Custom';
  gemDensity: 'small' | 'medium' | 'large';
  gemVariation: 'Dark' | 'Mixed' | 'Bright';
  mixColors: string[];
  category:
  | 'Wedding'
  | 'Inlay Ring'
  | 'Couple Ring Set'
  | 'Mens'
  | 'Womens'
  | 'Unisex'
  | 'Single Inlay'
  | 'Double Inlay';
  subCategory?: string;
  ringSizes: {
    us: number[];
    eu: number[];
  };
  ringWidth: number[];
  isReadyToShip: boolean;
  rating?: number;
  reviews?: number;
  badge?: string;
  slug: string;
  description?: string;
}

interface FilterState {
  category: string[];
  material: string[];
  priceRange: [number, number];
  gemstone: string[];
}

interface CustomizationState {
  material: string;
  gemColor: string;
  gemDensity: string;
  gemVariation: string;
  ringSize: string;
  ringWidth: string;
  mixColors: string[];
  sizeType: 'us' | 'eu';
}

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    category: [],
    material: [],
    priceRange: [0, 5000],
    gemstone: [],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customization, setCustomization] = useState<CustomizationState>({
    material: '',
    gemColor: '',
    gemDensity: '',
    gemVariation: '',
    ringSize: '',
    ringWidth: '',
    mixColors: [],
    sizeType: 'us',
  });
  const [originalCustomization, setOriginalCustomization] = useState<CustomizationState | null>(
    null,
  );
  const [showGemPopup, setShowGemPopup] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());
  const [showAddToCartToast, setShowAddToCartToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [wishlistAction, setWishlistAction] = useState<{
    action: 'added' | 'removed';
    product: Product | null;
  }>({ action: 'added', product: null });

  // Ensure component is mounted before using stores
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cart store - always call the hook
  const addItem = useCartStore((state) => state.addItem);

  // Safely get cart store values - moved outside component to prevent recreation
  const getCartStore = useCallback(() => {
    try {
      return useCartStore.getState();
    } catch (error) {
      console.warn('Cart store not available:', error);
      return { addItem: () => { } };
    }
  }, []);

  // Load products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all products from API
        const response = await fetch('/api/admin/products');
        let loadedProducts: Product[] = [];

        if (response.ok) {
          const allProducts = await response.json();
          setProducts(allProducts);
          loadedProducts = allProducts;
        } else {
          console.error('Failed to load products');
          // Fallback to sample data if API fails
          const sampleProducts: Product[] = [
            {
              id: 1,
              name: "Women's Silver Inlay Ring - Dark Red",
              price: 299,
              originalPrice: 349,
              images: ['/images/MyImages/IMG-20250816-WA0000.jpg'],
              material: 'Silver',
              gemColor: 'Red',
              gemDensity: 'medium',
              gemVariation: 'Dark',
              mixColors: [],
              category: 'Womens',
              subCategory: 'Inlay Ring',
              ringSizes: { us: [5, 6, 7, 8, 9], eu: [49, 52, 54, 57, 59] },
              ringWidth: [4, 6, 8],
              isReadyToShip: true,
              rating: 4.8,
              reviews: 24,
              badge: 'Ready to Ship',
              slug: 'womens-silver-inlay-ring-dark-red',
              description:
                'Beautiful handcrafted silver ring with dark red gem inlay. Perfect for everyday wear or special occasions.',
            },
            {
              id: 2,
              name: "Men's Damascus Wedding Ring - Bright Blue",
              price: 449,
              originalPrice: null,
              images: ['/images/MyImages/IMG-20250816-WA0001.jpg'],
              material: 'Damascus',
              gemColor: 'Blue',
              gemDensity: 'large',
              gemVariation: 'Bright',
              mixColors: [],
              category: 'Mens',
              subCategory: 'Wedding',
              ringSizes: { us: [8, 9, 10, 11, 12], eu: [57, 59, 61, 63, 65] },
              ringWidth: [6, 8, 10],
              isReadyToShip: true,
              rating: 4.9,
              reviews: 18,
              badge: 'Ready to Ship',
              slug: 'mens-damascus-wedding-ring-bright-blue',
              description:
                'Stunning Damascus steel wedding ring with bright blue gem inlay. A unique and durable choice for your special day.',
            },
          ];
          setProducts(sampleProducts);
          loadedProducts = sampleProducts;
        }

        // Set categories based on loaded products
        const uniqueCategories = new Set();
        loadedProducts.forEach((product: Product) => {
          if (product.category) uniqueCategories.add(product.category);
          if (product.subCategory) uniqueCategories.add(product.subCategory);
        });

        const categoryList = Array.from(uniqueCategories).map((cat, index) => ({
          id: index + 1,
          name: cat as string,
          slug: (cat as string).toLowerCase().replace(/\s+/g, '-'),
        }));

        setCategories(categoryList);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [products]);

  // Handle smooth scrolling to products section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#products' || hash === '#products-section') {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          setTimeout(() => {
            productsSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    }
  }, []);

  const toggleFilter = (type: 'category' | 'material' | 'gemstone', value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      material: [],
      priceRange: [0, 5000],
      gemstone: [],
    });
  };

  const getProductImage = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return '/images/MyImages/category-engagement-rings.jpg';
  };

  const initializeCustomization = (product: Product) => {
    const initialCustomization: CustomizationState = {
      material: product.material,
      gemColor: product.gemColor,
      gemDensity: product.gemDensity,
      gemVariation: product.gemVariation,
      ringSize: product.ringSizes.us[0]?.toString() || '',
      ringWidth: product.ringWidth[0]?.toString() || '',
      mixColors: product.mixColors,
      sizeType: 'us' as const,
    };
    setCustomization(initialCustomization);
    setOriginalCustomization(initialCustomization);
  };

  const hasCustomizationChanged = (): boolean => {
    if (!originalCustomization) return false;

    const changed =
      customization.material !== originalCustomization.material ||
      customization.gemColor !== originalCustomization.gemColor ||
      customization.gemDensity !== originalCustomization.gemDensity ||
      customization.gemVariation !== originalCustomization.gemVariation ||
      customization.ringSize !== originalCustomization.ringSize ||
      customization.ringWidth !== originalCustomization.ringWidth ||
      customization.sizeType !== originalCustomization.sizeType ||
      JSON.stringify(customization.mixColors) !== JSON.stringify(originalCustomization.mixColors);

    console.log('Customization changed:', changed);
    console.log('Current:', customization);
    console.log('Original:', originalCustomization);

    return changed;
  };

  const handleCustomizeClick = () => {
    if (!quickViewProduct) return;

    // Create a customized ring object with all the selected options
    const customizedRing = {
      productId: `custom-${quickViewProduct.id}`,
      name: `Custom ${quickViewProduct.name}`,
      price: quickViewProduct.price, // Base price, could be adjusted based on customizations
      image: quickViewProduct.images?.[0] || '/images/MyImages/category-engagement-rings.jpg',
      material: customization.material,
      gemColor: customization.gemColor,
      gemDensity: customization.gemDensity,
      gemVariation: customization.gemVariation,
      ringSize: customization.ringSize,
      ringWidth: customization.ringWidth,
    };

    // Add item to cart store
    addItem(customizedRing);

    // Show success feedback
    setAddedProduct(quickViewProduct); // Use the original product for the toast
    setShowAddToCartToast(true);

    // Auto-hide after 2 seconds and redirect to cart
    setTimeout(() => {
      setShowAddToCartToast(false);
      setAddedProduct(null);
      setQuickViewProduct(null); // Close modal
      window.location.href = '/cart'; // Redirect to cart page
    }, 2000);
  };

  const handleAddToCart = () => {
    if (!quickViewProduct || !mounted) return;

    try {
      // Add to cart logic for ready-to-ship items
      console.log('Adding to cart:', quickViewProduct.name);

      // Add item to cart store
      addItem({
        productId: quickViewProduct.id.toString(),
        name: quickViewProduct.name,
        price: quickViewProduct.price,
        image: quickViewProduct.images?.[0] || '/images/MyImages/category-engagement-rings.jpg',
        material: quickViewProduct.material,
        gemColor: quickViewProduct.gemColor,
        gemDensity: quickViewProduct.gemDensity,
        gemVariation: quickViewProduct.gemVariation,
        ringSize: customization.ringSize,
        ringWidth: customization.ringWidth,
      });

      // Show success feedback
      setAddedProduct(quickViewProduct);
      setShowAddToCartToast(true);

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowAddToCartToast(false);
        setAddedProduct(null);
      }, 3000);
    } catch (error) {
      console.warn('Failed to add item to cart:', error);
    }
  };

  const handleWishlistClick = () => {
    if (!quickViewProduct) return;

    const productId = quickViewProduct.id;
    const isInWishlist = wishlistItems.has(productId);

    if (isInWishlist) {
      // Remove from wishlist
      setWishlistItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      setWishlistAction({ action: 'removed', product: quickViewProduct });
      setShowWishlistToast(true);

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowWishlistToast(false);
        setWishlistAction({ action: 'added', product: null });
      }, 3000);
    } else {
      // Add to wishlist
      setWishlistItems((prev) => new Set([...prev, productId]));
      setWishlistAction({ action: 'added', product: quickViewProduct });
      setShowWishlistToast(true);

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowWishlistToast(false);
        setWishlistAction({ action: 'added', product: null });
      }, 3000);
    }

    console.log('Wishlist updated:', isInWishlist ? 'removed' : 'added', quickViewProduct.name);
  };

  const availableMaterials = [
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

  const availableGemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const availableGemDensities = ['small', 'medium', 'large'];
  const availableGemVariations = ['Dark', 'Mixed', 'Bright'];

  if (!mounted || loading || !products || !categories) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
              <motion.div animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-gold-500 border-t-transparent"
        />
              </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
        {/* Animated Background Elements */}
        <motion.div animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} className="absolute -right-20 -top-20 h-64 w-64 opacity-10">
              <Diamond className="h-full w-full text-gold-500" />
              </motion.div>
              <div className="container relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Handcrafted Ring Collection
            </h1>
              <p className="mb-8 text-lg text-gray-600">
              Each piece personally crafted with love and precision
            </p>

            {/* Quick Stats Bar */}
            <div className="mt-6 flex justify-center gap-6">
              <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gold-500" />
              <span className="text-sm font-medium text-orange-600">100% Handmade</span>
              </div>
              <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-gold-500" />
              <span className="text-sm font-medium text-orange-600">Ready to Ship</span>
              </div>
              <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gold-500" />
              <span className="text-sm font-medium text-orange-600">Free Sizing</span>
              </div>
              </div>
              </motion.div>
              </div>
              </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Main Content Area */}
      <section id="products-section" className="py-12">
              <div className="container">
          {/* Filter Bar */}
          <div className="sticky top-0 z-20 -mx-4 mb-8 bg-white/95 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
              {/* Left: Filter Toggle */}
              <div className="flex items-center gap-3">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
                >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="font-medium text-orange-600">Filters</span>
                  {(selectedFilters?.category?.length || 0) +
                    (selectedFilters?.material?.length || 0) +
                    (selectedFilters?.gemstone?.length || 0) >
                    0 && (
                      <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs text-white">
                        {(selectedFilters?.category?.length || 0) +
                          (selectedFilters?.material?.length || 0) +
                          (selectedFilters?.gemstone?.length || 0)}
                      </span>
                    )}
                </motion.button>
              </div>

              {/* Center: Search Bar */}
              <div className="hidden max-w-md flex-1 md:block">
              <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input type="text"
                    placeholder="Search rings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
              </div>
              </div>

              {/* Right: Sort & View Options */}
              <div className="flex items-center gap-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Best Rated</option>
              </select>
              <div className="flex items-center rounded-lg bg-gray-100 p-1">
              <button onClick={() => setViewMode('grid')} className={`rounded p-1.5 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
              <Grid3x3 className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`rounded p-1.5 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
              <Square className="h-4 w-4" />
              </button>
              </div>
              </div>
              </div>
              </div>
              <div className="flex gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="w-[280px] space-y-6">
                    {/* Category Filter */}
                    <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Ring Type
                      </h3>
              <div className="space-y-2">
                        {(categories || []).map((cat) => (
                          <label key={cat.id} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
              <input type="checkbox"
                              className="rounded border-gray-300 text-gold-500 focus:ring-gold-500" checked={selectedFilters?.category?.includes(cat.slug) || false} onChange={() => toggleFilter('category', cat.slug)}
                            />
              <span className="text-sm">{cat.name}</span>
              </label>
                        ))}
                      </div>
              </div>

                    {/* Material Filter */}
                    <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Material
                      </h3>
              <div className="space-y-2">
                        {availableMaterials.map((material) => (
                          <label key={material} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
              <input type="checkbox"
                              className="rounded border-gray-300 text-gold-500 focus:ring-gold-500" checked={selectedFilters?.material?.includes(material) || false} onChange={() => toggleFilter('material', material)}
                            />
              <span className="text-sm">{material}</span>
              </label>
                        ))}
                      </div>
              </div>

                    {/* Clear Filters */}
                    <button onClick={clearAllFilters} className="w-full py-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
                      Clear All Filters
                    </button>
              </div>
              </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {(!products || products.length === 0) ? (
                <div className="py-12 text-center">
              <Diamond className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">No Products Found</h3>
              <p className="mb-6 text-gray-600">Try adjusting your filters or search terms</p>
              <button onClick={clearAllFilters} className="rounded-lg bg-gold-500 px-6 py-2 text-white transition-colors hover:bg-gold-600">
                    Clear Filters
                  </button>
              </div>
              ) : (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-4' }>
                  {(products || []).map((product) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} className={`overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all ${viewMode === 'list' ? 'flex' : '' }`}>
                      {/* Product Image */}
                      <div className={`relative ${viewMode === 'list' ? 'h-48 w-48' : 'h-64'}`}>
              <Image src={getProductImage(product)} alt={product.name}
                          fill className="object-cover"
                        />

                        {/* Ready to Ship Badge */}
                        {product.isReadyToShip && (
                          <div className="absolute left-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                            ✓ Ready to Ship
                          </div>
                        )}

                        {/* Quick View Button */}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                          setQuickViewProduct(product);
                          initializeCustomization(product);
                        }}
                          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-colors hover:bg-white"
                        >
              <Eye className="h-4 w-4" />
              </motion.button>
              </div>

                      {/* Product Info */}
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                          {product.name}
                        </h3>
              <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating || 4.5) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
              <span className="text-xs text-gray-500">({product.reviews || 12})</span>
              </div>
              <div className="mb-3 flex items-center justify-between">
              <div>
              <span className="text-lg font-bold text-gray-900">
                              £{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                £{product.originalPrice}
                              </span>
                            )}
                          </div>
              <button className="p-2 text-gray-400 transition-colors hover:text-red-500">
              <Heart className="h-4 w-4" />
              </button>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => {
                          setQuickViewProduct(product);
                          initializeCustomization(product);
                        }}
                          className="w-full rounded-lg bg-gold-500 py-2 font-medium text-white transition-colors hover:bg-gold-600"
                        >
                          Customize This Ring
                        </motion.button>
              </div>
              </motion.div>
                  ))}
                </div>
              )}
            </div>
              </div>
              </div>
              </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          >
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="grid lg:grid-cols-3">
                {/* Image Gallery */}
                <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 lg:col-span-1 lg:h-full">
              <Image src={getProductImage(quickViewProduct)} alt={quickViewProduct.name}
                    fill className="object-cover"
                  />
              <button onClick={() => setQuickViewProduct(null)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur"
                  >
              <X className="h-5 w-5" />
              </button>

                  {/* Ready to Ship Badge */}
                  {quickViewProduct.isReadyToShip && (
                    <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
                      ✓ Ready to Ship
                    </div>
                  )}
                </div>

                {/* Product Details & Customization */}
                <div className="overflow-y-auto p-4 lg:col-span-2">
              <h2 className="mb-1 text-xl font-bold text-orange-600">
                    {quickViewProduct.name}
                  </h2>
              <p className="mb-3 text-sm text-gray-600">{quickViewProduct.description}</p>
              <div className="mb-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(quickViewProduct.rating || 4.5) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
              <span className="text-xs text-gray-600">
                      ({quickViewProduct.reviews || 12} reviews)
                    </span>
              </div>
              <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">
                      £{quickViewProduct.price}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="ml-2 text-base text-gray-400 line-through">
                        £{quickViewProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-4">
              <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">Customize Your Ring</h3>
                      {hasCustomizationChanged() && (
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                          Customized
                        </span>
                      )}
                    </div>

                    {/* Material Selection */}
                    <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                        Material
                      </label>
              <select value={customization.material} onChange={(e) =>
                        setCustomization((prev) => ({ ...prev, material: e.target.value }))
                      }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        {availableMaterials.map((material) => (
                          <option key={material} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
              </div>

                    {/* Gem Color Selection */}
                    <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gem Color
                      </label>
              <div className="grid grid-cols-3 gap-1">
                        {availableGemColors.map((color) => (
                          <div key={color} className="group relative">
              <button onClick={() =>
                              setCustomization((prev) => ({ ...prev, gemColor: color }))
                            } className={`w-full rounded-lg border-2 p-2 text-sm transition-all ${customization.gemColor === color
                              ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' }`}
                            >
              <span className="font-medium text-gray-900">{color}</span>
              </button>

                            {/* Hover Popup with Gem Image */}
                            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
              <div className="relative h-32 w-32 overflow-hidden rounded">
              <Image src={`/images/gems/colour/${color.toLowerCase()}.jpg`} alt={`${color} gem`}
                                    fill className="object-cover"
                                    sizes="128px"
                                  />
              </div>
              <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 transform border-b border-l border-gray-200 bg-white"></div>
              </div>
              </div>
              </div>
                        ))}
                      </div>
              </div>

                    {/* Gem Density */}
                    <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gem Density
                      </label>
              <div className="grid grid-cols-3 gap-1">
                        {availableGemDensities.map((density) => (
                          <button key={density} onClick={() =>
                            setCustomization((prev) => ({ ...prev, gemDensity: density }))
                          } className={`rounded-lg border-2 p-2 text-sm transition-all ${customization.gemDensity === density
                            ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' }`}
                          >
              <span className={`font-medium capitalize ${customization.gemDensity === density ? 'text-gray-900' : 'text-gray-900'}`}
                            >
                              {density}
                            </span>
              </button>
                        ))}
                      </div>
              </div>

                    {/* Gem Variation */}
                    <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gem Variation
                      </label>
              <div className="grid grid-cols-3 gap-1">
                        {availableGemVariations.map((variation) => (
                          <button key={variation} onClick={() =>
                            setCustomization((prev) => ({ ...prev, gemVariation: variation }))
                          } className={`rounded-lg border-2 p-2 text-sm transition-all ${customization.gemVariation === variation
                            ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' }`}
                          >
              <span className={`font-medium ${customization.gemVariation === variation ? 'text-gray-900' : 'text-gray-900'}`}
                            >
                              {variation}
                            </span>
              </button>
                        ))}
                      </div>
              </div>

                    {/* Ring Size */}
                    <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                        Ring Size
                      </label>
              <div className="mb-1 flex gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 p-1 transition-all hover:bg-gray-50">
              <input type="radio" checked={customization.sizeType === 'us'} onChange={() =>
                              setCustomization((prev) => ({ ...prev, sizeType: 'us' }))
                            }
                            className="text-gold-500 focus:ring-gold-500"
                          />
              <span className="text-xs font-medium text-gray-900">US</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 p-1 transition-all hover:bg-gray-50">
              <input type="radio" checked={customization.sizeType === 'eu'} onChange={() =>
                              setCustomization((prev) => ({ ...prev, sizeType: 'eu' }))
                            }
                            className="text-gold-500 focus:ring-gold-500"
                          />
              <span className="text-xs font-medium text-gray-900">EU</span>
              </label>
              </div>
              <select value={customization.ringSize} onChange={(e) =>
                        setCustomization((prev) => ({ ...prev, ringSize: e.target.value }))
                      }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
              <option value="">Select size</option>
                        {quickViewProduct.ringSizes[customization.sizeType].map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
              </div>

                    {/* Ring Width */}
                    <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                        Ring Width (mm)
                      </label>
              <select value={customization.ringWidth} onChange={(e) =>
                        setCustomization((prev) => ({ ...prev, ringWidth: e.target.value }))
                      }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
              <option value="">Select width</option>
                        {quickViewProduct.ringWidth.map((width) => (
                          <option key={width} value={width}>
                            {width}mm
                          </option>
                        ))}
                      </select>
              </div>
              </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    {hasCustomizationChanged() ? (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCustomizeClick} className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg">
                        Customize This Ring
                      </motion.button>
                    ) : quickViewProduct.isReadyToShip ? (
                      <>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => (window.location.href = '/cart')}
                          className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                        >
                          Purchase
                        </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="flex-1 rounded-lg bg-green-500 py-2 font-medium text-white transition-colors hover:bg-green-600">
                          Add to Cart
                        </motion.button>
              </>
                    ) : (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCustomizeClick} className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg">
                        Customize This Ring
                      </motion.button>
                    )}

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleWishlistClick} className={`flex h-10 w-20 items-center justify-center gap-1 rounded-lg border transition-colors ${wishlistItems.has(quickViewProduct.id) ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 text-gray-900 hover:border-red-400 hover:bg-red-50' }`}>
              <span className="text-sm">❤️</span>
              <span className="text-xs font-medium">
                        {wishlistItems.has(quickViewProduct.id) ? 'Added!' : 'Save'}
                      </span>
              </motion.button>
              </div>
              <Link href={`/products/${quickViewProduct.slug}`} className="mt-3 block text-center text-sm font-medium text-gold-600 hover:text-gold-700">
                    View Full Details →
                  </Link>
              </div>
              </div>
              </motion.div>
              </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Cart Toast Popup */}
      <AnimatePresence>
        {showAddToCartToast && addedProduct && (
          <motion.div initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                {/* Success Icon */}
                <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
              </svg>
              </div>
              </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                    {addedProduct.name.startsWith('Custom ')
                      ? 'Customized Ring Added!'
                      : 'Added to Cart!'}
                  </p>
              <p className="truncate text-sm text-gray-600">{addedProduct.name}</p>
              </div>

                {/* Close Button */}
                <button onClick={() => {
                  setShowAddToCartToast(false);
                  setAddedProduct(null);
                }}
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round"
                      strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
              </svg>
              </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
              <div className="h-1 w-full rounded-full bg-gray-200">
              <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 3, ease: 'linear' }}
                    className="h-1 rounded-full bg-green-500"
                  />
              </div>
              </div>
              </div>
              </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Toast Popup */}
      <AnimatePresence>
        {showWishlistToast && wishlistAction.product && (
          <motion.div initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${wishlistAction.action === 'added' ? 'bg-red-100' : 'bg-gray-100' }`}>
                    {wishlistAction.action === 'added' ? (
                      <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
                    ) : (
                      <svg className="h-6 w-6 text-gray-600"
                        fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round"
                          strokeLinejoin="round" strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
              </svg>
                    )}
                  </div>
              </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                    {wishlistAction.action === 'added'
                      ? 'Added to Wishlist!'
                      : 'Removed from Wishlist!'}
                  </p>
              <p className="truncate text-sm text-gray-600">{wishlistAction.product.name}</p>
              </div>

                {/* Close Button */}
                <button onClick={() => {
                  setShowWishlistToast(false);
                  setWishlistAction({ action: 'added', product: null });
                }}
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round"
                      strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
              </svg>
              </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
              <div className="h-1 w-full rounded-full bg-gray-200">
              <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 3, ease: 'linear' }} className={`h-1 rounded-full ${wishlistAction.action === 'added' ? 'bg-red-500' : 'bg-gray-500' }`}
                  />
              </div>
              </div>
              </div>
              </motion.div>
        )}
      </AnimatePresence>
              </main>
  );
}
