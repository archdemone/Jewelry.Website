'use client';

import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  const isEmpty = items.length === 0;

  if (!isHydrated) {
    return (
      <div className="sticky top-24 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-secondary">Order Summary</h3>
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="mt-2 flex justify-between text-secondary">
            <span className="font-medium">Total</span>
            <span className="font-semibold">$0.00</span>
          </div>
        </div>
        <Button className="mt-4 w-full" disabled data-testid="checkout-button">
          Loading...
        </Button>
      </div>
    );
  }

  return (
    <div className="sticky top-24 rounded-lg border p-4">
      <h3 className="text-sm font-semibold text-secondary">Order Summary</h3>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex justify-between text-secondary">
          <span className="font-medium">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
      {isEmpty ? (
        <Button className="mt-4 w-full" disabled data-testid="checkout-button">
          Proceed to Checkout
        </Button>
      ) : (
        <Button className="mt-4 w-full" asChild>
          <Link href="/checkout" data-testid="checkout-button">
            Proceed to Checkout
          </Link>
        </Button>
      )}
    </div>
  );
}
