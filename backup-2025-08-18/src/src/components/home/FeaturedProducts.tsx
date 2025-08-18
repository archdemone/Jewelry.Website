'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { getFeaturedProducts, type FeaturedProduct } from '@/lib/featured-products';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [featuredRings, setFeaturedRings] = useState<FeaturedProduct[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const { addItem, items, isHydrated } = useCartStore();

  useEffect(() => {
    // Load featured products from the data store
    setFeaturedRings(getFeaturedProducts());

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
  }, []);

  const handleWishlistToggle = (productId: string) => {
    const newWishlist = new Set(wishlist);
    const product = featuredRings.find((ring) => ring.id === productId);

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
    localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
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
      ringWidth: ring.ringWidth[0]?.toString() || '6',
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

    // Debug log
    console.log('Cart items after adding:', items);
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Featured Rings</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover our handcrafted collection of unique rings, each piece tells a story of
            craftsmanship and beauty
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredRings.map((ring, index) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredProduct(ring.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={ring.image}
                  alt={ring.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Quick Actions Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProduct === ring.id ? 1 : 0 }}
                  className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-40"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWishlistToggle(ring.id)}
                    className={`rounded-full p-3 transition-colors ${
                      wishlist.has(ring.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(ring)}
                    className="rounded-full bg-orange-500 p-3 text-white transition-colors hover:bg-orange-600"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* Badge */}
                {ring.originalPrice && (
                  <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                    {Math.round(((ring.originalPrice - ring.price) / ring.originalPrice) * 100)}%
                    OFF
                  </div>
                )}

                {ring.isReadyToShip ? (
                  <div className="absolute right-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                    Ready to Ship
                  </div>
                ) : (
                  <div className="absolute right-3 top-3 rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                    Custom Order
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                  {ring.name}
                </h3>

                <div className="mb-2 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(ring.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({ring.reviews} reviews)</span>
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900">£{ring.price}</span>
                    {ring.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        £{ring.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{ring.craftTime}</span>
                </div>

                {/* Product Details */}
                <div className="mb-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium text-gray-900">{ring.material}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gem:</span>
                    <span className="font-medium text-gray-900">{ring.gemColor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">{ring.category}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/products/${ring.slug}`}
                    className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-orange-600"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleWishlistToggle(ring.id)}
                    className={`rounded-lg p-2 transition-colors ${
                      wishlist.has(ring.id)
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg bg-orange-500 px-8 py-3 font-medium text-white transition-colors hover:bg-orange-600"
          >
            View All Rings
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
