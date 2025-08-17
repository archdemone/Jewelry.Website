'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function WishlistButton({ productId }: { productId: string }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('wishlist') || '[]';
      const ids = JSON.parse(raw) as string[];
      setActive(ids.includes(productId));
    } catch {}
  }, [productId]);
  function toggle() {
    try {
      const raw = localStorage.getItem('wishlist') || '[]';
      const ids = new Set<string>(JSON.parse(raw));
      if (ids.has(productId)) ids.delete(productId);
      else ids.add(productId);
      localStorage.setItem('wishlist', JSON.stringify(Array.from(ids)));
      setActive(!active);
    } catch {}
  }
  return (
    <button
      aria-pressed={active}
      onClick={toggle}
      className={`inline-flex items-center gap-1 text-sm ${active ? 'text-red-600' : 'text-gray-700'}`}
    >
      <Heart className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
      {active ? 'Wishlisted' : 'Wishlist'}
    </button>
  );
}
