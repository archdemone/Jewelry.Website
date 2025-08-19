'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getImageUrlWithVersion } from '@/lib/utils';

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: getImageUrlWithVersion('/images/home/header1.jpg'),
      alt: 'Handcrafted jewelry collection showcase'
    },
    {
      src: getImageUrlWithVersion('/images/home/header2.jpg'),
      alt: 'Beautiful ring designs and craftsmanship'
    },
    {
      src: getImageUrlWithVersion('/images/home/header3.jpg'),
      alt: 'Premium jewelry craftsmanship and quality'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="hero-section">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="hero-image"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark overlay for text readability */}
          <div className="hero-overlay"></div>
        </div>
      ))}

      <div className="hero-content container">
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

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white scale-150' : 'bg-gray-400 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
