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

export function Header() {
  const count = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showRingCollections, setShowRingCollections] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!q) return;
    const t = setTimeout(() => {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    }, 500);
    return () => clearTimeout(t);
  }, [q, router]);

  const ringCollections = [
    { name: 'Engagement Rings', href: '/products?category=engagement-rings' },
    { name: 'Wedding Bands', href: '/products?category=wedding-bands' },
    { name: 'Eternity Rings', href: '/products?category=eternity-rings' },
    { name: 'Signet Rings', href: '/products?category=signet-rings' },
    { name: 'Statement Rings', href: '/products?category=statement-rings' },
    { name: 'Stackable Rings', href: '/products?category=stackable-rings' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-[var(--font-serif)] font-semibold text-secondary">
          Aurora Jewelry
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
            onMouseEnter={() => setShowRingCollections(true)}
            onMouseLeave={() => setShowRingCollections(false)}
          >
            <button
              className="flex items-center gap-1 text-sm text-text hover:text-secondary"
              data-testid="nav-ring-collections"
              onClick={() => router.push('/products')}
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
        {/* Mobile fallback link for Products (no test id to avoid duplicates) */}
        <Link href="/products" className="text-sm text-text hover:text-secondary md:hidden">
          Products
        </Link>
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
