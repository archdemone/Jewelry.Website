'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface DynamicHeroProps {
  category: string;
  fallbackImage: string;
  title: string;
  subtitle?: string;
  showButtons?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

const DynamicHero = ({ 
  category,
  fallbackImage,
  title,
  subtitle,
  showButtons = true,
  primaryButtonText = 'Shop Collection',
  primaryButtonLink = '/products',
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '/about',
  className = ''
}: DynamicHeroProps) => {
  const [images, setImages] = useState<Array<{ id: string; url: string; name: string }>>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/header-images?category=${encodeURIComponent(category)}`);
        const data = await response.json();

        if (data.success && data.images.length > 0) {
          setImages(data.images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  // Auto-rotate images if there are multiple
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  // Get current image URL (database image or fallback to static)
  const currentImageUrl = images.length > 0
    ? images[currentImageIndex]?.url
    : fallbackImage;

  return (
    <section className={`hero-section relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentImageUrl}
          alt={`${title} - ${subtitle || ''}`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
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
            {title}
          </h1>
          {subtitle && (
            <p className="hero-subtitle text-xl md:text-2xl font-light max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          {showButtons && (
            <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row">
              <Link href={primaryButtonLink}
                className="btn-primary bg-white border-2 border-orange-500 text-black hover:bg-orange-500 hover:text-white font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                {primaryButtonText}
              </Link>
              <Link href={secondaryButtonLink}
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                {secondaryButtonText}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Image Indicators (if multiple images) */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default DynamicHero;
