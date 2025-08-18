import { create } from 'zustand';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  material?: string;
  gemColor?: string;
  gemDensity?: string;
  gemVariation?: string;
  ringSize?: string;
  ringWidth?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isHydrated: boolean;
  hydrate: () => void;
};

// Create store with empty initial state to prevent hydration mismatch
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isHydrated: false,
  
  hydrate: () => {
    if (typeof window === 'undefined') return;
    
    try {
      const raw = localStorage.getItem('cart');
      const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
      set({ items, isHydrated: true });
    } catch {
      set({ items: [], isHydrated: true });
    }
  },

  addItem: (item, quantity = 1) => {
    const items = get().items;
    const existing = items.find((i) => i.productId === item.productId);
    let next: CartItem[];
    if (existing) {
      next = items.map((i) =>
        i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i,
      );
    } else {
      next = [...items, { ...item, quantity }];
    }
    set({ items: next });
    try {
      if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(next));
    } catch {}
  },
  
  removeItem: (productId) => {
    const next = get().items.filter((i) => i.productId !== productId);
    set({ items: next });
    try {
      if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(next));
    } catch {}
  },
  
  setQuantity: (productId, quantity) => {
    const next = get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
    set({ items: next });
    try {
      if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(next));
    } catch {}
  },
  
  clear: () => {
    set({ items: [] });
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('cart');
    } catch {}
  },
  
  get count() {
    return get().items.reduce((acc, i) => acc + i.quantity, 0);
  },
  
  get subtotal() {
    return Number(
      get()
        .items.reduce((acc, i) => acc + i.price * i.quantity, 0)
        .toFixed(2),
    );
  },
}));
