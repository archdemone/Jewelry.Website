'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  Award
} from 'lucide-react'
import { getAllCategories, getPaginatedProducts } from '@/lib/queries'
import { getProductImageFallback } from '@/lib/assets/images'

interface Product {
  id: string | number
  name: string
  price: number
  originalPrice?: number | null
  images?: string[]
  material?: string
  gemstone?: string
  rating?: number
  reviews?: number
  badge?: string
  quickStats?: {
    clarity: string
    cut: string
    color: string
  }
  slug: string
  category?: {
    slug: string
    name: string
  }
}

interface FilterState {
  category: string[]
  material: string[]
  priceRange: [number, number]
  gemstone: string[]
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    category: [],
    material: [],
    priceRange: [0, 5000],
    gemstone: []
  })
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | number | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Load products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getPaginatedProducts({ page: 1, pageSize: 24 }),
          getAllCategories()
        ])
        setProducts(productsData.items || [])
        setCategories(categoriesData || [])
      } catch (error) {
        console.error('Error loading products:', error)
        // Fallback to sample data
        setProducts([
          {
            id: 1,
            name: "Classic Solitaire",
            price: 2499,
            originalPrice: 2999,
            images: ["/images/products/category-engagement-rings.webp"],
            material: "18k White Gold",
            gemstone: "1ct Diamond",
            rating: 4.8,
            reviews: 24,
            badge: "bestseller",
            quickStats: { clarity: "VS1", cut: "Excellent", color: "F" },
            slug: "classic-solitaire"
          },
          {
            id: 2,
            name: "Rose Gold Eternity",
            price: 1899,
            originalPrice: null,
            images: ["/images/products/category-eternity-rings.webp"],
            material: "18k Rose Gold",
            gemstone: "0.5ct Diamonds",
            rating: 4.9,
            reviews: 18,
            badge: "new",
            quickStats: { clarity: "VS2", cut: "Very Good", color: "G" },
            slug: "rose-gold-eternity"
          },
          {
            id: 3,
            name: "Vintage Halo Ring",
            price: 3299,
            originalPrice: 3999,
            images: ["/images/products/category-engagement-rings.webp"],
            material: "Platinum",
            gemstone: "1.2ct Diamond",
            rating: 4.7,
            reviews: 31,
            badge: "limited",
            quickStats: { clarity: "VVS1", cut: "Excellent", color: "D" },
            slug: "vintage-halo-ring"
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filterCategories = {
    category: [
      { value: 'engagement-rings', label: 'Engagement', count: 45, icon: '💍' },
      { value: 'wedding-bands', label: 'Wedding Bands', count: 32, icon: '👰' },
      { value: 'eternity-rings', label: 'Eternity', count: 18, icon: '♾️' },
      { value: 'statement-rings', label: 'Statement', count: 27, icon: '✨' }
    ],
    material: [
      { value: 'yellow-gold', label: 'Yellow Gold', color: '#FFD700' },
      { value: 'white-gold', label: 'White Gold', color: '#E5E5E5' },
      { value: 'rose-gold', label: 'Rose Gold', color: '#E0BBB4' },
      { value: 'platinum', label: 'Platinum', color: '#D1D1D1' }
    ],
    gemstone: [
      { value: 'diamond', label: 'Diamond', icon: '💎' },
      { value: 'sapphire', label: 'Sapphire', icon: '🔷' },
      { value: 'ruby', label: 'Ruby', icon: '❤️' },
      { value: 'emerald', label: 'Emerald', icon: '🟢' }
    ]
  }

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    setSelectedFilters(prev => {
      const currentArray = prev[filterType] as string[]
      return {
        ...prev,
        [filterType]: currentArray.includes(value)
          ? currentArray.filter(v => v !== value)
          : [...currentArray, value]
      }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      material: [],
      priceRange: [0, 5000],
      gemstone: []
    })
  }

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0]
    }
    // Fallback to category image
    return getProductImageFallback({
      productSlug: product.slug,
      categorySlug: product.category?.slug,
      name: product.name,
    })[0] || "/images/products/category-engagement-rings.webp"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Compact Hero Section - Reduced Height */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 opacity-10"
        >
          <Diamond className="w-full h-full text-gold-500" />
        </motion.div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Handcrafted Ring Collection
            </h1>
            <p className="text-gray-600">Each piece personally crafted with love and precision</p>
            
            {/* Quick Stats Bar */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium">100% Handmade</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium">Ready to Ship</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium">Free Sizing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area - Tighter Spacing */}
      <div className="container py-8">
        {/* Sticky Filter Bar - Compact Design */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 -mx-4 px-4 py-3 mb-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Filter Toggle & Active Filters */}
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {(selectedFilters.category.length + selectedFilters.material.length + selectedFilters.gemstone.length) > 0 && (
                  <span className="bg-gold-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {selectedFilters.category.length + selectedFilters.material.length + selectedFilters.gemstone.length}
                  </span>
                )}
              </motion.button>

              {/* Active Filter Pills */}
              <div className="hidden md:flex items-center gap-2">
                {selectedFilters.category.map(cat => (
                  <span key={cat} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center gap-1">
                    {cat}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter('category', cat)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:block flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right: Sort & View Options */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Best Rated</option>
              </select>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Square className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Collapsible Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="w-[280px] space-y-6">
                  {/* Category Filter - Visual Cards */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-700">
                      Ring Type
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filterCategories.category.map(cat => (
                        <motion.button
                          key={cat.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFilter('category', cat.value)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedFilters.category.includes(cat.value)
                              ? 'border-gold-500 bg-gold-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{cat.icon}</div>
                          <div className="text-xs font-medium">{cat.label}</div>
                          <div className="text-xs text-gray-500">({cat.count})</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Metal Type - Color Swatches */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-700">
                      Metal Type
                    </h3>
                    <div className="space-y-2">
                      {filterCategories.material.map(mat => (
                        <label
                          key={mat.value}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={selectedFilters.material.includes(mat.value)}
                            onChange={() => toggleFilter('material', mat.value)}
                          />
                          <div
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: mat.color }}
                          />
                          <span className="text-sm flex-1">{mat.label}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range - Visual Slider */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-700">
                      Price Range
                    </h3>
                    <div className="px-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>£{selectedFilters.priceRange[0]}</span>
                        <span>£{selectedFilters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={selectedFilters.priceRange[1]}
                        onChange={(e) => setSelectedFilters(prev => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                        }))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button 
                    onClick={clearAllFilters}
                    className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid - Enhanced Cards */}
          <div className="flex-1">
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group relative"
                >
                  {viewMode === 'grid' ? (
                    // Grid View Card - Compact & Visual
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        {/* Badge */}
                        {product.badge && (
                          <span className="absolute top-2 left-2 z-10 px-2 py-1 bg-gradient-to-r from-gold-500 to-amber-500 text-white text-xs font-semibold rounded-full uppercase">
                            {product.badge}
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md"
                        >
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                        </motion.button>

                        {/* Product Image with Hover Effect */}
                        <motion.div
                          animate={{ 
                            scale: hoveredProduct === product.id ? 1.1 : 1,
                            rotateY: hoveredProduct === product.id ? 10 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={getProductImage(product)}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 400px, 50vw"
                          />
                        </motion.div>

                        {/* Quick Action Buttons - Appear on Hover */}
                        <AnimatePresence>
                          {hoveredProduct === product.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className="absolute bottom-3 left-3 right-3 flex gap-2"
                            >
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setQuickViewProduct(product)}
                                className="flex-1 py-2 bg-white/95 backdrop-blur text-gray-800 rounded-lg font-medium text-sm hover:bg-white transition-all flex items-center justify-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                Quick View
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-gold-500 text-white rounded-lg flex items-center justify-center hover:bg-gold-600 transition-colors"
                              >
                                <ShoppingBag className="w-4 h-4" />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Product Info - Minimal Text */}
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                        
                        {/* Visual Elements Instead of Text */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                            <span className="text-xs text-gray-600">{product.rating || 4.5}</span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{product.material || product.category?.name}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-semibold text-gray-900">£{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">£{product.originalPrice}</span>
                          )}
                        </div>

                        {/* Visual Quick Stats - Hover Reveal */}
                        <AnimatePresence>
                          {hoveredProduct === product.id && product.quickStats && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-2 pt-2 border-t border-gray-100 overflow-hidden"
                            >
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Clarity</span>
                                <span className="font-medium">{product.quickStats.clarity}</span>
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-gray-500">Cut</span>
                                <span className="font-medium">{product.quickStats.cut}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    // List View - Horizontal Card
                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all flex gap-4">
                      <div className="w-32 h-32 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={getProductImage(product)}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{product.material || product.category?.name}</span>
                          <span>•</span>
                          <span>{product.gemstone || 'No stones'}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                            <span>{product.rating || 4.5}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-2xl font-bold">£{product.price}</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setQuickViewProduct(product)}
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gold-500 transition-colors"
                            >
                              Quick View
                            </button>
                            <button className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Load More - Compact */}
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-gold-500 to-amber-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Load More Rings
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            >
              <div className="grid md:grid-cols-2">
                {/* Image Gallery */}
                <div className="relative h-96 md:h-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={getProductImage(quickViewProduct)}
                    alt={quickViewProduct.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-serif mb-2">{quickViewProduct.name}</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(quickViewProduct.rating || 4.5) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({quickViewProduct.reviews || 12} reviews)</span>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-bold">£{quickViewProduct.price}</span>
                    {quickViewProduct.originalPrice && (
                      <span className="ml-2 text-lg text-gray-400 line-through">£{quickViewProduct.originalPrice}</span>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Ring Size</label>
                      <div className="grid grid-cols-6 gap-2 mt-2">
                        {[5, 6, 7, 8, 9, 10].map(size => (
                          <button key={size} className="py-2 border border-gray-300 rounded-lg hover:border-gold-500 transition-colors">
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gold-500 text-white rounded-lg font-medium hover:bg-gold-600 transition-colors"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gold-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <Link href={`/products/${quickViewProduct.slug}`} className="block text-center mt-4 text-gold-600 hover:text-gold-700 font-medium">
                    View Full Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
