'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, X, Move } from 'lucide-react';
import { ProductImage } from '@/components/products/ProductImage';

interface EnhancedProductGalleryProps {
  images: string[];
  productName: string;
  productSlug?: string;
  categorySlug?: string;
}

export function EnhancedProductGallery({ 
  images, 
  productName, 
  productSlug, 
  categorySlug 
}: EnhancedProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handlePreviousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleRotate = () => {
    setRotationAngle((prev) => prev + 90);
    setIsRotated(true);
  };

  const handleLightboxOpen = () => {
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
    setRotationAngle(0);
    setIsRotated(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          handleLightboxClose();
          break;
        case 'ArrowLeft':
          handlePreviousImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'z':
        case 'Z':
          handleZoomToggle();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePreviousImage, handleNextImage]);

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePreviousImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
              </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
              <div className={`relative w-full h-full cursor-zoom-in transition-all duration-300 ${ isZoomed ? 'cursor-zoom-out' : '' }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <ProductImage              src={images[currentImageIndex]}              alt={`${productName} - Image ${currentImageIndex + 1}`}              className={`w-full h-full object-cover transition-transform duration-300 ${ isZoomed ? 'scale-200' : '' }`}              productSlug={productSlug}              categorySlug={categorySlug}              productName={productName}
             />

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
              <button onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
              </button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button onClick={handleZoomToggle}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all" aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}>
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </button>
              <button onClick={handleRotate}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all" aria-label="Rotate image">
              <RotateCw className="h-4 w-4" />
              </button>
              <button onClick={handleLightboxOpen}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all" aria-label="Open lightbox">
              <Move className="h-4 w-4" />
              </button>
              </div>
              </div>
              </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button              key={index}              onClick={() => handleThumbnailClick(index)}              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-gold-500 ring-2 ring-gold-200' : 'border-gray-200 hover:border-gray-300' }`}
                aria-label={`View image ${index + 1}`}
              >
              <ProductImage              src={image}              alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"              width={80}              height={80}              productSlug={productSlug}              categorySlug={categorySlug}              productName={productName}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 lightbox-backdrop" onClick={handleLightboxClose}>
              <div className="relative max-w-4xl max-h-full p-4">
              {/* Close Button */}
              <button onClick={handleLightboxClose}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all" aria-label="Close lightbox">
              <X className="h-6 w-6" />
              </button>

              {/* Main Image */}
              <div className="relative cursor-zoom-in"              onClick={(e) => e.stopPropagation()}              onTouchStart={handleTouchStart}              onTouchMove={handleTouchMove}              onTouchEnd={handleTouchEnd}
              >
              <ProductImage              src={images[currentImageIndex]}              alt={`${productName} - Image ${currentImageIndex + 1}`}              className={`max-w-full max-h-[80vh] object-contain transition-transform duration-300 ${ isZoomed ? 'scale-150' : '' }`}              productSlug={productSlug}              categorySlug={categorySlug}              productName={productName}
                 />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
              <button onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all" aria-label="Previous image">
              <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all" aria-label="Next image">
              <ChevronRight className="h-6 w-6" />
              </button>
              </>
                )}

                {/* Action Buttons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button onClick={handleZoomToggle}
                    className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all" aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}>
                    {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                  </button>
              <button onClick={handleRotate}
                    className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all" aria-label="Rotate image">
              <RotateCw className="h-5 w-5" />
              </button>
              </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((image, index) => (
                    <button              key={index}              onClick={() => handleThumbnailClick(index)}              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-gold-500 ring-2 ring-gold-200' : 'border-gray-300 hover:border-gray-400' }`}
                      aria-label={`View image ${index + 1}`}
                    >
              <ProductImage              src={image}              alt={`${productName} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"              width={64}              height={64}              productSlug={productSlug}              categorySlug={categorySlug}              productName={productName}
                      />
              </button>
                  ))}
                </div>
              )}
            </div>
              </motion.div>
        )}
      </AnimatePresence>
              </>
  );
}
