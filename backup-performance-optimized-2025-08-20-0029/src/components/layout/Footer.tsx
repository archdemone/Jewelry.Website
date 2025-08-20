import Link from 'next/link';

export function Footer() {
  return (
    <footer id="footer" className="border-t bg-gray-200">
      <div className="container grid gap-4 py-4 md:grid-cols-4">
        <div>
          <h3 className="text-base font-[var(--font-serif)] font-semibold text-secondary">
            J&M
          </h3>
          <p className="mt-1 text-xs text-gray-600">Timeless pieces crafted with care.</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-secondary">Quick Links</h4>
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
          <h4 className="text-xs font-semibold text-secondary">Legal</h4>
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
          <h4 className="text-xs font-semibold text-secondary">Newsletter</h4>
          <p className="mt-1 text-xs text-gray-600">Join for exclusive offers.</p>
          <form className="mt-1 flex gap-1" aria-label="Footer newsletter signup">
            <label htmlFor="footer-newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              autoComplete="email"
            />
            <button className="rounded-md bg-primary px-3 py-1 text-xs text-white hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t py-2 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} J&M. All rights reserved.
      </div>
    </footer>
  );
}
