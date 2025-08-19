'use client';

import { useCartStore } from '@/store/cart';
import CartItem from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import Link from 'next/link';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.count);
  const isHydrated = useCartStore((s) => s.isHydrated);

  return (
    <main className="min-h-screen bg-white">
      {/* Cart Content */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              {!isHydrated ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-gold-500"></div>
                  <p className="text-gray-600">Loading your cart...</p>
                </div>
              ) : items.length === 0 ? (
                <EmptyCart />
              ) : (
                <div className="space-y-6">
                  {/* Cart Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <h1 className="text-2xl font-bold text-gray-900">My Cart ({itemCount})</h1>
                      <span className="text-sm text-gray-600">
                        Estimated delivery time: 27-28 Aug. (by DPD)
                      </span>
                    </div>
                    <Link
                      href="/products"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-6">
                    {items.map((i) => (
                      <CartItem
                        key={i.productId}
                        id={i.productId}
                        name={i.name}
                        price={i.price}
                        image={i.image}
                        quantity={i.quantity}
                        material={i.material}
                        gemColor={i.gemColor}
                        gemDensity={i.gemDensity}
                        gemVariation={i.gemVariation}
                        ringSize={i.ringSize}
                        ringWidth={i.ringWidth}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
