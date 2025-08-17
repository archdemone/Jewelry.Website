'use client';

import { useState } from 'react';
import { getEstimatedDeliveryDate, formatCurrency } from '@/lib/checkout/checkout-utils';

export const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 9.99,
    estimatedDays: 7,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 19.99,
    estimatedDays: 3,
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 39.99,
    estimatedDays: 1,
  },
];

type Props = {
  value?: string;
  onChange?: (id: string) => void;
};

export default function ShippingMethods({ value, onChange }: Props) {
  const [notes, setNotes] = useState('');
  const [insurance, setInsurance] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  return (
    <div className="space-y-4">
      {shippingMethods.map((m) => {
        const checked = value === m.id;
        return (
          <label key={m.id} className="flex cursor-pointer items-start gap-3 rounded-md border p-4">
            <input
              type="radio"
              name="shippingMethod"
              checked={checked}
              onChange={() => onChange?.(m.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {m.description} • Est. {getEstimatedDeliveryDate(m.estimatedDays)}
                  </p>
                </div>
                <p className="font-medium">{formatCurrency(m.price)}</p>
              </div>
            </div>
          </label>
        );
      })}

      <div className="space-y-3 rounded-md border p-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={insurance}
            onChange={(e) => setInsurance(e.target.checked)}
          />
          <span>Add shipping insurance</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
          />
          <span>Add gift wrapping</span>
        </label>
        <div>
          <label className="mb-1 block text-sm font-medium">Special instructions</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border p-2"
            rows={3}
            placeholder="Delivery notes, gate code, etc."
          />
        </div>
      </div>
    </div>
  );
}
