'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdvancedFilters } from '@/components/filters/AdvancedFilters';
import { ProductCard } from '@/components/products/ProductCard';
import { Grid3x3, Square } from 'lucide-react';

interface FilterState {
  categories: string[];
  materials: string[];
  priceRange: { min: number; max: number };
  rating: number | null;
  inStock: boolean | null;
  sortBy: string;
}

// Mock product data for demonstration
const mockProducts = [
  {
    id: '1',
    slug: 'rose-gold-engagement-ring',
    name: 'Rose Gold Diamond Engagement Ring',
    price: 2499.99,
    images: ['/images/rings/rose-gold-engagement.jpg'],
    categorySlug: 'engagement-rings',
    category: 'Engagement Rings',
  },
  {
    id: '2',
    slug: 'silver-wedding-band',
    name: 'Classic Silver Wedding Band',
    price: 299.99,
    images: ['/images/rings/silver-wedding.jpg'],
    categorySlug: 'wedding-bands',
    category: 'Wedding Bands',
  },
  {
    id: '3',
    slug: 'gold-necklace-pendant',
    name: 'Gold Chain Necklace with Pendant',
    price: 899.99,
    images: ['/images/necklaces/gold-pendant.jpg'],
    categorySlug: 'necklaces',
    category: 'Necklaces',
  },
  {
    id: '4',
    slug: 'diamond-earrings',
    name: 'Diamond Stud Earrings',
    price: 1299.99,
    images: ['/images/earrings/diamond-studs.jpg'],
    categorySlug: 'earrings',
    category: 'Earrings',
  },
  {
    id: '5',
    slug: 'platinum-bracelet',
    name: 'Platinum Tennis Bracelet',
    price: 1899.99,
    images: ['/images/bracelets/platinum-tennis.jpg'],
    categorySlug: 'bracelets',
    category: 'Bracelets',
  },
  {
    id: '6',
    slug: 'titanium-watch',
    name: 'Titanium Sport Watch',
    price: 599.99,
    images: ['/images/watches/titanium-sport.jpg'],
    categorySlug: 'watches',
    category: 'Watches',
  },
];

export default function EnhancedProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    materials: [],
    priceRange: { min: 0, max: 10000 },
    rating: null,
    inStock: null,
    sortBy: 'newest',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      priceRange: { min: 0, max: 10000 },
      rating: null,
      inStock: null,
      sortBy: 'newest',
    });
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  // Apply filters to products (mock implementation)
  const filteredProducts = mockProducts.filter(product => {
    // Price filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.categorySlug || '')) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return 0;
    }
  });

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Products</h1>
              <p className="text-gray-600">
          Discover our curated collection with advanced filtering and enhanced features.
        </p>
              </div>
              <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="hidden lg:block w-80">
              <div className="sticky top-4">
              <AdvancedFilters              filters={filters}              onFiltersChange={handleFiltersChange}              onClearFilters={handleClearFilters}              isOpen={true}              onToggle={() => {}}
            />
              </div>
              </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters & View Controls */}
          <div className="flex items-center justify-between mb-6">
              <div className="lg:hidden">
              <AdvancedFilters              filters={filters}              onFiltersChange={handleFiltersChange}              onClearFilters={handleClearFilters}              isOpen={isFiltersOpen}              onToggle={toggleFilters}
              />
              </div>
              <div className="hidden lg:block">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {mockProducts.length} products
              </p>
              </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button              onClick={() => setViewMode('grid')}              className={`p-2 rounded ${ viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200' }`}
              >
              <Grid3x3 className="h-4 w-4" />
              </button>
              <button              onClick={() => setViewMode('list')}              className={`p-2 rounded ${ viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200' }`}
              >
              <Square className="h-4 w-4" />
              </button>
              </div>
              </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more results.
              </p>
              <button onClick={handleClearFilters} className="px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors">
                Clear All Filters
              </button>
              </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'  : 'grid-cols-1' }`}>
              {sortedProducts.map((product, index) => (
                <motion.div              key={product.id}              initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: index * 0.1 }}
                >
              <ProductCard {...product} />
              </motion.div>
              ))}
            </div>
          )}
        </div>
              </div>
              </div>
  );
}
