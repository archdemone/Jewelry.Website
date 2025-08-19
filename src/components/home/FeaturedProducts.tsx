'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { getFeaturedProducts, type FeaturedProduct } from '@/lib/featured-products';
import { useCartStore } from '@/store/cart';
import { getImageUrlWithVersion } from '@/lib/utils';
import { onPostLCP } from '@/lib/postLcp';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [featuredRings, setFeaturedRings] = useState<FeaturedProduct[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const { addItem, items, isHydrated } = useCartStore();

  useEffect(() => { setMounted(true); }, []);

  // Optimized data loading with postLCP scheduling
  useEffect(() => {
    const loadData = () => {
      setFeaturedRings(getFeaturedProducts());
      if (typeof window !== 'undefined') {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) { setWishlist(new Set(JSON.parse(savedWishlist))); }
      }
    };

    // Schedule work after LCP
    onPostLCP(() => {
      if (typeof window !== 'undefined' && window.requestIdleCallback) {
        window.requestIdleCallback(loadData);
      } else {
        setTimeout(loadData, 0);
      }
    });

    const handleStorageChange = () => {
      onPostLCP(() => {
        if (typeof window !== 'undefined' && window.requestIdleCallback) {
          window.requestIdleCallback(() => { setFeaturedRings(getFeaturedProducts()); });
        } else {
          setTimeout(() => { setFeaturedRings(getFeaturedProducts()); }, 0);
        }
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('featuredProductsUpdated', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('featuredProductsUpdated', handleStorageChange);
      };
    }
  }, []);

  // Optimized wishlist toggle with postLCP scheduling
  const handleWishlistToggle = useCallback((productId: string) => {
    const newWishlist = new Set(wishlist);
    const product = featuredRings.find(ring => ring.id === productId);
    
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      console.log(`Removed ${product?.name} from wishlist`);
    } else {
      newWishlist.add(productId);
      console.log(`Added ${product?.name} to wishlist`);
    }
    
    setWishlist(newWishlist);
    
    onPostLCP(() => {
      if (typeof window !== 'undefined') {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => { localStorage.setItem('wishlist', JSON.stringify([...newWishlist])); });
        } else {
          setTimeout(() => { localStorage.setItem('wishlist', JSON.stringify([...newWishlist])); }, 0);
        }
      }
    });
  }, [wishlist, featuredRings]);

  // Optimized add to cart with postLCP scheduling and dynamic toast import
  const handleAddToCart = useCallback((ring: FeaturedProduct) => {
    if (!isHydrated) {
      console.error('Cart is still loading, please try again');
      return;
    }

    onPostLCP(() => {
      // Dynamic import of toast to reduce initial bundle
      import('react-hot-toast').then(({ default: toast }) => {
        if (typeof window !== 'undefined' && window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            addItem({
              productId: ring.id,
              name: ring.name,
              price: ring.price,
              image: ring.image
            }, 1);
            toast.success(`${ring.name} added to cart!`, {
              duration: 3000,
              position: 'top-right',
              style: {
                background: '#10B981',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: 'none',
                maxWidth: '300px',
                textAlign: 'center'
              }
            });
          });
        } else {
          setTimeout(() => {
            addItem({
              productId: ring.id,
              name: ring.name,
              price: ring.price,
              image: ring.image
            }, 1);
            toast.success(`${ring.name} added to cart!`, {
              duration: 3000,
              position: 'top-right',
              style: {
                background: '#10B981',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: 'none',
                maxWidth: '300px',
                textAlign: 'center'
              }
            });
          }, 0);
        }
      });
    });
  }, [addItem, isHydrated]);

  // Optimized hover handlers with postLCP scheduling
  const handleMouseEnter = useCallback((productId: string) => {
    onPostLCP(() => {
      if (typeof window !== 'undefined' && window.requestIdleCallback) {
        window.requestIdleCallback(() => { setHoveredProduct(productId); });
      } else {
        setTimeout(() => { setHoveredProduct(productId); }, 0);
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    onPostLCP(() => {
      if (typeof window !== 'undefined' && window.requestIdleCallback) {
        window.requestIdleCallback(() => { setHoveredProduct(null); });
      } else {
        setTimeout(() => { setHoveredProduct(null); }, 0);
      }
    });
  }, []);

  return (
    <section
      className="py-16 bg-white"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular designs, each piece crafted with precision and passion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRings.map((ring) => (
            <motion.div
              key={ring.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => handleMouseEnter(ring.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageUrlWithVersion(ring.image)}
                  alt={ring.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                <button
                  onClick={() => handleWishlistToggle(ring.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                    wishlist.has(ring.id)
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
                  }`}
                  aria-label={wishlist.has(ring.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                  {ring.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {ring.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gold-600">
                    ${ring.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(ring)}
                    className="flex items-center gap-2 bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    disabled={!mounted || !isHydrated}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" passHref>
            <button className="bg-gold-600 text-white px-8 py-3 rounded-lg hover:bg-gold-700 transition-colors duration-300 shadow-lg hover:shadow-xl font-semibold">
              View All Collections
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
