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
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.id === item.id);

        if (!existingItem) {
          console.log('WishlistStore: Adding item', item);
          const newItems = [...currentItems, item];
          set({ items: newItems });
          console.log('WishlistStore: Updated items array', newItems);
        } else {
          console.log('WishlistStore: Item already exists', item.id);
        }
      },

      removeItem: (id: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter(item => item.id !== id);
        console.log('WishlistStore: Removing item', id);
        set({ items: newItems });
      },

      isInWishlist: (id: string) => {
        const items = get().items;
        const result = items.some(item => item.id === id);
        console.log('WishlistStore: Checking if in wishlist', { id, result, itemsCount: items.length });
        return result;
      },

      clearWishlist: () => {
        console.log('WishlistStore: Clearing wishlist');
        set({ items: [] });
      },

      hydrate: () => {
        console.log('WishlistStore: Hydrating store');
        set({ hydrated: true });
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        console.log('WishlistStore: Rehydrated from storage', state);
      },
    }
  )
);
