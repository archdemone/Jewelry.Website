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
  };

  // Show 6 products for better engagement and variety
  const initialProducts = featuredRings.slice(0, 6);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-primary mb-4 text-4xl text-charcoal-900 md:text-5xl"
          >
            Featured Rings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-text mx-auto max-w-2xl text-xl text-gray-600"
          >
            Discover our most popular handcrafted pieces, each telling a unique story of
            craftsmanship and beauty.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {initialProducts.map((ring, index) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onMouseEnter={() => setHoveredProduct(ring.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={ring.image}
                  alt={ring.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  quality={50}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(ring.id)}
                  className={`absolute right-3 top-3 rounded-full p-2 transition-all duration-200 ${
                    wishlist.has(ring.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                  aria-label={wishlist.has(ring.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`h-5 w-5 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Add to Cart */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredProduct === ring.id ? 1 : 0,
                    y: hoveredProduct === ring.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleAddToCart(ring)}
                  className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-lg bg-white/90 px-4 py-2 font-medium text-gray-900 backdrop-blur-sm transition-colors duration-200 hover:bg-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">{ring.name}</h3>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${ring.price.toLocaleString()}
                  </span>
                  {ring.originalPrice && ring.originalPrice > ring.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${ring.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="mb-3 flex items-center gap-2">
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
                  <span className="text-sm text-gray-600">({ring.reviews})</span>
                </div>
                <div className="mb-3 flex flex-wrap gap-1">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {ring.material}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {ring.gemColor}
                  </span>
                </div>
                <Link
                  href={`/products/${ring.slug}`}
                  className="block w-full transform rounded-lg bg-gold-600 px-4 py-3 text-center font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gold-700"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex transform items-center rounded-lg bg-gold-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gold-700 hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
