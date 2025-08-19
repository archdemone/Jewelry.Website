'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 text-6xl">💍</div>
        <h1 className="mb-4 text-2xl font-[var(--font-serif)] font-bold">Product Not Found</h1>
        <p className="mb-6 text-gray-600">
          We couldn't load this product. It might have been removed or the link might be incorrect.
        </p>

        <div className="space-y-3">
          <Button onClick={reset} className="bg-primary hover:opacity-90">
            Try again
          </Button>

          <Button variant="outline" asChild>
            <Link href="/products">Browse all products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
