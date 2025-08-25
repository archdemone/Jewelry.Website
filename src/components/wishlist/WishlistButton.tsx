'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';

interface WishlistButtonProps {
  productId: string;
  name?: string;
  price?: number;
  image?: string;
  slug?: string;
  originalPrice?: number;
  material?: string;
  gemColor?: string;
  category?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

export function WishlistButton({ 
  productId,
  name = '',
  price = 0,
  image = '',
  slug = '',
  originalPrice,
  material,
  gemColor,
  category,
  badge,
  size = 'md',
  variant = 'icon',
  className = ''
}: WishlistButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { addItem, removeItem, isInWishlist, isHydrated, hydrate } = useWishlistStore();
  const inWishlist = isInWishlist(productId);

  const sizeClasses = {
    sm: variant === 'icon' ? 'p-1.5' : 'px-3 py-1.5 text-sm',
    md: variant === 'icon' ? 'p-2' : 'px-4 py-2',
    lg: variant === 'icon' ? 'p-3' : 'px-6 py-3 text-lg',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  useEffect(() => {
    if (!isHydrated) {
      // Hydrate store on client side to avoid hydration mismatch
      hydrate();
    }
  }, [isHydrated, hydrate]);

  const handleToggle = async () => {
    if (isAnimating || !isHydrated) return;

    setIsAnimating(true);

    try {
      if (inWishlist) {
        removeItem(productId);
      } else {
        addItem({
          productId,
          name,
          price,
          image,
          slug,
          originalPrice,
          material,
          gemColor,
          category,
          badge,
        });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (variant === 'button') {
    return (
      <motion.button 
        onClick={handleToggle}
        disabled={isAnimating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center justify-center gap-2 
          ${sizeClasses[size]}
          ${inWishlist 
            ? 'bg-red-50 text-red-600 border-red-200' 
            : 'bg-white text-gray-600 border-gray-300 hover:border-red-300 hover:text-red-600'
          }
          border rounded-lg transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <motion.div 
          animate={{
            scale: isAnimating ? [1, 1.3, 1] : 1,
            rotate: isAnimating ? [0, 15, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart 
            className={`
              ${iconSizes[size]} 
              ${inWishlist ? 'fill-red-500 text-red-500' : ''}
              transition-colors duration-200
            `} 
          />
        </motion.div>
        <span className="font-medium">
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button 
      onClick={handleToggle}
      disabled={isAnimating}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        ${sizeClasses[size]}
        ${inWishlist 
          ? 'bg-red-50 text-red-600' 
          : 'bg-white text-gray-600 hover:text-red-600 hover:bg-red-50'
        }
        rounded-full border border-gray-200 hover:border-red-200
        transition-all duration-200 shadow-sm hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <motion.div 
        animate={{
          scale: isAnimating ? [1, 1.3, 1] : 1,
          rotate: isAnimating ? [0, 15, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`
            ${iconSizes[size]} 
            ${inWishlist ? 'fill-red-500 text-red-500' : ''}
            transition-colors duration-200
          `} 
        />
      </motion.div>
    </motion.button>
  );
}