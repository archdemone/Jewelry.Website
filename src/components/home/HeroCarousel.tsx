'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-section relative h-screen overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0} // Only prioritize the first image
              className="object-cover"
              sizes="100vw"
              quality={85}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="hero-content relative z-10">
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

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
