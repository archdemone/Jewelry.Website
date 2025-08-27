'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedSearchInput } from '@/components/search/EnhancedSearchInput';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const ringCollections = [
    { name: "Women's Rings", href: '/products/womens' },
    { name: "Men's Rings", href: '/products/mens' },
    { name: 'Unisex Rings', href: '/products/unisex' },
    { name: 'Inlay Rings', href: '/products/inlay' },
    { name: 'Wedding Rings', href: '/products/wedding' },
    { name: 'Engagement Rings', href: '/products/engagement' },
    { name: 'Statement Rings', href: '/products/statement' },
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

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false); // Close mobile menu after search
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button 
        onClick={handleMenuToggle}
        className="p-2 text-gray-600 transition-colors hover:text-gray-900 touch-manipulation"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="true"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 bg-white shadow-lg max-h-[85vh] overflow-y-auto border-t border-gray-100"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Mobile Search */}
            <div className="p-3 border-b border-gray-100">
              <EnhancedSearchInput 
                placeholder="Search products..." 
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            
            <nav className="space-y-0">
              {/* Main Navigation Links */}
              <Link 
                href="/"
                className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                onClick={handleMenuToggle}
                aria-label="Go to home page"
              >
                Home
              </Link>
              
              <Link 
                href="/products"
                className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                onClick={handleMenuToggle}
                aria-label="Browse all products"
              >
                Products
              </Link>

              {/* Ring Collections Dropdown */}
              <div className="relative border-b border-gray-50">
                <button 
                  onClick={handleCollectionsToggle}
                  className="flex w-full items-center justify-between px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600"
                  aria-expanded={showCollections}
                  aria-haspopup="true"
                  aria-label="Ring Collections Menu"
                >
                  <span>Ring Collections</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${showCollections ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {showCollections && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }} 
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-gray-50"
                      role="menu"
                      aria-label="Ring Collections"
                    >
                      <div className="space-y-0">
                        {ringCollections.map((collection) => (
                          <Link 
                            key={collection.name} 
                            href={collection.href}
                            className="block px-6 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gold-600" 
                            onClick={handleMenuToggle}
                            role="menuitem"
                            aria-label={`Browse ${collection.name}`}
                          >
                            {collection.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Navigation Buttons */}
              <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/products/mens"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse men's rings"
                  >
                    Men's Rings
                  </Link>
                  <Link 
                    href="/products/womens"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse women's rings"
                  >
                    Women's Rings
                  </Link>
                  <Link 
                    href="/products/unisex"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse unisex rings"
                  >
                    Unisex Rings
                  </Link>
                  <Link 
                    href="/products/wedding"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse wedding rings"
                  >
                    Wedding Rings
                  </Link>
                  <Link 
                    href="/products/engagement"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse engagement rings"
                  >
                    Engagement Rings
                  </Link>
                  <Link 
                    href="/products/inlay"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse inlay rings"
                  >
                    Inlay Rings
                  </Link>
                  <Link 
                    href="/products/statement"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse statement rings"
                  >
                    Statement Rings
                  </Link>
                  <Link 
                    href="/products"
                    className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100 hover:text-gold-600" 
                    onClick={handleMenuToggle}
                    aria-label="Browse all rings"
                  >
                    All Rings
                  </Link>
                </div>
              </div>

              {/* About and Information Pages */}
              <Link 
                href="/about"
                className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                onClick={handleMenuToggle}
                aria-label="Learn about us"
              >
                About
              </Link>
              
              <Link 
                href="/about-artisan"
                className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                onClick={handleMenuToggle}
                aria-label="Learn about the artisan"
              >
                The Artisan
              </Link>
              
              <Link 
                href="/crafting-process"
                className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                onClick={handleMenuToggle}
                aria-label="Learn about our crafting process"
              >
                Crafting Process
              </Link>
              
              <Link 
                href="/contact"
                className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                onClick={handleMenuToggle}
                aria-label="Contact us"
              >
                Contact
              </Link>

              {/* User Account Section */}
              <div className="border-t border-gray-100">
                {session ? (
                  <div className="space-y-0">
                    <div className="px-4 py-3 bg-gray-50">
                      <p className="text-sm text-gray-600">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900">{session.user?.name || session.user?.email}</p>
                    </div>
                    <Link 
                      href="/account"
                      className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                      onClick={handleMenuToggle}
                      aria-label="My account"
                    >
                      My Account
                    </Link>
                    <Link 
                      href="/account/orders"
                      className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                      onClick={handleMenuToggle}
                      aria-label="My orders"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50"
                      aria-label="Sign out"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      signIn();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50"
                    aria-label="Sign in"
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Admin Panel Link - Only show if user is logged in */}
              {session && (
                <Link 
                  href="/admin"
                  className="block px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gold-600 border-b border-gray-50" 
                  onClick={handleMenuToggle}
                  aria-label="Access admin panel"
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Panel
                  </div>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
