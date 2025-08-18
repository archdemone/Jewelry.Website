'use client';

import Link from 'next/link';

const HeroCarousel = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
      {/* CSS Gradient Background instead of image for instant LCP */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-800/80 to-red-900/80"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg font-serif">
            Discover Timeless Jewelry
          </h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow max-w-2xl mx-auto text-orange-200">
            Handcrafted pieces for every occasion
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/products"
              className="btn-stable bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about-artisan"
              className="btn-stable bg-transparent border-2 border-orange-300 text-orange-300 hover:bg-orange-300 hover:text-white transition-colors"
            >
              Meet the Artisan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
