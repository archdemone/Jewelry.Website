'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroCarousel = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/header/hero-1.webp"
          alt="J&M Jewelry - Exquisite handcrafted engagement rings"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 px-4 max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light drop-shadow-lg font-serif leading-tight"
          >
            J&M Jewelry
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl drop-shadow max-w-2xl mx-auto text-gray-100 font-light"
          >
            Handcrafted rings with passion, designed for your forever moments
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
          >
            <Link 
              href="/products"
              className="btn-stable bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Collection
            </Link>
            <Link 
              href="/about-artisan"
              className="btn-stable bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Meet the Artisan
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCarousel;
