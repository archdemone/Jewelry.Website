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
import { getAllCategories, getPaginatedProducts } from '@/lib/queries';
import { getProductImageFallback } from '@/lib/assets/images';
import { useCartStore } from '@/store/cart';
import CategoryShowcase from '@/components/home/CategoryShowcase';
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
  const [wishlistItems, setWishlistItems] = useState<Set<string | number>>(new Set());
  const [showAddToCartToast, setShowAddToCartToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [wishlistAction, setWishlistAction] = useState<{
    action: 'added' | 'removed';
    product: Product | null;
  }>({ action: 'added', product: null });

  // Cart store
  const addItem = useCartStore((state) => state.addItem);

  // Load products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all products from API
        const response = await fetch('/api/admin/products');
        if (response.ok) {
          const allProducts = await response.json();
          
          // Set categories based on all available products from API
          const uniqueCategories = new Set();
          allProducts.forEach((product: Product) => {
            if (product.category) uniqueCategories.add(product.category);
            if (product.subCategory) uniqueCategories.add(product.subCategory);
          });
          
          const categoryList = Array.from(uniqueCategories).map((cat, index) => ({
            id: index + 1,
            name: cat as string,
            slug: (cat as string).toLowerCase().replace(/\s+/g, '-'),
          }));
          
          setCategories(categoryList);
          
          // Filter products by category and include featured ring in all categories
          const filteredProducts = allProducts.filter((product: Product) => {
            // Always include the featured ring (Women's Silver Inlay Ring - Dark Red)
            if (product.name === "Women's Silver Inlay Ring - Dark Red") return true;
            
            // Filter by category
            if (category === 'womens') return product.category === 'Womens';
            if (category === 'mens') return product.category === 'Mens';
            if (category === 'unisex') return product.category === 'Unisex';
            if (category === 'inlay') return product.subCategory === 'Inlay Ring';
            if (category === 'wedding') return product.subCategory === 'Wedding';
            if (category === 'all') return true; // For 'all' category
            return false; // Default case
          });
          
          console.log('Category:', category);
          console.log('All products:', allProducts.length);
          console.log('Filtered products:', filteredProducts.length);
          console.log('Filtered products:', filteredProducts);
          setProducts(filteredProducts);
        } else {
          console.error('Failed to load products');
          setProducts([]);
          setCategories([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

  // Load wishlist from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(new Set(JSON.parse(savedWishlist)));
      }
    }
  }, []);

  // Handle smooth scrolling to products section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#products') {
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
    const newWishlist = new Set(wishlistItems);
    const product = products.find(p => p.id === productId) || null;
    
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      setWishlistAction({ action: 'removed', product });
    } else {
      newWishlist.add(productId);
      setWishlistAction({ action: 'added', product });
    }
    
    setWishlistItems(newWishlist);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
    }
    
    setShowWishlistToast(true);
    setTimeout(() => setShowWishlistToast(false), 3000);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
    });
    
    setAddedProduct(product);
    setShowAddToCartToast(true);
    setTimeout(() => setShowAddToCartToast(false), 3000);
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
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} className="absolute -right-20 -top-20 h-64 w-64 opacity-10">
              <Diamond className="h-full w-full text-gold-500" />
              </motion.div>
              <div className="container relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
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

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Main Content Area */}
      <section id="products-section" className="py-12">
              <div className="container">
          {/* Filter Bar */}
          <div className="sticky top-0 z-20 -mx-4 mb-8 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
              {/* Left: Filter Toggle */}
              <div className="flex items-center gap-3">
              <motion.button              whileTap={{ scale: 0.95 }}              onClick={() => setShowFilters(!showFilters)}
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
                    placeholder="Search rings..."              value={searchQuery}              onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-gray-200 bg-white px-10 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                  />
              </div>
              </div>

              {/* Right: View Mode & Sort */}
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex rounded-lg border border-gray-200 bg-white p-1">
              <button              onClick={() => setViewMode('grid')}              className={`rounded-md p-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-gold-500 text-white' : 'text-gray-600 hover:text-gray-900' }`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
              <Grid3x3 className="h-4 w-4" aria-hidden="true" />
              </button>
              <button              onClick={() => setViewMode('list')}              className={`rounded-md p-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-gold-500 text-white' : 'text-gray-600 hover:text-gray-900' }`}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                  >
              <Square className="h-4 w-4" aria-hidden="true" />
              </button>
              </div>

                {/* Sort Dropdown */}
                <div className="relative">
              <select              value={sortBy}              onChange={(e) => setSortBy(e.target.value)}
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
              <motion.div              key={product.id}              initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"              onMouseEnter={() => setHoveredProduct(product.id)}              onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden border-2 border-black">
              <Image              src={Array.isArray(product.images) && product.images.length > 0 
                      ? product.images[0] 
                      : getProductImageFallback({ productSlug: product.slug, name: product.name })[0] || ''}              alt={product.name}
                    fill className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy"              quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
                  <button              onClick={() => handleWishlistToggle(product.id)}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-red-500 transition-colors hover:bg-white"
                    aria-label={wishlistItems.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
              <Heart className={`h-4 w-4 ${wishlistItems.has(product.id) ? 'fill-current' : ''}`} aria-hidden="true" />
              </button>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex gap-2">
              <button              onClick={() => handleAddToCart(product)}
                        className="rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-100"
                        aria-label={`Add ${product.name} to cart`}
                      >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </button>
              <Link href={`/products/${product.slug}`}
                        className="rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-100" aria-label={`View details for ${product.name}`}>
              <Eye className="h-5 w-5" aria-hidden="true" />
              </Link>
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
              <span className={`px-2 py-1 text-xs rounded border ${
                      product.gemColor === 'Red' ? 'bg-red-100 text-red-800 border-red-300' :
                      product.gemColor === 'Blue' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      product.gemColor === 'Green' ? 'bg-green-100 text-green-800 border-green-300' :
                      product.gemColor === 'Purple' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                      product.gemColor === 'Yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-gray-100 text-gray-700 border-gray-300' }`}>
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
                          <Star              key={i}              className={`h-4 w-4 ${
                              i < Math.floor(product.rating!)
                                ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300' }`}
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
                  <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                      £{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        £{product.originalPrice.toLocaleString()}
                      </span>
                    )}
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

      {/* Add to Cart Toast */}
      <AnimatePresence>
        {showAddToCartToast && addedProduct && (
          <motion.div initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              <button              onClick={() => setShowAddToCartToast(false)}
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                >
              <X className="h-5 w-5" />
              </button>
              </div>
              <div className="mt-3">
              <div className="h-1 w-full rounded-full bg-gray-200">
              <motion.div              initial={{ width: '100%' }}              animate={{ width: '0%' }}              transition={{ duration: 3, ease: 'linear' }}
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
              <div className="flex-shrink-0">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${ wishlistAction.action === 'added' ? 'bg-red-100' : 'bg-gray-100' }`}>
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
              <button              onClick={() => {
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
              <motion.div              initial={{ width: '100%' }}              animate={{ width: '0%' }}              transition={{ duration: 3, ease: 'linear' }}              className={`h-1 rounded-full ${ wishlistAction.action === 'added' ? 'bg-red-500' : 'bg-gray-500' }`}
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
