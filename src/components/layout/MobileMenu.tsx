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
    console.log('Mobile menu toggle clicked, current state:', isOpen);
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
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setIsOpen(false);
  };

  return (
    <div className="md:hidden relative">
      {/* Mobile Menu Button */}
      <button
        onClick={handleMenuToggle}
        className="p-2 text-gray-600 transition-colors hover:text-gray-900 touch-manipulation bg-blue-100 border border-blue-300 rounded"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="true"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleMenuToggle}
            />

            {/* Menu Content */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 overflow-y-auto"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={handleMenuToggle}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <EnhancedSearchInput
                  placeholder="Search products..."
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>

              {/* Navigation */}
              <nav className="py-4">
                {/* Main Links */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gold-600"
                    onClick={handleMenuToggle}
                  >
                    Home
                  </Link>

                  <Link
                    href="/products"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gold-600"
                    onClick={handleMenuToggle}
                  >
                    Products
                  </Link>
                </div>

                {/* Ring Collections */}
                <div className="mt-4">
                  <button
                    onClick={handleCollectionsToggle}
                    className="flex w-full items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    <span>Ring Collections</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showCollections ? 'rotate-180' : ''}`} />
                  </button>

                  {showCollections && (
                    <div className="bg-gray-50">
                      {ringCollections.map((collection) => (
                        <Link
                          key={collection.name}
                          href={collection.href}
                          className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-100"
                          onClick={handleMenuToggle}
                        >
                          {collection.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Categories */}
                <div className="mt-4 px-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/products/mens"
                      className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                      onClick={handleMenuToggle}
                    >
                      Men's Rings
                    </Link>
                    <Link
                      href="/products/womens"
                      className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                      onClick={handleMenuToggle}
                    >
                      Women's Rings
                    </Link>
                    <Link
                      href="/products/unisex"
                      className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                      onClick={handleMenuToggle}
                    >
                      Unisex Rings
                    </Link>
                    <Link
                      href="/products/wedding"
                      className="block px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                      onClick={handleMenuToggle}
                    >
                      Wedding Rings
                    </Link>
                  </div>
                </div>

                {/* Info Pages */}
                <div className="mt-4 space-y-1">
                  <Link
                    href="/about"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gold-600"
                    onClick={handleMenuToggle}
                  >
                    About
                  </Link>

                  <Link
                    href="/about"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gold-600"
                    onClick={handleMenuToggle}
                  >
                    The Artisan
                  </Link>

                  <Link
                    href="/crafting-process"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gold-600"
                    onClick={handleMenuToggle}
                  >
                    Crafting Process
                  </Link>

                  <Link
                    href="/contact"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gold-600"
                    onClick={handleMenuToggle}
                  >
                    Contact
                  </Link>
                </div>

                {/* User Account */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  {session ? (
                    <div className="space-y-1">
                      <div className="px-4 py-2 bg-gray-50">
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p className="text-sm font-medium">{session.user?.name || session.user?.email}</p>
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={handleMenuToggle}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50"
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
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
