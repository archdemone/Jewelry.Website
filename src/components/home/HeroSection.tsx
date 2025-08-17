'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 hero-section">
      {/* Background Image - Fixed container to prevent layout shifts */}
      <div className="absolute inset-0 w-full h-full hero-image-container">
        <Image
          src="/images/header/hero-optimized.webp"
          alt="Handcrafted jewelry workshop"
          width={1200}
          height={675}
          priority
          fetchPriority="high"
          className="object-cover hero-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{
            objectPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content - Fixed positioning to prevent layout shifts */}
      <div className="relative z-10 flex h-full items-center hero-content">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Fixed height container for title to prevent layout shifts */}
            <div className="mb-6 min-h-[120px] md:min-h-[140px] lg:min-h-[160px]">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl"
              >
                Handcrafted Rings
                <br />
                <span className="text-orange-300">Made with Love</span>
              </motion.h1>
            </div>
            
            {/* Fixed height container for subtitle */}
            <div className="mb-8 min-h-[60px] md:min-h-[70px]">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-200 md:text-2xl"
              >
                Each ring is personally crafted by a master artisan, ensuring unique beauty 
                and exceptional quality for your most precious moments.
              </motion.p>
            </div>

            {/* Fixed height container for buttons */}
            <div className="min-h-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="button-container"
              >
                <Link
                  href="/products"
                  className="btn-stable bg-orange-500 text-white shadow-lg hover:scale-105 hover:bg-orange-600 hover:shadow-xl"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/crafting-process"
                  className="btn-stable border-2 border-white text-white hover:scale-105 hover:bg-white hover:text-gray-900"
                >
                  Learn Our Process
                </Link>
              </motion.div>
            </div>

            {/* Fixed height container for trust indicators */}
            <div className="mt-12 min-h-[40px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center gap-8 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">100% Handcrafted</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Lifetime Warranty</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
