import { create } from 'zustand';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const initialItems: CartItem[] = (() => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cart');
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
})();

export const useCartStore = create<CartState>((set, get) => ({
  items: initialItems,
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
