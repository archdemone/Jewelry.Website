'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { getFeaturedProducts, type FeaturedProduct } from '@/lib/featured-products';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import { getImageUrlWithVersion } from '@/lib/utils';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [featuredRings, setFeaturedRings] = useState<FeaturedProduct[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const { addItem, items, isHydrated } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Load featured products from the data store
    setFeaturedRings(getFeaturedProducts());
    
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      // Load wishlist from localStorage
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(new Set(JSON.parse(savedWishlist)));
      }
      
      // Listen for storage changes to refresh the data
      const handleStorageChange = () => {
        setFeaturedRings(getFeaturedProducts());
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // Also listen for custom events (for same-tab updates)
      window.addEventListener('featuredProductsUpdated', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('featuredProductsUpdated', handleStorageChange);
      };
    }
  }, []);

  const handleWishlistToggle = (productId: string) => {
    const newWishlist = new Set(wishlist);
    const product = featuredRings.find(ring => ring.id === productId);
    
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      toast.success(`${product?.name} removed from wishlist`, {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } else {
      newWishlist.add(productId);
      toast.success(`${product?.name} added to wishlist!`, {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
    }
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
    }
  };

  const handleAddToCart = (ring: FeaturedProduct) => {
    if (!isHydrated) {
      toast.error('Cart is still loading, please try again');
      return;
    }
    
    addItem({
      productId: ring.id,
      name: ring.name,
      price: ring.price,
      image: ring.image,
      material: ring.material,
      gemColor: ring.gemColor,
      gemDensity: ring.gemDensity,
      gemVariation: ring.gemVariation,
      ringSize: ring.ringSizes.us[0]?.toString() || '7',
      ringWidth: ring.ringWidth[0]?.toString() || '6'
    });
    
    // Show success toast
    toast.success(`${ring.name} added to cart!`, {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });
68  };

  // Show 6 products for better engagement and variety
  const initialProducts = featuredRings.slice(0, 6);

  // Don't render until mounted to prevent SSR issues
  if (!mounted) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl heading-primary text-charcoal-900 mb-4">
              Featured Rings
            </h2>
            <p className="text-xl body-text text-gray-600 max-w-2xl mx-auto">
              Discover our most popular handcrafted pieces, each telling a unique story of craftsmanship and beauty.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" data-testid="featured-products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl heading-primary text-charcoal-900 mb-4"
          >
            Featured Rings
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl body-text text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular handcrafted pieces, each telling a unique story of craftsmanship and beauty.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="featured-products-grid">
          {initialProducts.map((ring, index) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(ring.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden border-2 border-black">
                <img
                  src={getImageUrlWithVersion(ring.image)}
                  alt={ring.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(ring.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    wishlist.has(ring.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                  aria-label={wishlist.has(ring.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 text-red-500 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} aria-hidden="true" />
                </button>

                {/* Quick Add to Cart */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredProduct === ring.id ? 1 : 0,
                    y: hoveredProduct === ring.id ? 0 : 20
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleAddToCart(ring)}
                  className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2"
                  aria-label={`Add ${ring.name} to cart`}
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  Add to Cart
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {ring.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    £{ring.price.toLocaleString()}
                  </span>
                  {ring.originalPrice && ring.originalPrice > ring.price && (
                    <span className="text-sm text-gray-500 line-through">
                      £{ring.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400" role="img" aria-label={`${ring.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(ring.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({ring.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300">
                    {ring.material}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded border ${
                    ring.gemColor === 'Red' ? 'bg-red-100 text-red-800 border-red-300' :
                    ring.gemColor === 'Blue' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                    ring.gemColor === 'Green' ? 'bg-green-100 text-green-800 border-green-300' :
                    ring.gemColor === 'Purple' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                    ring.gemColor === 'Yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                    'bg-gray-100 text-gray-700 border-gray-300'
                  }`}>
                    {ring.gemVariation === 'Dark' ? `Dark ${ring.gemColor}` :
                     ring.gemVariation === 'Bright' ? `Bright ${ring.gemColor}` :
                     ring.gemVariation === 'Mixed' ? `Mixed ${ring.gemColor}` :
                     ring.gemColor}
                  </span>
                </div>
                <Link
                  href={`/products/${ring.slug}`}
                  className="block w-full text-center bg-gold-600 text-white py-3 px-4 rounded-lg hover:bg-gold-700 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-gold-600 text-white font-semibold rounded-lg hover:bg-gold-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
