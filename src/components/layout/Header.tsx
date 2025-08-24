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
  const [mounted, setMounted] = useState(false);
  const [showRingsDropdown, setShowRingsDropdown] = useState(false);
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

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.15em', fontWeight: '600', fontStyle: 'italic' }}>J&M</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Rings Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-gold-600 transition-colors"
                onMouseEnter={() => setShowRingsDropdown(true)}
                onMouseLeave={() => setShowRingsDropdown(false)}
              >
                <span>Rings</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 ${
                  showRingsDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setShowRingsDropdown(true)}
                onMouseLeave={() => setShowRingsDropdown(false)}
              >
                <div className="py-1">
                  <Link href="/products/womens#products-section" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Women's Rings
                  </Link>
                  <Link href="/products/mens#products-section" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Men's Rings
                  </Link>
                  <Link href="/products/wedding#products-section" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Wedding Rings
                  </Link>
                  <Link href="/products/inlay#products-section" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Inlay Rings
                  </Link>
                  <Link href="/products#products-section" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100">
                    View All Rings
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/crafting-process" className="text-gray-700 hover:text-gold-600 transition-colors">
              Crafting Process
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
              {mounted && isHydrated && count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
