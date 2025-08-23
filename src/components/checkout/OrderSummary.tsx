'use client';

import { useMemo, useState } from 'react';
import { useCartStore } from '@/store/cart';
import {
  calculateShippingCost,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from '@/lib/checkout/checkout-utils';

export default function OrderSummary({ selectedShippingId }: { selectedShippingId?: string }) {
  const { items, subtotal, isHydrated } = useCartStore();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promo, setPromo] = useState('');

  const shipping = useMemo(
    () =>
      calculateShippingCost(
        selectedShippingId === 'standard'
          ? 9.99
          : selectedShippingId === 'express'
            ? 19.99
            : selectedShippingId === 'overnight'
              ? 39.99
              : 0,
        subtotal,
      ),
    [selectedShippingId, subtotal],
  );
  const tax = useMemo(() => calculateTax(subtotal, shipping), [subtotal, shipping]);
  const total = useMemo(() => calculateTotal(subtotal, shipping, tax), [subtotal, shipping, tax]);

  if (!isHydrated) {
    return (
      <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-md border p-4">
              <h3 className="mb-3 text-lg font-semibold">Order Summary</h3>
              <div className="py-4 text-center">
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="mt-2 text-sm text-gray-600">Loading...</p>
              </div>
              </div>
              </aside>
    );
  }

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-md border p-4">
              <h3 className="mb-3 text-lg font-semibold">Order Summary</h3>
              <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">× {item.quantity}</span>
              </div>
              <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
          ))}
        </div>
              <hr className="my-4" />
              <div className="space-y-2 text-sm">
              <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
              </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
              </div>
              </div>
              <div className="rounded-md border p-4">
              <button onClick={() => setPromoOpen((p) => !p)} className="text-sm font-medium underline">
          {promoOpen ? 'Hide' : 'Have a promo code?'}
        </button>
        {promoOpen && (
          <div className="mt-3 flex gap-2">
              <input              value={promo}              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter code"
              className="flex-1 rounded-md border p-2 text-sm"
            />
              <button className="rounded-md border px-3 text-sm">Apply</button>
              </div>
        )}
      </div>
              </aside>
  );
}
