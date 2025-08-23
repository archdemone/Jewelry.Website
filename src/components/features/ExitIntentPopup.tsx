'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star } from 'lucide-react';
import Link from 'next/link';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasShownPopup = sessionStorage.getItem('exitIntentShown');
    if (hasShownPopup) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (hasShown) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative mx-4 w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl">
            {/* Close Button */}
            <button onClick={handleClose} className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-gray-600">
              <X className="h-6 w-6" />
              </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100">
              <Gift className="h-8 w-8 text-gold-600" />
              </div>

              {/* Title */}
              <h3 className="heading-primary mb-4 text-2xl text-charcoal-900">
                Wait! Don't Miss Out
              </h3>

              {/* Message */}
              <p className="body-text mb-6 text-gray-600">
                Get <strong>10% off</strong> your first order when you sign up for our newsletter.
                Plus, receive exclusive access to limited edition pieces.
              </p>

              {/* Benefits */}
              <div className="mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-current text-gold-500" />
              <span>Exclusive early access to new collections</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-current text-gold-500" />
              <span>Behind-the-scenes artisan stories</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-current text-gold-500" />
              <span>Special offers and limited editions</span>
              </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
              <Link href="/products"              onClick={handleClose} className="block w-full rounded-lg bg-gold-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gold-700">
                  Shop Now & Save 10%
                </Link>
              <button onClick={handleClose} className="block w-full rounded-lg px-6 py-2 text-gray-500 transition-colors duration-200 hover:text-gray-700">
                  Maybe Later
                </button>
              </div>
              </div>
              </motion.div>
              </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
