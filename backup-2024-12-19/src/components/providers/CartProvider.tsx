'use client';

import React, { useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
