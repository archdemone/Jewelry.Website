import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container grid gap-8 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-[var(--font-serif)] font-semibold text-secondary">
            Aurora Jewelry
          </h3>
          <p className="mt-2 text-sm text-gray-600">Timeless pieces crafted with care.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-secondary">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
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
          <h4 className="text-sm font-semibold text-secondary">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
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
          <h4 className="text-sm font-semibold text-secondary">Newsletter</h4>
          <p className="mt-3 text-sm text-gray-600">Join for exclusive offers.</p>
          <form className="mt-3 flex gap-2" aria-label="Footer newsletter signup">
            <label htmlFor="footer-newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoComplete="email"
            />
            <button className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Aurora Jewelry. All rights reserved.
      </div>
    </footer>
  );
}
