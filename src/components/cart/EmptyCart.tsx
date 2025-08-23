import Link from 'next/link';

export function EmptyCart() {
  return (
    <div className="rounded-lg border p-8 text-center">
              <h2 className="text-xl font-[var(--font-serif)] font-semibold text-secondary">
        Your cart is empty
      </h2>
              <p className="mt-2 text-sm text-gray-700">
        Browse our collection to find something you love.
      </p>
              <Link href="/products" className="mt-4 inline-block rounded-md bg-secondary px-4 py-2 text-sm text-white hover:opacity-90">
        Continue Shopping
      </Link>
              </div>
  );
}
