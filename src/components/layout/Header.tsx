'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, LogOut, ChevronDown } from 'lucide-react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const count = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showRingCollections, setShowRingCollections] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

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
              }, 150); // 150ms delay before hiding
              setDropdownTimeout(timeout);
            }}
          >
            <button
              className="flex items-center gap-1 text-sm text-text hover:text-secondary"
              data-testid="nav-ring-collections"
              type="button"
            >
              Ring Collections
              <ChevronDown className="h-4 w-4" />
            </button>
            {showRingCollections && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 top-full mt-2 w-64 rounded-lg border bg-white py-2 shadow-lg"
              >
                {ringCollections.map((collection) => (
                  <Link
                    key={collection.name}
                    href={collection.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    {collection.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          <Link href="/about-artisan" className="text-sm text-text hover:text-secondary">
            The Artisan
          </Link>
          <Link href="/crafting-process" className="text-sm text-text hover:text-secondary">
            Process
          </Link>
          <Link href="/contact" className="text-sm text-text hover:text-secondary">
            Contact
          </Link>
        </nav>
        {/* Mobile Menu */}
        <MobileMenu />
        <div className="flex items-center gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button aria-label="Search" className="p-2 text-secondary hover:opacity-80">
                <Search className="h-5 w-5" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search rings</DialogTitle>
              </DialogHeader>
              <Input
                autoFocus
                placeholder="Search rings..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </DialogContent>
          </Dialog>
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="p-2 text-secondary hover:opacity-80"
                aria-label="Admin Panel"
                title="Admin Panel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
              <Link
                href="/account"
                className="p-2 text-secondary hover:opacity-80"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={() => signOut()}
                aria-label="Logout"
                className="p-2 text-secondary hover:opacity-80"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              aria-label="Account"
              className="p-2 text-secondary hover:opacity-80"
            >
              <User className="h-5 w-5" />
            </button>
          )}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative p-2 text-secondary hover:opacity-80"
            data-testid="cart-icon"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && isHydrated && count > 0 && (
              <span
                className="absolute -right-1 -top-1 inline-flex min-w-[1rem] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-white"
                data-testid="cart-count"
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
