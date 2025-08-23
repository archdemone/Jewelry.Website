'use client';

import { useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import BlogCard from '@/components/features/BlogCard';
import { Input } from '@/components/ui/input';

const posts = [
  {
    slug: 'care-tips',
    title: 'Essential Jewelry Care Tips',
    excerpt: 'Keep your pieces shining with these simple care tips.',
    image: '/images/blog/care.jpg',
    date: 'Jan 5, 2025',
    category: 'Care',
  },
  {
    slug: 'ring-sizing',
    title: 'How to Find Your Ring Size',
    excerpt: 'A step-by-step guide to measuring your ring size accurately.',
    image: '/images/blog/size.jpg',
    date: 'Jan 2, 2025',
    category: 'Guides',
  },
];

const categories = ['All', 'Care', 'Guides'];

export default function BlogIndexPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (cat === 'All' || p.category === cat) &&
          (p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, cat],
  );
  return (
    <>
              <Header />
              <main className="container py-10">
              <section>
              <h1 className="text-3xl font-[var(--font-serif)] font-semibold text-secondary">
            Our Journal
          </h1>
              <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <Input placeholder="Search articles"              value={query}              onChange={(e) => setQuery(e.target.value)}
              className="md:max-w-sm"
            />
              <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button              key={c}              onClick={() => setCat(c)}              className={`rounded-full border px-3 py-1 text-sm ${cat === c ? 'bg-black text-white' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((p) => (
              <BlogCard key={p.slug} {...p} />
            ))}
          </div>
              </section>
              </main>
              <Footer />
              </>
  );
}
