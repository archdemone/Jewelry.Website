'use client';

import React, { useEffect, useCallback } from 'react';
import { useCartStore } from '@/store/cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useCartStore((state) => state.hydrate);

  // Memoize the hydrate function to prevent unnecessary re-renders
  const memoizedHydrate = useCallback(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    memoizedHydrate();
  }, [memoizedHydrate]);

  return <>{children}</>;
}
