'use client';

import Link from 'next/link';
import Image from 'next/image';


const HeroCarousel = () => {
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '55vh',
        minHeight: '480px',
        overflow: 'hidden',
      }}
    >
      {/* Hero Background Image */}
      <div
        className="hero-background bg-gradient-to-br from-amber-900 via-orange-800 to-red-900"
        style={{
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src="/images/header/hero-1.jpg"
                          alt="J&M - Exquisite handcrafted engagement rings"
          width={1920}
          height={1080}
          priority
          fetchPriority="high"
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={75}
          placeholder="blur"
          blurDataURL="/images/header/hero-blur.webp"
          loading="eager"
          decoding="async"
        />
        <div
          className="hero-overlay"
          style={{
            position: 'absolute',
            inset: '0',
            background:
              'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
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
          zIndex: 10,
        }}
      >
        <div className="max-w-4xl space-y-8 px-4 text-center">
          <h1
            className="hero-title"
            style={{
              fontSize: '3rem',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '0.15em',
              fontStyle: 'italic'
            }}
          >
                          J&M
          </h1>
          <p
            className="hero-subtitle"
            style={{
              fontSize: '1.25rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              maxWidth: '32rem',
              margin: '0 auto',
              color: '#f3f4f6',
              fontWeight: 300,
            }}
          >
            Handcrafted rings with passion, designed for your forever moments
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/products"
              className="btn-stable transform bg-white text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
            >
              Explore Collection
            </Link>
            <Link
              href="/about-artisan"
              className="btn-stable transform border-2 border-white bg-transparent text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-gray-900"
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
