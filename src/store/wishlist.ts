'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  originalPrice?: number;
  material?: string;
  gemColor?: string;
  category?: string;
  badge?: string;
}

interface WishlistState {
  items: WishlistItem[];
  hydrated: boolean;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  hydrate: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      
      addItem: (item: WishlistItem) => {
        const items = get().items;
        const existingItem = items.find(i => i.id === item.id);
        
        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (id: string) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      isInWishlist: (id: string) => {
        return get().items.some(item => item.id === id);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      hydrate: () => {
        set({ hydrated: true });
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);