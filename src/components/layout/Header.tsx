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
      router.push(`/products?q=${encodeURIComponent(q)}`);
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
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-text hover:text-secondary" data-testid="nav-home">
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm text-text hover:text-secondary"
            data-testid="nav-products"
          >
            Products
          </Link>

          {/* Ring Collections Dropdown */}
          <div
            className="relative"
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
            <button className="flex items-center gap-1 text-sm text-text hover:text-secondary">
              Ring Collections
              <ChevronDown className="h-4 w-4" />
            </button>

            {showRingCollections && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-white shadow-lg">
                {ringCollections.map((collection) => (
                  <Link
                    key={collection.name}
                    href={collection.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about-artisan"
            className="text-sm text-text hover:text-secondary"
            data-testid="nav-artisan"
          >
            The Artisan
          </Link>

          <Link
            href="/crafting-process"
            className="text-sm text-text hover:text-secondary"
            data-testid="nav-process"
          >
            Process
          </Link>

          <Link
            href="/contact"
            className="text-sm text-text hover:text-secondary"
            data-testid="nav-contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
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
