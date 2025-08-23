'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductImage } from '@/components/products/ProductImage';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const handleWishlistToggle = (productId: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const initialProducts = [
    {
      id: '1',
      name: 'Rose Gold Engagement Ring',
      price: 1299.99,
      image: '/images/MyImages/IMG-20250816-WA0000.jpg',
      slug: 'rose-gold-engagement-ring'
    },
    {
      id: '2',
      name: 'Classic Wedding Band',
      price: 899.99,
      image: '/images/MyImages/IMG-20250816-WA0001.jpg',
      slug: 'classic-wedding-band'
    },
    {
      id: '3',
      name: 'Diamond Stud Earrings',
      price: 1599.99,
      image: '/images/MyImages/IMG-20250816-WA0002.jpg',
      slug: 'diamond-stud-earrings'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Featured Collections
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular handcrafted pieces, each telling a unique story of artistry and passion.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="featured-products-grid">
          {initialProducts.map((ring, index) => (
            <motion.div              key={ring.id}              initial={{ opacity: 0, y: 20 }}              whileInView={{ opacity: 1, y: 0 }}              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"              onMouseEnter={() => setHoveredProduct(ring.id)}              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden border-2 border-black">
                <ProductImage              src={ring.image}              alt={ring.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"              width={400}              height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"              quality={50}              priority={index === 0}              productSlug={ring.slug}              productName={ring.name}
                />
                
                {/* Wishlist Button */}
                <button              onClick={() => handleWishlistToggle(ring.id)}              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    wishlist.has(ring.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                  aria-label={wishlist.has(ring.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${wishlist.has(ring.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Add to Cart */}
                <motion.button              initial={{ opacity: 0, y: 20 }}              animate={{ 
                    opacity: hoveredProduct === ring.id ? 1 : 0,
                    y: hoveredProduct === ring.id ? 0 : 20
                  }}              transition={{ duration: 0.3 }}
                  className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2"
                  aria-label={`Quick add ${ring.name} to cart`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Quick Add
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {ring.name}
                </h3>
                <p className="text-2xl font-bold text-gold-600 mb-4">
                  £{ring.price.toFixed(2)}
                </p>
                <button className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gold-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
