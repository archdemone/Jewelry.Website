'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'new' | 'price-asc' | 'price-desc';
}

export function SearchFilters({ query, category, minPrice, maxPrice, sort }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || '');
  const [localSort, setLocalSort] = useState(sort || 'new');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'engagement-rings', label: 'Engagement Rings' },
    { value: 'wedding-bands', label: 'Wedding Bands' },
    { value: 'eternity-rings', label: 'Eternity Rings' },
    { value: 'signet-rings', label: 'Signet Rings' },
    { value: 'statement-rings', label: 'Statement Rings' },
    { value: 'stackable-rings', label: 'Stackable Rings' },
  ];

  const sortOptions = [
    { value: 'new', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  const updateFilters = () => {
<<<<<<< HEAD
    const params = new URLSearchParams(searchParams || '');
=======
    const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
    
    if (localMinPrice) params.set('minPrice', localMinPrice);
    else params.delete('minPrice');
    
    if (localMaxPrice) params.set('maxPrice', localMaxPrice);
    else params.delete('maxPrice');
    
    if (localSort !== 'new') params.set('sort', localSort);
    else params.delete('sort');
    
    if (category) params.set('category', category);
    else params.delete('category');
    
    if (query) params.set('q', query);
    else params.delete('q');
    
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters = category || minPrice || maxPrice || (sort && sort !== 'new');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={cat.value}
                checked={category === cat.value}
                onChange={(e) => {
<<<<<<< HEAD
                  const params = new URLSearchParams(searchParams || '');
=======
                  const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
                  if (e.target.value) {
                    params.set('category', e.target.value);
                  } else {
                    params.delete('category');
                  }
                  if (query) params.set('q', query);
                  router.push(`/search?${params.toString()}`);
                }}
                className="w-4 h-4 text-gold-600 border-gray-300 focus:ring-gold-500"
              />
              <span className="ml-2 text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label htmlFor="minPrice" className="block text-xs text-gray-600 mb-1">
              Min Price (£)
            </label>
            <input
              type="number"
              id="minPrice"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-xs text-gray-600 mb-1">
              Max Price (£)
            </label>
            <input
              type="number"
              id="maxPrice"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={updateFilters}
            className="w-full px-4 py-2 bg-gold-600 text-white text-sm font-medium rounded-md hover:bg-gold-700 transition-colors"
          >
            Apply Price Filter
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={localSort === option.value}
                onChange={(e) => {
                  setLocalSort(e.target.value as any);
<<<<<<< HEAD
                  const params = new URLSearchParams(searchParams || '');
=======
                  const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
                  if (e.target.value !== 'new') {
                    params.set('sort', e.target.value);
                  } else {
                    params.delete('sort');
                  }
                  if (query) params.set('q', query);
                  router.push(`/search?${params.toString()}`);
                }}
                className="w-4 h-4 text-gold-600 border-gray-300 focus:ring-gold-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h4>
          <div className="space-y-1">
            {category && (
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Category: {categories.find(c => c.value === category)?.label}</span>
                <button
                  onClick={() => {
<<<<<<< HEAD
                    const params = new URLSearchParams(searchParams || '');
=======
                    const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
                    params.delete('category');
                    if (query) params.set('q', query);
                    router.push(`/search?${params.toString()}`);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {minPrice && (
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Min Price: £{minPrice}</span>
                <button
                  onClick={() => {
<<<<<<< HEAD
                    const params = new URLSearchParams(searchParams || '');
=======
                    const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
                    params.delete('minPrice');
                    if (query) params.set('q', query);
                    router.push(`/search?${params.toString()}`);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {maxPrice && (
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Max Price: £{maxPrice}</span>
                <button
                  onClick={() => {
<<<<<<< HEAD
                    const params = new URLSearchParams(searchParams || '');
=======
                    const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
                    params.delete('maxPrice');
                    if (query) params.set('q', query);
                    router.push(`/search?${params.toString()}`);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {sort && sort !== 'new' && (
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Sort: {sortOptions.find(s => s.value === sort)?.label}</span>
                <button
                  onClick={() => {
<<<<<<< HEAD
                    const params = new URLSearchParams(searchParams || '');
=======
                    const params = new URLSearchParams(searchParams);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
                    params.delete('sort');
                    if (query) params.set('q', query);
                    router.push(`/search?${params.toString()}`);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}