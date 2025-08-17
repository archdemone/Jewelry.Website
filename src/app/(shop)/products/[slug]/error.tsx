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
        <div className="text-6xl mb-4">💍</div>
        <h1 className="text-2xl font-[var(--font-serif)] font-bold mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't load this product. It might have been removed or the link might be incorrect.
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="bg-primary hover:opacity-90"
          >
            Try again
          </Button>
          
          <Button
            variant="outline"
            asChild
          >
            <Link href="/products">
              Browse all products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
