'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Perfect LCP-optimized hero image */}
      <Image
        src="/images/header/hero-1-1920.webp"
        alt="Elegant handcrafted jewelry"
        priority
        quality={70}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        placeholder="blur"
        blurDataURL="/images/header/hero-1-blur.webp"
      />
      
      {/* Overlay content - positioned inside hero for faster FCP/LCP */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg font-serif">
            Discover Timeless Jewelry
          </h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow max-w-2xl mx-auto">
            Handcrafted pieces for every occasion
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/products"
              className="btn-stable bg-white text-secondary hover:bg-gray-100 transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about-artisan"
              className="btn-stable bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary transition-colors"
            >
              Meet the Artisan
            </Link>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </section>
  );
};

export default HeroSection;
