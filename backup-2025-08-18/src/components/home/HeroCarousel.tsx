'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const heroImages = [
  {
    src: '/images/header/hero-1-1920.webp',
    alt: 'Elegant handcrafted jewelry',
    title: 'Discover Timeless Jewelry',
    subtitle: 'Handcrafted pieces for every occasion',
    cta: 'Shop Collection',
    ctaLink: '/products',
    secondaryCta: 'Meet the Artisan',
    secondaryCtaLink: '/about-artisan'
  },
  {
    src: '/images/header/hero-2-1920.webp',
    alt: 'Master craftsmanship in jewelry making',
    title: 'Master Craftsmanship',
    subtitle: 'Each piece tells a unique story',
    cta: 'View Process',
    ctaLink: '/crafting-process',
    secondaryCta: 'Our Story',
    secondaryCtaLink: '/about'
  },
  {
    src: '/images/header/hero-3-1920.webp',
    alt: 'Luxury engagement rings collection',
    title: 'Luxury Engagement Rings',
    subtitle: 'Perfect for your special moment',
    cta: 'Shop Rings',
    ctaLink: '/products?category=engagement-rings',
    secondaryCta: 'Size Guide',
    secondaryCtaLink: '/size-guide'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            priority={index === 0} // Only priority the first image (LCP target)
            loading={index === 0 ? 'eager' : 'lazy'} // Eager for first, lazy for others
            quality={70}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            fetchPriority={index === 0 ? "high" : "auto"}
            placeholder={index === 0 ? "blur" : "empty"}
            blurDataURL={index === 0 ? "/images/header/hero-1-blur.webp" : undefined}
          />
        </div>
      ))}
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg font-serif">
            {heroImages[currentSlide].title}
          </h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow max-w-2xl mx-auto text-orange-400">
            {heroImages[currentSlide].subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href={heroImages[currentSlide].ctaLink}
              className="btn-stable bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {heroImages[currentSlide].cta}
            </Link>
            <Link 
              href={heroImages[currentSlide].secondaryCtaLink}
              className="btn-stable bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors"
            >
              {heroImages[currentSlide].secondaryCta}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
