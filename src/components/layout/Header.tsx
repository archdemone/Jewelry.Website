<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, LogOut, ChevronDown } from 'lucide-react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { EnhancedSearchInput } from '@/components/search/EnhancedSearchInput';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { motion } from 'framer-motion';
// import { MobileMenu } from './MobileMenu';

export function Header() {
  const count = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showRingCollections, setShowRingCollections] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (open && !target.closest('[aria-label="User menu"]') && !target.closest('.absolute')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const ringCollections = [
    { name: "Women's Rings", href: '/products/womens' },
    { name: "Men's Rings", href: '/products/mens' },
    { name: 'Unisex Rings', href: '/products/unisex' },
    { name: 'Inlay Rings', href: '/products/inlay' },
    { name: 'Wedding Rings', href: '/products/wedding' },
    { name: 'All Rings', href: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur" id="navigation" role="banner">
              <div className="container flex h-16 items-center justify-between">
              <Link href="/"
          className="text-4xl font-bold tracking-wider text-black"
          style={{
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '0.15em',
            fontWeight: '600',
            fontStyle: 'italic'
          }} aria-label="J&M Jewelry - Home">
          J&M
=======
'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, LogOut, ChevronDown } from 'lucide-react';
// import { useSession, signOut, signIn } from 'next-auth/react';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { motion } from 'framer-motion';
// import { MobileMenu } from './MobileMenu';

export function Header() {
  const count = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showRingCollections, setShowRingCollections] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  // const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  useEffect(() => {
    if (!q) return;
    const t = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }, 500);
    return () => clearTimeout(t);
  }, [q, router]);

  const ringCollections = [
    { name: "Women's Rings", href: '/products/womens' },
    { name: "Men's Rings", href: '/products/mens' },
    { name: 'Unisex Rings', href: '/products/unisex' },
    { name: 'Inlay Rings', href: '/products/inlay' },
    { name: 'Wedding Rings', href: '/products/wedding' },
    { name: 'All Rings', href: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-4xl font-bold tracking-wider text-black"
          style={{ 
            fontFamily: 'Playfair Display, serif', 
            letterSpacing: '0.15em',
            fontWeight: '600',
            fontStyle: 'italic'
          }}
        >
          J&M
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
        </Link>
              <nav className="hidden items-center gap-6 md:flex" role="navigation" aria-label="Main navigation">
              <Link href="/" className="text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors" data-testid="nav-home">
            Home
          </Link>
              <Link href="/products"
            className="text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors" data-testid="nav-products">
            Products
          </Link>

          {/* Ring Collections Dropdown */}
          <div className="relative"
            onMouseEnter={() => {
              if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
                setDropdownTimeout(null);
              }
              setShowRingCollections(true);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                setShowRingCollections(false);
              }, 200);
              setDropdownTimeout(timeout);
            }}
          >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors"
              aria-expanded={showRingCollections}
              aria-haspopup="true" aria-label="Ring Collections Menu">
              Ring Collections
              <ChevronDown className="h-4 w-4" />
              </button>

            {showRingCollections && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg"
                role="menu" aria-label="Ring Collections">
                {ringCollections.map((collection) => (
                  <Link key={collection.name}
                    href={collection.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" role="menuitem">
                    {collection.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
              <Link href="/about-artisan"
            className="text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors" data-testid="nav-artisan">
            The Artisan
          </Link>
              <Link href="/crafting-process"
            className="text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors" data-testid="nav-process">
            Process
          </Link>
              <Link href="/contact"
            className="text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors" data-testid="nav-contact">
            Contact
          </Link>
              </nav>
              <div className="flex items-center gap-4">
          {/* Enhanced Search */}
          <div className="hidden md:block">
              <EnhancedSearchInput placeholder="Search products..." onSearch={handleSearch}
              className="w-64"
            />
              </div>

          {/* Cart */}
          <Link href="/cart"
            className="relative flex items-center gap-2 rounded-full bg-gold-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-700"
            aria-label={`Shopping cart with ${mounted && isHydrated && count > 0 ? count : 0} items`}
          >
              <ShoppingBag className="h-4 w-4" />
            Cart
            {mounted && isHydrated && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {count}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {session ? (
            <div className="relative">
<<<<<<< HEAD
              <button onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                aria-label="User menu"
                aria-expanded={open}
                aria-haspopup="true"
              >
              <User className="h-4 w-4" />
                {session.user?.name || session.user?.email || 'Account'}
                <ChevronDown className="h-4 w-4" />
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-white shadow-lg">
              <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    {session.user?.email}
                  </div>
              <Link href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}
                  >
                    My Account
                  </Link>
                  {session.user?.email === 'admin@jewelry.com' && (
                    <Link href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
              <LogOut className="inline h-4 w-4 mr-2" />
                    Sign Out
                  </button>
              </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login"
              className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200" aria-label="Sign in to your account">
              <User className="h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
              </div>
              </header>
  );
}
=======
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-64 rounded-full border border-gray-300 bg-white px-10 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full bg-gold-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-700"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            {mounted && isHydrated && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {count}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <Link
            href="/auth/login"
            className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <User className="h-4 w-4" />
            Sign In
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
