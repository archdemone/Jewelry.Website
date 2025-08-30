'use client';

import Link from 'next/link';


const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Perfect LCP-optimized hero image */}
      <img
        src="/images/home/header.webp"
        alt="Jewelry craftsmanship"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay content - positioned inside hero for faster FCP/LCP */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        <div className="space-y-6 px-4 text-center">
          <h1 className="font-serif text-5xl font-bold drop-shadow-lg md:text-6xl">
            Discover Timeless Jewelry
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-orange-400 drop-shadow md:text-2xl">
            Handcrafted pieces for every occasion
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="btn-stable bg-white text-[#1A1A1A] !text-[#1A1A1A] transition-colors hover:bg-gray-100 hover:!text-[#1A1A1A]"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="btn-stable border-2 border-orange-400 bg-transparent text-orange-400 transition-colors hover:bg-orange-400 hover:text-white"
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
