'use client';

import { useCartStore } from '@/store/cart';
import CartItem from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';


export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);

  return (
    <main className="container py-10">
        <h1 className="text-2xl font-[var(--font-serif)] font-semibold text-secondary">
          Shopping Cart ({isHydrated ? itemCount : 0})
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {!isHydrated ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading cart...</p>
              </div>
            ) : items.length === 0 ? (
              <EmptyCart />
            ) : (
              items.map((i) => (
                <CartItem
                  key={i.productId}
                  id={i.productId}
                  name={i.name}
                  price={i.price}
                  image={i.image}
                  quantity={i.quantity}
                />
              ))
            )}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </main>
  );
}
