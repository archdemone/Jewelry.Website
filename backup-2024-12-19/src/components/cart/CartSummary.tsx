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
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">£0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600 font-medium">-£0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping (by DPD)</span>
            <span className="text-green-600 font-medium">FREE</span>
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
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
      
      {/* Price Breakdown */}
      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600 font-medium">-£{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping (by DPD)</span>
          <span className="text-green-600 font-medium">FREE</span>
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
            <Shield className="w-4 h-4 mr-2" />
            Proceed to Checkout
          </Button>
        ) : (
          <>
            <Button className="w-full bg-gray-600 text-white" asChild>
              <Link href="/checkout">
                <Shield className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Link>
            </Button>
            
            {/* Google Pay Button */}
            <Button variant="outline" className="w-full border-black text-black hover:bg-gray-50" asChild>
              <Link href="/checkout">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
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
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Saving -£{discount.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
              <div className="bg-black h-1 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <div className="text-xs text-gray-500">22h:35m:54s</div>
          </div>
        </div>
      )}
    </div>
  );
}
