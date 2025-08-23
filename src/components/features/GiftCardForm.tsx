'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

const PRESETS = [50, 100, 200, 500];

export default function GiftCardForm() {
  const [amount, setAmount] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const addItem = useCartStore((s) => s.addItem);

  function addToCart() {
    const value = typeof amount === 'number' ? amount : Number(amount);
    if (!value || value < 10) {
              toast.error('Enter a valid amount (min £10)');
      return;
    }
    addItem({
      productId: `gift-${value}`,
      name: `Gift Card $${value}`,
      price: value,
      image: '/images/gift-card.png',
    });
    toast.success('Gift card added to cart');
  }

  return (
    <div className="grid gap-4">
      <div>
        <div className="text-sm font-medium">Choose amount</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button              key={p}              onClick={() => setAmount(p)}              className={`rounded-md border px-3 py-2 text-sm ${amount === p ? 'bg-black text-white' : ''}`}
            >
              ${p}
            </button>
          ))}
          <Input
            type="number"
            min={10}
            step={5}
            placeholder="Custom"
            value={amount}
            onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-28"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Recipient email</label>
        <Input
          type="email"
          placeholder="recipient@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Gift message</label>
        <Input
          placeholder="Optional"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Schedule delivery</label>
        <Input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />
      </div>
      <div className="text-xs text-gray-500">By purchasing, you agree to the gift card terms.</div>
      <Button onClick={addToCart}>Add Gift Card</Button>
    </div>
  );
}
