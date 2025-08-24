'use client';

import Link from 'next/link';

const HeroCarousel = () => {
  return (
    <section className="hero-section relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/home/header.webp"
          alt="J&M Jewelry - Handcrafted rings with passion"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="hero-title text-6xl md:text-8xl font-bold tracking-wider" style={{ 
            fontFamily: 'Playfair Display, serif', 
            letterSpacing: '0.15em',
            fontWeight: '600',
            fontStyle: 'italic'
          }}>
            J&M
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Handcrafted rings with passion, designed for your forever moments
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row">
            <Link href="/products"
              className="btn-primary bg-gold-600 hover:bg-gold-700 text-white font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Shop Collection
            </Link>
            <Link href="/about-artisan"
              className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Meet Our Artisan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
