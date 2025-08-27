'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
// Removed direct import of Prisma queries - now using API routes
import { getProductImageFallback } from '@/lib/assets/images';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

import { Product } from '@/types';

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

interface CategoryPageProps {
  category: string;
  categoryTitle: string;
  categoryDescription: string;
  categoryImage: string;
}

export default function CategoryPage({
  category,
  categoryTitle,
  categoryDescription,
  categoryImage
}: CategoryPageProps) {
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
  const [showAddToCartToast, setShowAddToCartToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [wishlistAction, setWishlistAction] = useState<{
    action: 'added' | 'removed';
    product: Product | null;
  }>({ action: 'added', product: null });

  // Use Zustand wishlist store
  const { items: wishlistItems, addItem, removeItem, isInWishlist, hydrate, hydrated } = useWishlistStore();

  // Cart store
  const addItemToCart = useCartStore((state) => state.addItem);

  // Load products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Hydrate wishlist store
        hydrate();

        // Load products
        const productsResponse = await fetch(`/api/products?category=${category}`);
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products || []);
        }

        // Load categories
        const categoriesResponse = await fetch('/api/categories');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.categories || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category, hydrate]);

  // Load wishlist from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Wishlist is now handled by Zustand store
      // No need to load from localStorage manually
    }
  }, []);

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
          }, 500); // Increased delay to ensure page is loaded
        }
      }
    }
  }, [loading]); // Added loading dependency

  // Filter and sort products - simplified for now
  const filteredProducts = products.filter((product) => {
    // Only filter by search query for now
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Handle wishlist toggle
  const handleWishlistToggle = (productId: string | number) => {
    const product = products.find(p => p.id === productId) || null;
    const productIdString = productId.toString();

    if (isInWishlist(productIdString)) {
      removeItem(productIdString);
      setWishlistAction({ action: 'removed', product });
    } else if (product) {
      addItem({
        id: productIdString,
        name: product.name,
        price: product.price,
        image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '',
        slug: product.slug,
        material: product.material || undefined,
        gemColor: product.gemColor || undefined,
        category: category || undefined,
        badge: product.badge || undefined,
      });
      setWishlistAction({ action: 'added', product });
    }

    setShowWishlistToast(true);
    setTimeout(() => setShowWishlistToast(false), 3000);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addItemToCart({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
    });

    setAddedProduct(product);
    setShowAddToCartToast(true);
    setTimeout(() => setShowAddToCartToast(false), 3000);
  };

  // Initialize customization
  const initializeCustomization = (product: Product) => {
    setCustomization({
      material: product.material || '',
      gemColor: product.gemColor || '',
      gemDensity: product.gemDensity || '',
      gemVariation: product.gemVariation || '',
      ringSize: product.ringSizes?.us?.[0]?.toString() || '',
      ringWidth: product.ringWidth?.[0]?.toString() || '',
      mixColors: product.mixColors || [],
      sizeType: 'us'
    });
    setOriginalCustomization({
      material: product.material || '',
      gemColor: product.gemColor || '',
      gemDensity: product.gemDensity || '',
      gemVariation: product.gemVariation || '',
      ringSize: product.ringSizes?.us?.[0]?.toString() || '',
      ringWidth: product.ringWidth?.[0]?.toString() || '',
      mixColors: product.mixColors || [],
      sizeType: 'us'
    });
  };

  // Check if customization has changed
  const hasCustomizationChanged = () => {
    if (!originalCustomization) return false;
    return (
      customization.material !== originalCustomization.material ||
      customization.gemColor !== originalCustomization.gemColor ||
      customization.gemDensity !== originalCustomization.gemDensity ||
      customization.gemVariation !== originalCustomization.gemVariation
    );
  };

  // Handle customize click
  const handleCustomizeClick = () => {
    if (!quickViewProduct) return;

    const customName = `Custom ${quickViewProduct.name}`;

    addItemToCart({
      productId: `custom-${quickViewProduct.id}`,
      name: customName,
      price: quickViewProduct.price,
      image: quickViewProduct.images?.[0] || '',
      material: customization.material as any,
      gemColor: customization.gemColor as any,
      gemDensity: customization.gemDensity as any,
      gemVariation: customization.gemVariation as any,
      ringSize: customization.ringSize,
      ringWidth: customization.ringWidth
    });

    setAddedProduct({ ...quickViewProduct, name: customName });
    setShowAddToCartToast(true);
    setQuickViewProduct(null);

    setTimeout(() => {
      setShowAddToCartToast(false);
      setAddedProduct(null);
    }, 3000);
  };

  if (loading) {
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
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 -top-20 h-64 w-64 opacity-10"
        >
          <Diamond className="h-full w-full text-gold-500" />
        </motion.div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {categoryTitle}
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              {categoryDescription}
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



      {/* Main Content Area */}
      <section id="products-section" className="py-12">
        <div className="container">
          {/* Filter Bar */}
          <div className="sticky top-0 z-20 -mx-4 mb-8 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Filter Toggle */}
              <div className="flex items-center gap-3">
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="font-medium text-orange-600">Filters</span>
                  {selectedFilters.category.length +
                    selectedFilters.material.length +
                    selectedFilters.gemstone.length >
                    0 && (
                      <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs text-white">
                        {selectedFilters.category.length +
                          selectedFilters.material.length +
                          selectedFilters.gemstone.length}
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
                    className="w-full rounded-full border border-gray-200 bg-white px-10 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Right: View Mode & Sort */}
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                  <button onClick={() => setViewMode('grid')} className={`rounded-md p-2 transition-colors ${viewMode === 'grid'
                    ? 'bg-gold-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <Grid3x3 className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`rounded-md p-2 transition-colors ${viewMode === 'list'
                    ? 'bg-gold-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                  >
                    <Square className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                    aria-label="Sort products by"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ArrowUpDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {sortedProducts.length} of {products.length} rings
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg" onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden border-2 border-black">
                  <Image src={Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]
                    : getProductImageFallback({ productSlug: product.slug, name: product.name })[0] || ''} alt={product.name}
                    fill className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy" quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute left-2 top-2">
                      <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button onClick={() => handleWishlistToggle(product.id)}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-red-500 transition-colors hover:bg-white"
                    aria-label={isInWishlist(product.id.toString()) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? 'fill-current' : ''}`} aria-hidden="true" />
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button onClick={() => handleAddToCart(product)}
                        className="rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-100"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => {
                          setQuickViewProduct(product);
                          initializeCustomization(product);
                        }}
                        className="rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-100"
                        aria-label={`Quick view ${product.name}`}
                      >
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Color Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300">
                      {product.material}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded border ${product.gemColor === 'Red' ? 'bg-red-100 text-red-800 border-red-300' :
                      product.gemColor === 'Blue' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        product.gemColor === 'Green' ? 'bg-green-100 text-green-800 border-green-300' :
                          product.gemColor === 'Purple' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                            product.gemColor === 'Yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                              'bg-gray-100 text-gray-700 border-gray-300'
                      }`}>
                      {product.gemVariation === 'Dark' ? `Dark ${product.gemColor}` :
                        product.gemVariation === 'Bright' ? `Bright ${product.gemColor}` :
                          product.gemVariation === 'Mixed' ? `Mixed ${product.gemColor}` :
                            product.gemColor}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  {product.rating && (
                    <div className="mb-2 flex items-center gap-1">
                      <div className="flex" role="img" aria-label={`${product.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      £{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        £{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setQuickViewProduct(product);
                        initializeCustomization(product);
                      }}
                      className="flex-1 rounded-lg bg-white border-2 border-black text-white bg-black py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white hover:border-orange-500"
                    >
                      Customize This Ring
                    </motion.button>
                    <button
                      onClick={() => handleWishlistToggle(product.id)}
                      className={`p-2 rounded-lg border transition-colors ${isInWishlist(product.id.toString())
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 text-gray-900 hover:border-red-400 hover:bg-red-50'
                        }`}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="py-16 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No rings found</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 backdrop-blur-sm pt-20"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="grid lg:grid-cols-3">
                {/* Image Gallery */}
                <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 lg:col-span-1 lg:h-full">
                  <img
                    src={Array.isArray(quickViewProduct.images) && quickViewProduct.images.length > 0
                      ? quickViewProduct.images[0]
                      : getProductImageFallback({ productSlug: quickViewProduct.slug, name: quickViewProduct.name })[0] || ''}
                    alt={quickViewProduct.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setQuickViewProduct(null)}
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
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(quickViewProduct.rating || 4.5) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
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
                      <select
                        value={customization.material}
                        onChange={(e) =>
                          setCustomization((prev) => ({ ...prev, material: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        {['Silver', 'Damascus', 'Ceramic(white)', 'Ceramic(black)', 'Carbon', 'Tungsten', 'Titanium', 'Stainless Steel', 'Gold'].map((material) => (
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
                        {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'].map((color) => (
                          <div key={color} className="group relative">
                            <button
                              onClick={() =>
                                setCustomization((prev) => ({ ...prev, gemColor: color }))
                              }
                              className={`w-full rounded-lg border-2 p-2 text-sm transition-all ${customization.gemColor === color
                                ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200'
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                            >
                              <span className="font-medium text-gray-900">{color}</span>
                            </button>
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
                        {['small', 'medium', 'large'].map((density) => (
                          <button
                            key={density}
                            onClick={() =>
                              setCustomization((prev) => ({ ...prev, gemDensity: density }))
                            }
                            className={`rounded-lg border-2 p-2 text-sm transition-all ${customization.gemDensity === density
                              ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200'
                              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                          >
                            <span className={`font-medium capitalize ${customization.gemDensity === density ? 'text-gray-900' : 'text-gray-900'
                              }`}>
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
                        {['Dark', 'Mixed', 'Bright'].map((variation) => (
                          <button
                            key={variation}
                            onClick={() =>
                              setCustomization((prev) => ({ ...prev, gemVariation: variation }))
                            }
                            className={`rounded-lg border-2 p-2 text-sm transition-all ${customization.gemVariation === variation
                              ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200'
                              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                          >
                            <span className={`font-medium ${customization.gemVariation === variation ? 'text-gray-900' : 'text-gray-900'
                              }`}>
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
                          <input
                            type="radio"
                            checked={customization.sizeType === 'us'}
                            onChange={() =>
                              setCustomization((prev) => ({ ...prev, sizeType: 'us' }))
                            }
                            className="text-gold-500 focus:ring-gold-500"
                          />
                          <span className="text-xs font-medium text-gray-900">US</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 p-1 transition-all hover:bg-gray-50">
                          <input
                            type="radio"
                            checked={customization.sizeType === 'eu'}
                            onChange={() =>
                              setCustomization((prev) => ({ ...prev, sizeType: 'eu' }))
                            }
                            className="text-gold-500 focus:ring-gold-500"
                          />
                          <span className="text-xs font-medium text-gray-900">EU</span>
                        </label>
                      </div>
                      <select
                        value={customization.ringSize}
                        onChange={(e) =>
                          setCustomization((prev) => ({ ...prev, ringSize: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="">Select size</option>
                        {quickViewProduct.ringSizes?.[customization.sizeType]?.map((size) => (
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
                      <select
                        value={customization.ringWidth}
                        onChange={(e) =>
                          setCustomization((prev) => ({ ...prev, ringWidth: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="">Select width</option>
                        {quickViewProduct.ringWidth?.map((width) => (
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCustomizeClick}
                        className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                      >
                        Customize This Ring
                      </motion.button>
                    ) : quickViewProduct.isReadyToShip ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => (window.location.href = '/cart')}
                          className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                        >
                          Purchase
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(quickViewProduct)}
                          className="flex-1 rounded-lg bg-green-500 py-2 font-medium text-white transition-colors hover:bg-green-600"
                        >
                          Add to Cart
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCustomizeClick}
                        className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                      >
                        Customize This Ring
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWishlistToggle(quickViewProduct.id)}
                      className={`flex h-10 w-20 items-center justify-center gap-1 rounded-lg border transition-colors ${isInWishlist(quickViewProduct.id.toString())
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 text-gray-900 hover:border-red-400 hover:bg-red-50'
                        }`}
                    >
                      <span className="text-sm">❤️</span>
                      <span className="text-xs font-medium">
                        {isInWishlist(quickViewProduct.id.toString()) ? 'Added!' : 'Save'}
                      </span>
                    </motion.button>
                  </div>
                  <Link
                    href={`/products/${quickViewProduct.slug}`}
                    className="mt-3 block text-center text-sm font-medium text-gold-600 hover:text-gold-700"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Cart Toast */}
      <AnimatePresence>
        {showAddToCartToast && addedProduct && (
          <motion.div initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Added to Cart!</p>
                  <p className="truncate text-sm text-gray-600">{addedProduct.name}</p>
                </div>
                <button onClick={() => setShowAddToCartToast(false)}
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${wishlistAction.action === 'added' ? 'bg-red-100' : 'bg-gray-100'
                    }`}
                  >
                    {wishlistAction.action === 'added' ? (
                      <Heart className="h-6 w-6 text-red-600 fill-current" />
                    ) : (
                      <X className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {wishlistAction.action === 'added'
                      ? 'Added to Wishlist!'
                      : 'Removed from Wishlist!'}
                  </p>
                  <p className="truncate text-sm text-gray-600">{wishlistAction.product.name}</p>
                </div>
                <button onClick={() => {
                  setShowWishlistToast(false);
                  setWishlistAction({ action: 'added', product: null });
                }}
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-3">
                <div className="h-1 w-full rounded-full bg-gray-200">
                  <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 3, ease: 'linear' }} className={`h-1 rounded-full ${wishlistAction.action === 'added' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
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
