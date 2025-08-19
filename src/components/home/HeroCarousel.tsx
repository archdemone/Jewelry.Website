'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroCarousel = () => {
  return (
    <section className="hero-section">
      {/* Hero Background Image */}
      <div className="hero-background">
        <Image
          src="/images/header/hero-1.jpg"
          alt="J&M - Exquisite handcrafted engagement rings"
          width={800}
          height={450}
          priority
          fetchPriority="high"
          className="h-full w-full object-cover"
          sizes="100vw"
          quality={70}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          loading="eager"
          decoding="async"
        />
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
