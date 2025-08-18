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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-gold-600" />
              </div>

              {/* Title */}
              <h3 className="text-2xl heading-primary text-charcoal-900 mb-4">
                Wait! Don't Miss Out
              </h3>

              {/* Message */}
              <p className="body-text text-gray-600 mb-6">
                Get <strong>10% off</strong> your first order when you sign up for our newsletter. Plus, receive exclusive access to limited edition pieces.
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-gold-500 fill-current" />
                  <span>Exclusive early access to new collections</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-gold-500 fill-current" />
                  <span>Behind-the-scenes artisan stories</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-gold-500 fill-current" />
                  <span>Special offers and limited editions</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href="/products"
                  onClick={handleClose}
                  className="block w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gold-700 transition-colors duration-200"
                >
                  Shop Now & Save 10%
                </Link>
                <button
                  onClick={handleClose}
                  className="block w-full text-gray-500 py-2 px-6 rounded-lg hover:text-gray-700 transition-colors duration-200"
                >
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
