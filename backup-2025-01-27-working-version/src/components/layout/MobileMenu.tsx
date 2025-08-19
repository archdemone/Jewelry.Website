'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const ringCollections = [
    { name: "Women's Rings", href: '/products/womens' },
    { name: "Men's Rings", href: '/products/mens' },
    { name: 'Unisex Rings', href: '/products/unisex' },
    { name: 'Inlay Rings', href: '/products/inlay' },
    { name: 'Wedding Rings', href: '/products/wedding' },
    { name: 'All Rings', href: '/products' },
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
        className="p-2 text-gray-600 transition-colors hover:text-gray-900"
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
            className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white shadow-lg"
          >
            <nav className="space-y-2 p-4">
              <Link
                href="/"
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
                onClick={handleMenuToggle}
              >
                Home
              </Link>

              <Link
                href="/products"
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
                onClick={handleMenuToggle}
              >
                Products
              </Link>

              {/* Ring Collections Dropdown */}
              <div className="relative">
                <button
                  onClick={handleCollectionsToggle}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
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
                      <div className="space-y-1 pl-4">
                        {ringCollections.map((collection) => (
                          <Link
                            key={collection.name}
                            href={collection.href}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gold-600"
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
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
                onClick={handleMenuToggle}
              >
                The Artisan
              </Link>

              <Link
                href="/crafting-process"
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
                onClick={handleMenuToggle}
              >
                Process
              </Link>

              <Link
                href="/contact"
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
                onClick={handleMenuToggle}
              >
                Contact
              </Link>

              {/* Admin Panel Link - Only show if user is logged in */}
              <Link
                href="/admin"
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-t border-gray-100"
                onClick={handleMenuToggle}
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Panel
                </div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
