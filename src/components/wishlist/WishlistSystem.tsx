'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, Share2, Eye, Star } from 'lucide-react';
import { ProductImage } from '@/components/products/ProductImage';
import Link from 'next/link';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  addedDate: string;
}

interface WishlistSystemProps {
  items?: WishlistItem[];
  onRemoveItem?: (itemId: string) => void;
  onAddToCart?: (productId: string) => void;
  onShare?: (productId: string) => void;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    productId: 'rose-gold-engagement-ring',
    name: 'Rose Gold Diamond Engagement Ring',
    price: 2499.99,
    originalPrice: 2999.99,
    image: '/images/rings/rose-gold-engagement.jpg',
    slug: 'rose-gold-engagement-ring',
    category: 'Engagement Rings',
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    addedDate: '2024-01-15',
  },
  {
    id: '2',
    productId: 'pearl-necklace-classic',
    name: 'Classic Pearl Necklace',
    price: 899.99,
    image: '/images/necklaces/pearl-classic.jpg',
    slug: 'pearl-necklace-classic',
    category: 'Necklaces',
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
    addedDate: '2024-01-12',
  },
  {
    id: '3',
    productId: 'diamond-tennis-bracelet',
    name: 'Diamond Tennis Bracelet',
    price: 1599.99,
    image: '/images/bracelets/diamond-tennis.jpg',
    slug: 'diamond-tennis-bracelet',
    category: 'Bracelets',
    rating: 4.9,
    reviewCount: 31,
    inStock: false,
    addedDate: '2024-01-10',
  },
];

export function WishlistSystem({ 
  items = mockWishlistItems, 
  onRemoveItem,
  onAddToCart,
  onShare 
}: WishlistSystemProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'name'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case 'oldest':
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [items, sortBy]);

  const handleRemoveItem = (itemId: string) => {
    onRemoveItem?.(itemId);
  };

  const handleAddToCart = (productId: string) => {
    onAddToCart?.(productId);
  };

  const handleShare = (productId: string) => {
    onShare?.(productId);
  };

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">
          Start adding items you love to your wishlist and keep track of them here.
        </p>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors">
          Explore Products
        </Link>
              </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
              <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
              <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select              value={sortBy}              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
              </select>
              </div>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button              onClick={() => setViewMode('grid')}              className={`px-3 py-2 ${ viewMode === 'grid' ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50' }`}
            >
              Grid
            </button>
              <button              onClick={() => setViewMode('list')}              className={`px-3 py-2 ${ viewMode === 'list' ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50' }`}
            >
              List
            </button>
              </div>
              </div>
              </div>

      {/* Items */}
      <AnimatePresence mode="popLayout">
              <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'  : 'grid-cols-1' }`}>
          {sortedItems.map((item, index) => (
            <motion.div key={item.id}
              layout              initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              exit={{ opacity: 0, scale: 0.9 }}              transition={{ delay: index * 0.1 }}              className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${ viewMode === 'list' ? 'flex' : '' }`}>
              {/* Product Image */}
              <div className={`relative ${ viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square' }`}>
              <Link href={`/products/${item.slug}`}>
              <ProductImage              src={item.image}              alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"              productSlug={item.slug}              categorySlug={item.category.toLowerCase().replace(' ', '-')}              productName={item.name}
                  />
              </Link>
                
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium text-sm bg-red-500 px-3 py-1 rounded">
                      Out of Stock
                    </span>
              </div>
                )}

                <button              onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label="Remove from wishlist"
                >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </button>
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="space-y-2">
              <div className="flex items-start justify-between">
              <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{item.category}</p>
              <Link href={`/products/${item.slug}`} className="font-semibold text-gray-900 hover:text-gold-600 transition-colors line-clamp-2">
                        {item.name}
                      </Link>
              </div>
              </div>

                  {item.rating && (
                    <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star              key={star}              className={`h-3 w-3 ${
                              star <= Math.round(item.rating!) 
                                ? 'text-gold-500 fill-gold-500'  : 'text-gray-300' }`}
                          />
                        ))}
                      </div>
              <span className="text-xs text-gray-500">({item.reviewCount})</span>
              </div>
                  )}

                  <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">£{item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        £{item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
              <p className="text-xs text-gray-500">
                    Added {new Date(item.addedDate).toLocaleDateString()}
                  </p>
              </div>

                {/* Actions */}
                <div className={`mt-4 space-y-2 ${viewMode === 'list' ? 'flex flex-col justify-end' : ''}`}>
              <button              onClick={() => handleAddToCart(item.productId)}              disabled={!item.inStock}              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      item.inStock
                        ? 'bg-gold-500 text-white hover:bg-gold-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
                  >
              <ShoppingBag className="h-4 w-4" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
              <div className="flex gap-2">
              <Link href={`/products/${item.slug}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4" />
                      View
                    </Link>
              <button              onClick={() => handleShare(item.productId)}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
              <Share2 className="h-4 w-4" />
              </button>
              <button              onClick={() => handleRemoveItem(item.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                    >
              <Trash2 className="h-4 w-4" />
              </button>
              </div>
              </div>
              </div>
              </motion.div>
          ))}
        </div>
              </AnimatePresence>
              </div>
  );
}
