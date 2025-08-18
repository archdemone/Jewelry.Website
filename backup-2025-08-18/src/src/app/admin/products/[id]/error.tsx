'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin product error:', error);
  }, [error]);

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-6xl mb-4">⚙️</div>
        <h1 className="text-2xl font-[var(--font-serif)] font-bold mb-4">
          Product Management Error
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't load this product for editing. It might have been removed or there might be a system error.
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
            <Link href="/admin/products">
              Back to products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
