import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  addedDate: string;
}

interface WishlistStore {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  isHydrated: boolean;
  
  // Actions
  addToWishlist: (item: Omit<WishlistItem, 'id' | 'addedDate'>) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  fetchWishlist: (userId: string) => Promise<void>;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      isHydrated: false,

      addToWishlist: async (item) => {
        set({ isLoading: true, error: null });
        
        try {
          const userId = 'current-user'; // This should come from auth context
          const response = await fetch('/api/wishlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              productId: item.productId,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to add to wishlist');
          }

          const { wishlistItem } = await response.json();
          
          set((state) => ({
            items: [...state.items, wishlistItem],
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add to wishlist',
            isLoading: false 
          });
        }
      },

      removeFromWishlist: async (productId) => {
        set({ isLoading: true, error: null });
        
        try {
          const userId = 'current-user'; // This should come from auth context
          const response = await fetch(`/api/wishlist?userId=${userId}&productId=${productId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to remove from wishlist');
          }

          set((state) => ({
            items: state.items.filter(item => item.productId !== productId),
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove from wishlist',
            isLoading: false 
          });
        }
      },

      fetchWishlist: async (userId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/wishlist?userId=${userId}`);
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch wishlist');
          }

          const { wishlist } = await response.json();
          
          set({ 
            items: wishlist || [],
            isLoading: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch wishlist',
            isLoading: false 
          });
        }
      },

      clearWishlist: () => {
        set({ items: [], error: null });
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId);
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);