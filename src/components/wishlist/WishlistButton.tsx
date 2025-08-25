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
  const { items, addItem, removeItem, isInWishlist, hydrate, hydrated } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    hydrate();
  }, [hydrate]);

  const inWishlist = mounted && hydrated ? isInWishlist(productId) : false;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!mounted || !hydrated) return;
    
    if (inWishlist) {
      removeItem(productId);
    } else {
      addItem({
        id: productId,
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
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`
        relative rounded-full border transition-all duration-200
        ${inWishlist 
          ? 'border-red-200 bg-red-50 text-red-600' 
          : 'border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:text-red-600'
        }
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <Heart 
        className={`${iconSizes[size]} transition-colors ${inWishlist ? 'fill-current' : ''}`} 
      />
    </motion.button>
  );
}