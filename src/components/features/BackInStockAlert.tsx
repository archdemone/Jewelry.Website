'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function BackInStockAlert({ productId }: { productId: string }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Enter a valid email');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/stock-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email }),
      });
      if (!res.ok) throw new Error('failed');
      try {
        const raw = localStorage.getItem('stock_alerts') || '[]';
        const list = new Set<string>(JSON.parse(raw));
        list.add(`${productId}:${email}`);
        localStorage.setItem('stock_alerts', JSON.stringify(Array.from(list)));
      } catch {}
      toast.success('You will be notified when back in stock');
      setEmail('');
    } catch {
      toast.error('Could not subscribe right now');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
              <label className="text-sm">Notify me when available</label>
              <div className="flex gap-2">
              <Input type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
              <Button disabled={loading} onClick={subscribe}>
          {loading ? 'Subscribing…' : 'Notify me'}
        </Button>
              </div>
              <p className="text-xs text-gray-500">We respect your privacy.</p>
              </div>
  );
}
