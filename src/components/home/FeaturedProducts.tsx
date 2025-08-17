'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
// import SmartImage from '@/components/common/SmartImage'; // Temporarily disabled
// import { getRingImages } from '@/lib/assets/images'; // Temporarily disabled

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Featured rings mapped to real product slugs
  const featuredRings = [
    {
      id: '1',
      slug: 'classic-solitaire-engagement-ring',
      name: 'Classic Solitaire Engagement Ring',
      price: 3500,
      material: '18k Yellow Gold',
      gemstone: '1ct Diamond',
      craftTime: '3-4 weeks',
      image: null,
    },
    {
      id: '2',
      slug: 'hammered-wedding-band',
      name: 'Hammered Wedding Band',
      price: 850,
      material: '14k White Gold',
      gemstone: 'None',
      craftTime: '2 weeks',
      image: null,
    },
    {
      id: '3',
      slug: 'sapphire-eternity-ring',
      name: 'Sapphire Eternity Ring',
      price: 2200,
      material: '18k Rose Gold',
      gemstone: 'Sapphires',
      craftTime: '4 weeks',
      image: null,
    },
    {
      id: '4',
      slug: 'classic-signet-ring',
      name: 'Vintage Signet Ring',
      price: 650,
      material: 'Sterling Silver',
      gemstone: 'None',
      craftTime: '1 week',
      image: null,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl">Featured Handcrafted Rings</h2>
          <p className="text-xl text-gray-600">
            Each ring is personally crafted from start to finish using locally-sourced materials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredRings.map((ring, index) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredProduct(ring.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredProduct === ring.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img
                      src={`/images/products/${ring.slug}-1.jpg`}
                      alt={ring.name}
                      className="h-full w-full object-cover"
                      style={{ objectFit: 'cover' }}
                    />
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === ring.id ? 1 : 0,
                      y: hoveredProduct === ring.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 flex gap-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex-1 rounded-full bg-white/90 py-2 font-medium backdrop-blur"
                    >
                      <Link href={`/products/${ring.slug}`}>Quick View</Link>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{ring.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{ring.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${ring.price}</span>
                    <Link
                      href={`/products/${ring.slug}`}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/products/${ring.slug}`}
                    className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    View Ring
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/products"
            className="inline-block rounded-full bg-gold-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View All Handcrafted Rings
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
