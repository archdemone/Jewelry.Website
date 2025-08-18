'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const ringCollections = [
    { name: 'Engagement Rings', href: '/products?category=engagement-rings' },
    { name: 'Wedding Bands', href: '/products?category=wedding-bands' },
    { name: 'Eternity Rings', href: '/products?category=eternity-rings' },
    { name: 'Signet Rings', href: '/products?category=signet-rings' },
    { name: 'Statement Rings', href: '/products?category=statement-rings' },
    { name: 'Stackable Rings', href: '/products?category=stackable-rings' },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowCollections(false);
    }
  };

  const handleCollectionsToggle = () => {
    setShowCollections(!showCollections);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={handleMenuToggle}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
          >
            <nav className="p-4 space-y-2">
              <Link 
                href="/" 
                className="block py-3 px-4 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={handleMenuToggle}
              >
                Home
              </Link>
              
              <Link 
                href="/products" 
                className="block py-3 px-4 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={handleMenuToggle}
              >
                Products
              </Link>

              {/* Ring Collections Dropdown */}
              <div className="relative">
                <button
                  onClick={handleCollectionsToggle}
                  className="w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-expanded={showCollections}
                >
                  <span>Ring Collections</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${showCollections ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {showCollections && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1">
                        {ringCollections.map((collection) => (
                          <Link
                            key={collection.name}
                            href={collection.href}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={handleMenuToggle}
                          >
                            {collection.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/about-artisan" 
                className="block py-3 px-4 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={handleMenuToggle}
              >
                The Artisan
              </Link>
              
              <Link 
                href="/crafting-process" 
                className="block py-3 px-4 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={handleMenuToggle}
              >
                Process
              </Link>
              
              <Link 
                href="/contact" 
                className="block py-3 px-4 text-gray-700 hover:text-gold-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={handleMenuToggle}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
