'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// import SmartImage from '@/components/common/SmartImage'; // Temporarily disabled
import { useEffect, useMemo, useState } from 'react';

const HeroSection = () => {
  const images = useMemo(
    () => ['/images/header/hero-1.jpg', '/images/header/hero-2.jpg', '/images/header/hero-3.jpg'],
    [],
  );
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative aspect-[16/9] max-h-[520px] min-h-[320px] w-full overflow-hidden md:aspect-[21/9] md:max-h-[600px] lg:aspect-[24/9] lg:max-h-[640px]">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="relative h-full w-full">
              <img
                src={images[index]}
                alt="Artisan Crafting Ring"
                className="h-full w-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium uppercase tracking-wider text-gold-400">
              Locally Crafted • Single Artisan • Lifetime Warranty
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 mt-4 font-serif text-5xl text-white md:text-7xl"
          >
            Rings Crafted
            <br />
            <span className="text-gold-400">With Passion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl text-gray-200"
          >
            Each ring is personally handcrafted from start to finish using locally-sourced
            materials. No mass production, no teams – just one artisan's dedication to your perfect
            ring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#B8961F' }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gold-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Link href="/products">Explore Rings</Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              <Link href="/contact">Book Consultation</Link>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
          <div className="mt-2 h-3 w-1 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
