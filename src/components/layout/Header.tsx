'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, LogOut, ChevronDown, X } from 'lucide-react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { EnhancedSearchInput } from '@/components/search/EnhancedSearchInput';

export function Header() {
  const count = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!mounted) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gold-600">J&M Jewelry</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-gold-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gold-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gold-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <EnhancedSearchInput onSearch={handleSearch} />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gold-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">{session.user?.name || 'Account'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center space-x-1 text-gray-700 hover:text-gold-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Sign In</span>
              </button>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-700 hover:text-gold-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {isHydrated && count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-gray-700 hover:text-gold-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-gray-200 p-4">
        <EnhancedSearchInput onSearch={handleSearch} />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
              <nav className="mt-8 space-y-4">
                <Link href="/products" className="block text-gray-700 hover:text-gold-600">
                  Products
                </Link>
                <Link href="/about" className="block text-gray-700 hover:text-gold-600">
                  About
                </Link>
                <Link href="/contact" className="block text-gray-700 hover:text-gold-600">
                  Contact
                </Link>
                {session ? (
                  <>
                    <Link href="/account" className="block text-gray-700 hover:text-gold-600">
                      My Account
                    </Link>
                    <button onClick={handleSignOut} className="block w-full text-left text-gray-700 hover:text-gold-600">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => signIn()} className="block w-full text-left text-gray-700 hover:text-gold-600">
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
