'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';

export function AddToCartSection({
  productId,
  name,
  price,
  image,
}: {
  productId: string;
  name: string;
  price: number;
  image: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex items-center rounded-md border">
        <button
          type="button"
          className="px-3 py-2"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <input
          aria-label="Quantity"
          className="w-12 border-x px-2 py-2 text-center"
          value={qty}
          onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || '1', 10)))}
        />
        <button type="button" className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>
          +
        </button>
      </div>
      <Button
        size="lg"
        data-testid="add-to-cart"
        onClick={() => addItem({ productId, name, price, image }, qty)}
      >
        Add to cart
      </Button>
    </div>
  );
}
