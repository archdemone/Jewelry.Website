'use client';

import Link from 'next/link';

const HeroCarousel = () => {
  return (
    <section className="hero-section">
      {/* Hero Background with CSS Gradient for instant LCP */}
      <div className="hero-background bg-gradient-to-br from-orange-800 via-orange-600 to-red-600">
        <div className="hero-overlay"></div>
      </div>

      {/* Content Overlay */}
      <div className="hero-content">
        <div className="max-w-4xl space-y-8 px-4 text-center">
          <h1 className="hero-title">
            J&M
          </h1>
          <p className="hero-subtitle">
            Handcrafted rings with passion, designed for your forever moments
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/products"
              className="btn-primary"
            >
              Shop Collection
            </Link>
            <Link
              href="/about-artisan"
              className="btn-secondary"
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
