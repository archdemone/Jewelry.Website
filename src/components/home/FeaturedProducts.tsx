'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { getFeaturedProducts, type FeaturedProduct } from '@/lib/featured-products';
import { useCartStore } from '@/store/cart';
import { showToast } from '@/components/ui/SimpleToast';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [featuredRings, setFeaturedRings] = useState<FeaturedProduct[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const { addItem, items, isHydrated } = useCartStore();

  useEffect(() => {
    setMounted(true);
    // Load featured products immediately after mounting
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
      showToast(`${product?.name} removed from wishlist`, 'info');
    } else {
      newWishlist.add(productId);
      showToast(`${product?.name} added to wishlist!`, 'success');
    }
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
    }
  };

  const handleAddToCart = (ring: FeaturedProduct) => {
    if (!isHydrated) {
      showToast('Cart is still loading, please try again', 'error');
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
    showToast(`${ring.name} added to cart!`, 'success');
  };

  // Show 6 products for better engagement and variety
  const initialProducts = featuredRings.slice(0, 6);

  // Show loading state only if not mounted or no products loaded
  if (!mounted || featuredRings.length === 0) {
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
            <motion.div key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(ring.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={ring.image}
                  alt={ring.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={50}
                  priority={index === 0}
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(ring.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${wishlist.has(ring.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  aria-label={wishlist.has(ring.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Add to Cart */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredProduct === ring.id ? 1 : 0,
                    y: hoveredProduct === ring.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleAddToCart(ring)}
                  className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2"
                  aria-label={`Quick add ${ring.name} to cart`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Quick Add
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {ring.name}
                </h3>
                <p className="text-2xl font-bold text-gold-600 mb-4">
                  £{ring.price.toFixed(2)}
                </p>
                <Link
                  href={`/products/${ring.slug}`}
                  className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gold-700 transition-colors duration-200 block text-center"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
