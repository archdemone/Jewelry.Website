'use client';

import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, CreditCard } from 'lucide-react';

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discount = subtotal * 0.1; // 10% discount
  const discountedSubtotal = subtotal - discount;
  const shipping = 0; // Free shipping
  const total = discountedSubtotal + shipping;
  const isEmpty = items.length === 0;

  if (!isHydrated) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h3>
              <div className="space-y-3 text-sm">
              <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">£0.00</span>
              </div>
              <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">-£0.00</span>
              </div>
              <div className="flex justify-between">
              <span className="text-gray-600">Shipping (by DPD)</span>
              <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-bold">
              <span>Total (VAT included)</span>
              <span>£0.00</span>
              </div>
              </div>
              </div>
              <Button className="mt-6 w-full bg-gray-600 text-white" disabled>
          Loading...
        </Button>
              </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h3>

      {/* Price Breakdown */}
      <div className="mb-6 space-y-3 text-sm">
              <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">-£{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
              <span className="text-gray-600">Shipping (by DPD)</span>
              <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-bold">
              <span>Total (VAT included)</span>
              <span>£{total.toFixed(2)}</span>
              </div>
              </div>
              </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {isEmpty ? (
          <Button className="w-full bg-gray-600 text-white" disabled>
              <Shield className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
        ) : (
          <>
              <Button className="w-full bg-gray-600 text-white" asChild>
              <Link href="/checkout">
              <Shield className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Link>
              </Button>

            {/* Google Pay Button */}
            <Button variant="outline"
              className="w-full border-black text-black hover:bg-gray-50" asChild>
              <Link href="/checkout">
              <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">G Pay</span>
              </div>
              <div className="flex items-center gap-2">
              <span className="text-sm">VISA</span>
              <span className="text-sm">.... 4911</span>
              </div>
              </div>
              </Link>
              </Button>
              </>
        )}
      </div>

      {/* Saving Information */}
      {!isEmpty && (
        <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="text-sm">
              <div className="mb-2 flex justify-between">
              <span className="font-medium">Saving -£{discount.toFixed(2)}</span>
              </div>
              <div className="mb-2 h-1 w-full rounded-full bg-gray-200">
              <div className="h-1 rounded-full bg-black" style={{ width: '10%' }}></div>
              </div>
              <div className="text-xs text-gray-500">22h:35m:54s</div>
              </div>
              </div>
      )}
    </div>
  );
}
