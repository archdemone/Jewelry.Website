'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProductImageFallback } from '@/lib/assets/images';

interface ProductImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  productSlug?: string;
  categorySlug?: string;
  productName?: string;
}

export function ProductImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  width = 400,
  height = 400,
  priority = false,
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  quality = 75,
  productSlug,
  categorySlug,
  productName
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try fallback image first
      if (fallbackSrc && fallbackSrc !== imgSrc) {
        setImgSrc(fallbackSrc);
        return;
      }
      
      // If we have product info, try to get a smart fallback
      if (productSlug && productName) {
        const smartFallback = getProductImageFallback({
          productSlug,
          categorySlug: categorySlug ?? undefined,
          name: productName,
        });
        
        if (smartFallback.length > 0 && smartFallback[0] !== imgSrc) {
          setImgSrc(smartFallback[0]);
          return;
        }
      }
      
      // Final fallback to placeholder
      setImgSrc('/images/MyImages/IMG-20250816-WA0000.jpg');
    }
  };

  // If we've exhausted all fallbacks, show a styled placeholder
  if (hasError && imgSrc === '/images/MyImages/IMG-20250816-WA0000.jpg') {
    return (
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br from-[#D4AF37] via-[#B8941F] to-[#8B6914] ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
        }}
        role="img"
        aria-label={`${alt} - Premium Jewelry`}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0, transparent 50%)
              `,
            }}
          />
        </div>

        {/* Main text */}
        <div className="relative z-10 text-center text-white">
          <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">{productName || 'Jewelry Item'}</h3>
          <p className="mt-1 text-sm text-white/80 sm:text-base">Premium Jewelry</p>
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover transition-opacity duration-300 ${className}`}
      onError={handleError}
      priority={priority}
      sizes={sizes}
      quality={quality}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  );
}
