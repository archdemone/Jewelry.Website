'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { showToast } from '@/components/ui/SimpleToast';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast('Please enter your email address', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message || 'Failed to subscribe', 'error');
      }
    } catch (error) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="bg-gray-200">
      <div className="container grid gap-4 py-4 md:grid-cols-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900" style={{
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '0.15em',
            fontWeight: '600',
            fontStyle: 'italic'
          }}>
            J&M
          </h3>
          <p className="mt-1 text-xs text-gray-600">Timeless pieces crafted with care.</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-gray-900">Quick Links</h4>
          <ul className="mt-1 space-y-0.5 text-xs">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-gray-900">Legal</h4>
          <ul className="mt-1 space-y-0.5 text-xs">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-gray-900">Newsletter</h4>
          <p className="mt-1 text-xs text-gray-600">Join for exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="mt-1 flex gap-1" aria-label="Footer newsletter signup">
            <label htmlFor="footer-newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-md border px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-gold-600 hover:bg-gold-700 disabled:bg-gray-400 px-3 py-1 text-xs text-white transition-colors"
            >
              {isSubmitting ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
      <div className="py-2 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} J&M. All rights reserved.
      </div>
    </footer>
  );
}
