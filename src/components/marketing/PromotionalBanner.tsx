'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, Truck, Shield } from 'lucide-react';

interface PromotionalBannerProps {
  type: 'sale' | 'announcement' | 'shipping' | 'security';
  title: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  dismissible?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export function PromotionalBanner({
  type,
  title,
  message,
  ctaText,
  ctaLink,
  dismissible = true,
  autoHide = false,
  autoHideDelay = 5000,
}: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const getBannerStyles = () => {
    switch (type) {
      case 'sale':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-pink-500',
          icon: Gift,
          iconColor: 'text-white',
        };
      case 'announcement':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-purple-500',
          icon: Star,
          iconColor: 'text-white',
        };
      case 'shipping':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          icon: Truck,
          iconColor: 'text-white',
        };
      case 'security':
        return {
          bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          icon: Shield,
          iconColor: 'text-white',
        };
      default:
        return {
          bg: 'bg-gray-800',
          icon: Star,
          iconColor: 'text-white',
        };
    }
  };

  const styles = getBannerStyles();
  const IconComponent = styles.icon;

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleCTAClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink;
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }} className={`${styles.bg} text-white py-3 px-4 relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-white transform rotate-12 scale-150"></div>
              </div>
              <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
              <IconComponent className={`h-5 w-5 ${styles.iconColor}`} />
              <div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-xs opacity-90">{message}</p>
              </div>
              </div>
              <div className="flex items-center space-x-3">
              {ctaText && ctaLink && (
                <motion.button whileHover={{ scale: 1.05 }}              whileTap={{ scale: 0.95 }}              onClick={handleCTAClick} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs font-medium px-3 py-1 rounded-full transition-all duration-200">
                  {ctaText}
                </motion.button>
              )}

              {dismissible && (
                <motion.button whileHover={{ scale: 1.1 }}              whileTap={{ scale: 0.9 }}              onClick={handleDismiss} className="text-white hover:text-gray-200 transition-colors">
              <X className="h-4 w-4" />
              </motion.button>
              )}
            </div>
              </div>
              </motion.div>
      )}
    </AnimatePresence>
  );
}

// Predefined banner configurations
export const BANNER_CONFIGS = {
  FREE_SHIPPING: {
    type: 'shipping' as const,
    title: 'Free Shipping',
    message: 'Free shipping on all orders over £50',
    ctaText: 'Shop Now',
    ctaLink: '/products',
  },
  SUMMER_SALE: {
    type: 'sale' as const,
    title: 'Summer Sale',
    message: 'Up to 50% off on selected jewelry',
    ctaText: 'View Sale',
    ctaLink: '/sale',
  },
  SECURITY: {
    type: 'security' as const,
    title: 'Secure Shopping',
    message: 'SSL encrypted payments & secure checkout',
    ctaText: 'Learn More',
    ctaLink: '/security',
  },
  NEW_COLLECTION: {
    type: 'announcement' as const,
    title: 'New Collection',
    message: 'Discover our latest jewelry collection',
    ctaText: 'Explore',
    ctaLink: '/new-arrivals',
  },
};

// Banner manager component
export function BannerManager() {
  const [currentBanner, setCurrentBanner] = useState<any>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const banners = Object.values(BANNER_CONFIGS);
    setCurrentBanner(banners[bannerIndex]);

    // Rotate banners every 30 seconds
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [bannerIndex]);

  if (!currentBanner) return null;

  return (
    <PromotionalBanner
      {...currentBanner}
      autoHide={false}
      dismissible={true}
    />
  );
}
