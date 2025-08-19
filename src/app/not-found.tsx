import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-6xl">🧭</div>
          <h1 className="mt-2 text-4xl font-[var(--font-serif)] font-bold">Page not found</h1>
          <p className="mt-2 text-gray-600">
            We can’t find the page you’re looking for. Try searching or explore popular categories.
          </p>
          <div className="mt-6">
            <input 
              type="text" 
              placeholder="Search products" 
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href="/products" className="rounded-md border p-4 text-left">
              Shop All Products
            </a>
            <a href="/care-guide" className="rounded-md border p-4 text-left">
              Care Guide
            </a>
            <a href="/size-guide" className="rounded-md border p-4 text-left">
              Size Guide
            </a>
            <a href="/faq" className="rounded-md border p-4 text-left">
              FAQ
            </a>
          </div>
          <div className="mt-6 text-sm">
            Need help?{' '}
            <a href="/contact" className="underline">
              Contact support
            </a>
          </div>
          <div className="mt-8">
            <a href="/" className="inline-block rounded-md bg-black px-6 py-3 text-white">
              Go home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
