'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export type CookiePreferences = {
  nessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPrefs: CookiePreferences = { nessary: true, analytics: false, marketing: false };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPrefs);
  const [customizing, setCustomizing] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem('cookie_consent_choice');
      if (!choice) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function remember(choice: {
    type: 'accept_all' | 'reject_all' | 'custom';
    prefs?: CookiePreferences;
  }) {
    try {
      localStorage.setItem('cookie_consent_choice', JSON.stringify(choice));
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur">
      <div className="container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl text-sm">
          <strong>We use cookies.</strong> We use essential cookies to make our site work and
          optional analytics for a better experience. See our{' '}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setPrefs({ nessary: true, analytics: false, marketing: false });
              remember({ type: 'reject_all' });
            }}
          >
            Reject
          </Button>
          <Button onClick={() => remember({ type: 'accept_all' })}>Accept</Button>
          <Button variant="ghost" onClick={() => setCustomizing((v) => !v)}>
            Customize
          </Button>
        </div>
      </div>
      {customizing && (
        <div className="container pb-4">
          <div className="rounded-md border p-3 text-sm">
            <div className="flex items-center justify-between py-1">
              <span>Necessary</span>
              <input type="checkbox" checked readOnly />
            </div>
            <div className="flex items-center justify-between py-1">
              <span>Analytics</span>
              <input
                type="checkbox"              checked={prefs.analytics}              onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-1">
              <span>Marketing</span>
              <input
                type="checkbox"              checked={prefs.marketing}              onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
              />
            </div>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCustomizing(false)}>
                Cancel
              </Button>
              <Button onClick={() => remember({ type: 'custom', prefs })}>Save preferences</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
