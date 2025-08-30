'use client';
import { useState } from 'react';
import Image from 'next/image';
import { getProductImage } from '@/lib/assets/images';

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Ensure we have at least one image to display
  const displayImages = images.length > 0 ? images : ['/images/placeholder.png'];

  // Ensure productName is never undefined
  const safeProductName = productName || 'Jewelry Item';

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* Main Image */}
      <div className="lg:col-span-4">
        <div className="aspect-square overflow-hidden rounded-lg relative">
          <Image
            src={getProductImage({ images: [displayImages[selectedImage] || displayImages[0]] })}
            alt={`${safeProductName} - Image ${selectedImage + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            unoptimized={/^https?:\/\//i.test(displayImages[selectedImage] || displayImages[0])}
            priority={selectedImage === 0}
          />
        </div>
      </div>

      {/* Thumbnail Images */}
      {displayImages.length > 1 && (
        <div className="lg:col-span-4">
          <div className="grid grid-cols-4 gap-2">
            {displayImages.map((image, index) => {
              const src = getProductImage({ images: [image] });
              const isRemote = /^https?:\/\//i.test(src);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors relative ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${safeProductName} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 15vw"
                    unoptimized={isRemote}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
