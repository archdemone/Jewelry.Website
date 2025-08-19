'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

function getOrCreateCode(): string {
  try {
    const existing = localStorage.getItem('referral_code');
    if (existing) return existing;
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem('referral_code', code);
    return code;
  } catch {
    return 'AURORA';
  }
}

export default function ReferralProgram() {
  const [code, setCode] = useState('');
  const [refCount, setRefCount] = useState(0);
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    setCode(getOrCreateCode());
    try {
      const c = Number(localStorage.getItem('referral_count') || '0');
      setRefCount(c);
    } catch {}
    try {
      const r = Number(localStorage.getItem('referral_rewards') || '0');
      setRewards(r);
    } catch {}
  }, []);

  const url = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const u = new URL(window.location.origin);
    u.searchParams.set('ref', code);
    return u.toString();
  }, [code]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Referral link copied');
    } catch {
      toast.error('Copy failed');
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Aurora Jewelry', text: 'Save on your first order', url });
      } catch {}
    } else {
      copyLink();
    }
  }

  return (
    <div className="grid gap-4 rounded-lg border p-6">
      <h3 className="text-xl font-semibold">Refer friends, get rewards</h3>
      <p className="text-sm text-gray-600">
                        Share your unique code. Friends get 10% off. You earn £10 for each successful referral.
      </p>
      <div className="flex items-center gap-2">
        <div className="rounded-md border px-3 py-2 font-mono text-sm">{code}</div>
        <Button onClick={copyLink}>Copy link</Button>
        <Button variant="outline" onClick={share}>
          Share
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-md border p-3">
          <div className="text-gray-600">Referrals</div>
          <div className="text-2xl font-semibold">{refCount}</div>
        </div>
        <div className="rounded-md border p-3">
          <div className="text-gray-600">Rewards</div>
          <div className="text-2xl font-semibold">${rewards}</div>
        </div>
      </div>
      <div className="text-xs text-gray-500">By participating, you agree to the program terms.</div>
    </div>
  );
}
