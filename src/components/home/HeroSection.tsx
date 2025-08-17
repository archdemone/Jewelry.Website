'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const HeroSection = () => {
  const images = useMemo(
    () => ['/images/header/hero-1.jpg', '/images/header/hero-2.jpg', '/images/header/hero-3.jpg'],
    [],
  );
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false]);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = images.map((src, i) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[i] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = src;
        });
      });

      await Promise.all(loadPromises);
      setIsLoading(false);
    };

    preloadImages();
  }, [images]);

  return (
    <section className="relative aspect-[16/9] max-h-[520px] min-h-[320px] w-full overflow-hidden md:aspect-[21/9] md:max-h-[600px] lg:aspect-[24/9] lg:max-h-[640px]">
      {/* CSS Animated Hero Banner */}
      <div className="hero-banner absolute inset-0">
        {/* Images */}
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Artisan Crafting Ring ${index + 1}`}
            fill
            priority={index === 0}
            quality={85}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-5" />

        {/* Text Content */}
        <div className="hero-text absolute inset-0 z-10 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <div className="animate-fade-in">
                <span className="text-sm font-medium uppercase tracking-wider text-gold-400">
                  Locally Crafted • Single Artisan • Lifetime Warranty
                </span>
              </div>

              <h1 className="mb-6 mt-4 font-serif text-5xl text-white md:text-7xl animate-fade-in-delay-1">
                Rings Crafted
                <br />
                <span className="text-gold-400">With Passion</span>
              </h1>

              <p className="mb-8 text-xl text-gray-200 animate-fade-in-delay-2">
                Each ring is personally handcrafted from start to finish using locally-sourced
                materials. No mass production, no teams – just one artisan's dedication to your perfect
                ring.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
                <button className="rounded-full bg-gold-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gold-600 active:scale-95">
                  <Link href="/products">Explore Rings</Link>
                </button>

                <button className="rounded-full border-2 border-white px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95">
                  <Link href="/contact">Book Consultation</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce z-10">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
            <div className="mt-2 h-3 w-1 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
