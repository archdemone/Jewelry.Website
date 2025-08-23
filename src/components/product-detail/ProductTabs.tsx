'use client';

import { useState } from 'react';

export function ProductTabs({ description }: { description: string }) {
  const [tab, setTab] = useState<'desc' | 'specs' | 'care' | 'shipping'>('desc');
  return (
    <div className="mt-10">
              <div className="flex gap-4 border-b">
        {[
          { id: 'desc', label: 'Description' },
          { id: 'specs', label: 'Specifications' },
          { id: 'care', label: 'Care' },
          { id: 'shipping', label: 'Shipping & Returns' },
        ].map((t) => (
          <button key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`border-b-2 px-3 py-2 text-sm ${tab === t.id ? 'border-secondary text-secondary' : 'border-transparent text-gray-600'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
              <div className="mt-4 text-sm text-gray-700">
        {tab === 'desc' && <p>{description}</p>}
        {tab === 'specs' && (
          <ul className="list-inside list-disc space-y-1">
              <li>Material: See product details</li>
              <li>Dimensions: See product details</li>
              <li>Weight: Varies by size</li>
              </ul>
        )}
        {tab === 'care' && (
          <ul className="list-inside list-disc space-y-1">
              <li>Store in a dry place</li>
              <li>Avoid harsh chemicals</li>
              <li>Wipe with soft cloth</li>
              </ul>
        )}
        {tab === 'shipping' && (
                          <p>Free shipping on orders over £500. 30-day returns on eligible items.</p>
        )}
      </div>
              </div>
  );
}
