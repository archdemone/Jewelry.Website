import { create } from 'zustand';
import { Product } from '@/types';

type WishlistItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  originalPrice?: number | null;
  material?: string;
  gemColor?: string;
  category?: string;
  badge?: string;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clear: () => void;
  count: number;
  isHydrated: boolean;
  hydrate: () => void;
};

// Create store with empty initial state to prevent hydration mismatch
export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  isHydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem('wishlist');
      const items = raw ? (JSON.parse(raw) as WishlistItem[]) : [];
      set({ items, isHydrated: true });
    } catch {
      set({ items: [], isHydrated: true });
    }
  },

  addItem: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.productId === item.productId);
    
    if (!existing) {
      const next = [...items, item];
      set({ items: next });
      try {
        if (typeof window !== 'undefined') localStorage.setItem('wishlist', JSON.stringify(next));
      } catch {}
    }
  },

  removeItem: (productId) => {
    const next = get().items.filter((i) => i.productId !== productId);
    set({ items: next });
    try {
      if (typeof window !== 'undefined') localStorage.setItem('wishlist', JSON.stringify(next));
    } catch {}
  },

  isInWishlist: (productId) => {
    return get().items.some((i) => i.productId === productId);
  },

  clear: () => {
    set({ items: [] });
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('wishlist');
    } catch {}
  },

  get count() {
    return get().items.length;
  },
}));