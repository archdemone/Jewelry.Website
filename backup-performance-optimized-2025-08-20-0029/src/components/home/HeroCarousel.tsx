'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getImageUrlWithVersion } from '@/lib/utils';

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const images = [
    {
      src: '/images/home/header1.webp', // WebP for better performance
      alt: 'Handcrafted jewelry collection showcase'
    },
    {
      src: getImageUrlWithVersion('/images/home/header2.webp'),
      alt: 'Beautiful ring designs and craftsmanship'
    },
    {
      src: getImageUrlWithVersion('/images/home/header3.webp'),
      alt: 'Premium jewelry craftsmanship and quality'
    }
  ];

  // Optimized carousel advancement with task breaking
  const advanceCarousel = useCallback(() => {
    if (typeof window !== 'undefined' && window.requestIdleCallback) {
      window.requestIdleCallback(() => { setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); });
    } else { setTimeout(() => { setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); }, 0); }
  }, [images.length]);

  // Hydration effect
  useEffect(() => {
    setIsHydrated(true);
    setIsClient(true);
  }, []);

  // Handle first image load
  const handleFirstImageLoad = () => {
    setIsFirstImageLoaded(true);
  };

  // Auto-advance carousel - heavily deferred to not impact LCP
  useEffect(() => {
    if (!isHydrated) return;
    
    const startTimer = setTimeout(() => {
      // Only start carousel after LCP is likely complete
      const timer = setInterval(() => { advanceCarousel(); }, 5000);
      return () => clearInterval(timer);
    }, 5000); // Increased delay to 5 seconds
    return () => clearTimeout(startTimer);
  }, [advanceCarousel, isHydrated]);

  // Optimized click handler with task breaking
  const handleIndicatorClick = useCallback((index: number) => {
    if (typeof window !== 'undefined' && window.requestIdleCallback) { window.requestIdleCallback(() => { setCurrentImageIndex(index); }); }
    else { setTimeout(() => { setCurrentImageIndex(index); }, 0); }
  }, []);

  return (
    <section className="hero-section">
      {/* Static first image - always visible for LCP */}
      <div className="absolute inset-0 opacity-100">
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="hero-image"
          loading="eager"
          fetchPriority="high"
          onLoad={handleFirstImageLoad}
        />
        <div className="hero-overlay"></div>
      </div>
      
      {/* Carousel images - only show after first image loads */}
      {images.slice(1).map((image, index) => (
        <div
          key={index + 1}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isClient && (index + 1) === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="hero-image"
            loading="lazy"
            fetchPriority="auto"
          />
          <div className="hero-overlay"></div>
        </div>
      ))}
      
      <div className="hero-content px-4">
        <h1 className="mb-4 font-serif text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-lg">
          Timeless Craftsmanship, Unforgettable Moments
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl drop-shadow-md">
          Discover handcrafted rings where passion meets precision, designed to celebrate your unique story.
        </p>
        <Link href="/products" passHref>
          <button className="rounded-full bg-gold-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gold-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2">
            Explore Collections
          </button>
        </Link>
      </div>
      {isHydrated && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white scale-150' : 'bg-gray-400 hover:bg-gray-200'
              }`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
