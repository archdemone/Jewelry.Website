'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';
import { useSession } from 'next-auth/react';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  productPrice?: number;
  productImage?: string;
  productSlug?: string;
  productCategory?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

export function WishlistButton({ 
  productId,
  productName = '',
  productPrice = 0,
  productImage = '',
  productSlug = '',
  productCategory = '',
  size = 'md',
  variant = 'icon',
  className = ''
}: WishlistButtonProps) {
  const { data: session } = useSession();
  const { 
    isInWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isLoading,
    isHydrated 
  } = useWishlistStore();
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [localIsInWishlist, setLocalIsInWishlist] = useState(false);

  // Update local state when store is hydrated
  useEffect(() => {
    if (isHydrated) {
      setLocalIsInWishlist(isInWishlist(productId));
    }
  }, [isHydrated, isInWishlist, productId]);

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

  const handleToggle = async () => {
    if (isAnimating || isLoading || !session) return;

    setIsAnimating(true);
    const newState = !localIsInWishlist;
    setLocalIsInWishlist(newState);

    try {
      if (newState) {
        // Add to wishlist
        await addToWishlist({
          productId,
          name: productName,
          price: productPrice,
          image: productImage,
          slug: productSlug,
          category: productCategory,
          inStock: true,
        });
      } else {
        // Remove from wishlist
        await removeFromWishlist(productId);
      }
    } catch (error) {
      // Revert on error
      setLocalIsInWishlist(!newState);
      console.error('Wishlist toggle error:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (variant === 'button') {
    return (
      <motion.button onClick={handleToggle}
        disabled={isAnimating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center justify-center gap-2 
          ${sizeClasses[size]}
          ${localIsInWishlist 
            ? 'bg-red-50 text-red-600 border-red-200' 
            : 'bg-white text-gray-600 border-gray-300 hover:border-red-300 hover:text-red-600'
          }
          border rounded-lg transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed ${className} `} aria-label={localIsInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
              <motion.div animate={{
            scale: isAnimating ? [1, 1.3, 1] : 1,
            rotate: isAnimating ? [0, 15, 0] : 0,
          }} transition={{ duration: 0.3 }}>
              <Heart              className={`
              ${iconSizes[size]} 
              ${localIsInWishlist ? 'fill-red-500 text-red-500' : ''} transition-colors duration-200 `} 
          />
              </motion.div>
              <span className="font-medium">
          {localIsInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </span>
              </motion.button>
    );
  }

  return (
    <motion.button onClick={handleToggle}
      disabled={isAnimating}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        ${sizeClasses[size]}
        ${localIsInWishlist 
          ? 'bg-red-50 text-red-600' 
          : 'bg-white text-gray-600 hover:text-red-600 hover:bg-red-50'
        }
        rounded-full border border-gray-200 hover:border-red-200
        transition-all duration-200 shadow-sm hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed ${className} `} aria-label={localIsInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
              <motion.div animate={{
          scale: isAnimating ? [1, 1.3, 1] : 1,
          rotate: isAnimating ? [0, 15, 0] : 0,
        }} transition={{ duration: 0.3 }}>
              <Heart className={`
            ${iconSizes[size]} 
            ${localIsInWishlist ? 'fill-red-500 text-red-500' : ''} transition-colors duration-200 `} 
        />
              </motion.div>
              </motion.button>
  );
}
