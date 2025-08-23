'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Star, Sliders } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  categories: string[];
  materials: string[];
  priceRange: PriceRange;
  rating: number | null;
  inStock: boolean | null;
  sortBy: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categoryOptions: FilterOption[] = [
  { id: 'engagement-rings', label: 'Engagement Rings', count: 45 },
  { id: 'wedding-bands', label: 'Wedding Bands', count: 32 },
  { id: 'necklaces', label: 'Necklaces', count: 28 },
  { id: 'earrings', label: 'Earrings', count: 41 },
  { id: 'bracelets', label: 'Bracelets', count: 23 },
  { id: 'watches', label: 'Watches', count: 15 },
];

const materialOptions: FilterOption[] = [
  { id: 'gold', label: 'Gold', count: 89 },
  { id: 'silver', label: 'Silver', count: 67 },
  { id: 'platinum', label: 'Platinum', count: 34 },
  { id: 'rose-gold', label: 'Rose Gold', count: 52 },
  { id: 'white-gold', label: 'White Gold', count: 43 },
  { id: 'titanium', label: 'Titanium', count: 12 },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
];

export function AdvancedFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}: AdvancedFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'price']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    updateFilters({ categories: newCategories });
  };

  const toggleMaterial = (materialId: string) => {
    const newMaterials = filters.materials.includes(materialId)
      ? filters.materials.filter(id => id !== materialId)
      : [...filters.materials, materialId];
    updateFilters({ materials: newMaterials });
  };

  const updatePriceRange = (field: 'min' | 'max', value: number) => {
    updateFilters({
      priceRange: {
        ...filters.priceRange,
        [field]: value,
      },
    });
  };

  const activeFiltersCount = [
    filters.categories.length,
    filters.materials.length,
    filters.rating ? 1 : 0,
    filters.inStock !== null ? 1 : 0,
    filters.priceRange.min > 0 || filters.priceRange.max < 10000 ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  const FilterSection = ({ title, children, sectionKey }: {
    title: string;
    children: React.ReactNode;
    sectionKey: string;
  }) => {
    const isExpanded = expandedSections.includes(sectionKey);

    return (
      <div className="border-b border-gray-200 last:border-b-0">
              <button onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 px-4"
        >
              <span className="font-medium text-gray-900">{title}</span>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${ isExpanded ? 'rotate-180' : '' }`} />
              </button>
              <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }}              animate={{ height: 'auto', opacity: 1 }}              exit={{ height: 0, opacity: 0 }}              transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="px-4 pb-4">
                {children}
              </div>
              </motion.div>
          )}
        </AnimatePresence>
              </div>
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
              <button onClick={onToggle} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <Sliders className="h-4 w-4" />
              <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-gold-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
              </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} className="lg:block fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto bg-white lg:bg-transparent">
            {/* Mobile Overlay */}
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={onToggle} />

            {/* Filter Content */}
            <div className="relative lg:sticky lg:top-4 w-80 lg:w-full h-full lg:h-auto bg-white lg:border lg:border-gray-200 lg:rounded-lg overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:border-b-0">
              <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <span className="bg-gold-500 text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
              <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <button onClick={onClearFilters} className="text-sm text-gray-600 hover:text-gray-900">
                      Clear All
                    </button>
                  )}
                  <button onClick={onToggle} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
              </button>
              </div>
              </div>

              {/* Sort By */}
              <div className="p-4 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                  Sort By
                </label>
              <select              value={filters.sortBy}              onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Categories */}
              <FilterSection title="Categories" sectionKey="categories">
              <div className="space-y-2">
                  {categoryOptions.map(category => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox"              checked={filters.categories.includes(category.id)}              onChange={() => toggleCategory(category.id)}
                        className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 rounded focus:ring-gold-500"
                      />
              <span className="flex-1 text-sm text-gray-700">{category.label}</span>
              <span className="text-xs text-gray-500">({category.count})</span>
              </label>
                  ))}
                </div>
              </FilterSection>

              {/* Materials */}
              <FilterSection title="Materials" sectionKey="materials">
              <div className="space-y-2">
                  {materialOptions.map(material => (
                    <label key={material.id} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox"              checked={filters.materials.includes(material.id)}              onChange={() => toggleMaterial(material.id)}
                        className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 rounded focus:ring-gold-500"
                      />
              <span className="flex-1 text-sm text-gray-700">{material.label}</span>
              <span className="text-xs text-gray-500">({material.count})</span>
              </label>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Price Range" sectionKey="price">
              <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
              <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                        Min Price
                      </label>
              <input type="number"
                        min="0"
                        max="10000"
                        step="50"              value={filters.priceRange.min}              onChange={(e) => updatePriceRange('min', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="£0"
                      />
              </div>
              <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                        Max Price
                      </label>
              <input type="number"
                        min="0"
                        max="10000"
                        step="50"              value={filters.priceRange.max}              onChange={(e) => updatePriceRange('max', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="£10000"
                      />
              </div>
              </div>
              <div className="text-xs text-gray-500">
                    £{filters.priceRange.min} - £{filters.priceRange.max}
                  </div>
              </div>
              </FilterSection>

              {/* Rating */}
              <FilterSection title="Customer Rating" sectionKey="rating">
              <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input type="radio"
                        name="rating"              checked={filters.rating === rating}              onChange={() => updateFilters({ rating })}
                        className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 focus:ring-gold-500"
                      />
              <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star              key={star}              className={`h-3 w-3 ${ star <= rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300' }`}
                          />
                        ))}
                        <span className="text-sm text-gray-700 ml-2">& up</span>
              </div>
              </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio"
                      name="rating"              checked={filters.rating === null}              onChange={() => updateFilters({ rating: null })}
                      className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 focus:ring-gold-500"
                    />
              <span className="text-sm text-gray-700">All Ratings</span>
              </label>
              </div>
              </FilterSection>

              {/* Availability */}
              <FilterSection title="Availability" sectionKey="availability">
              <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio"
                      name="availability"              checked={filters.inStock === null}              onChange={() => updateFilters({ inStock: null })}
                      className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 focus:ring-gold-500"
                    />
              <span className="text-sm text-gray-700">All Products</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio"
                      name="availability"              checked={filters.inStock === true}              onChange={() => updateFilters({ inStock: true })}
                      className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 focus:ring-gold-500"
                    />
              <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio"
                      name="availability"              checked={filters.inStock === false}              onChange={() => updateFilters({ inStock: false })}
                      className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 focus:ring-gold-500"
                    />
              <span className="text-sm text-gray-700">Out of Stock</span>
              </label>
              </div>
              </FilterSection>
              </div>
              </motion.div>
        )}
      </AnimatePresence>
              </>
  );
}
