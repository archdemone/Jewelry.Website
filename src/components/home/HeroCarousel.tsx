'use client';

import Image from 'next/image';
import Link from 'next/link';

const HeroCarousel = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Static Hero Image for better LCP */}
      <div className="absolute inset-0">
        <Image
          src="/images/header/hero-1-1920.webp"
          alt="Elegant handcrafted jewelry"
          priority={true}
          loading="eager"
          quality={50}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          fetchPriority="high"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg font-serif">
            Discover Timeless Jewelry
          </h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow max-w-2xl mx-auto text-orange-400">
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
              className="btn-stable bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors"
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
