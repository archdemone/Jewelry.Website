'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroCarousel = () => {
  return (
    <section 
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '90vh',
        minHeight: '600px',
        overflow: 'hidden'
      }}
    >
             {/* Hero Background Image */}
       <div 
         className="hero-background bg-gradient-to-br from-amber-900 via-orange-800 to-red-900"
         style={{
           position: 'absolute',
           inset: '0',
           width: '100%',
           height: '100%'
         }}
       >
                            <Image
                src="/images/header/hero-optimized-768.webp"
                alt="J&M Jewelry - Exquisite handcrafted engagement rings"
                width={1920}
                height={1080}
                priority
                fetchPriority="high"
                className="object-cover w-full h-full"
                sizes="100vw"
                quality={50}
                placeholder="blur"
                blurDataURL="/images/header/hero-blur.webp"
                loading="eager"
              />
        <div 
          className="hero-overlay"
          style={{
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.5))'
          }}
        ></div>
      </div>
      
      {/* Content Overlay */}
      <div 
        className="hero-content"
        style={{
          position: 'absolute',
          inset: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 10
        }}
      >
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
             className="hero-title"
             style={{
               fontSize: '3rem',
               fontWeight: 300,
               textShadow: '0 2px 4px rgba(0,0,0,0.5)',
               fontFamily: "'Playfair Display', serif",
               lineHeight: 1.2,
               margin: 0
             }}
           >
             J&M Jewelry
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="hero-subtitle"
             style={{
               fontSize: '1.25rem',
               textShadow: '0 1px 2px rgba(0,0,0,0.5)',
               maxWidth: '32rem',
               margin: '0 auto',
               color: '#f3f4f6',
               fontWeight: 300
             }}
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
