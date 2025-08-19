import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Aurora Jewelry',
  description:
    'Discover our story, mission, values, and craftsmanship behind timeless fine jewelry.',
};

export default function AboutPage() {
  return (
    <main className="container px-4 md:px-6">
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-[var(--font-serif)] font-bold">
            Crafting Timeless Elegance
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            Our jewelry is designed to celebrate life’s most meaningful moments—crafted ethically
            with uncompromising quality.
          </p>
          <div className="mt-8 h-64 w-full rounded-lg bg-gray-100" />
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Founded in 2010, Aurora began as a small studio dedicated to responsible
              craftsmanship. Today, we serve customers worldwide while staying true to our roots.
            </p>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              From sketch to finished piece, we obsess over every detail.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-40 rounded-md bg-gray-100" />
            <div className="h-40 rounded-md bg-gray-100" />
            <div className="h-40 rounded-md bg-gray-100" />
            <div className="h-40 rounded-md bg-gray-100" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-semibold">Mission</h3>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              To craft meaningful pieces that last a lifetime.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Values</h3>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Integrity, sustainability, transparency, and artistry.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Craftsmanship</h3>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Every piece passes through skilled hands and rigorous quality checks.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold">Meet the Team</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-4 text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-100" />
                <div className="mt-2 font-medium">Artisan {i + 1}</div>
                <div className="text-sm text-gray-600">Master Jeweler</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold">Quality & Process</h2>
            <ol className="mt-3 list-inside list-decimal text-base leading-relaxed text-gray-700">
              <li>Design & sketch</li>
              <li>Modeling & casting</li>
              <li>Stone setting</li>
              <li>Polishing & finishing</li>
              <li>Final inspection</li>
            </ol>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold">Certifications & Awards</h2>
            <ul className="mt-3 list-inside list-disc text-base leading-relaxed text-gray-700">
              <li>Responsible Jewelry Council (RJC) certified</li>
              <li>Ethical Sourcing Award 2023</li>
              <li>Design Excellence Award 2024</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold">Milestones</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { year: '2010', text: 'Aurora was founded' },
              { year: '2015', text: 'Expanded to international shipping' },
              { year: '2020', text: 'Launched flagship store' },
              { year: '2024', text: 'Awarded for ethical sourcing' },
            ].map((m) => (
              <div key={m.year} className="rounded-md border p-4">
                <div className="text-2xl font-bold">{m.year}</div>
                <div className="text-base text-gray-700">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold">From Our Instagram</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-md bg-gray-100" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-gray-600">Years in Business</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50k+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-gray-600">Ethically Sourced</div>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="/products"
              className="inline-block rounded-md bg-primary px-6 py-3 text-white hover:opacity-90"
            >
              Shop the Collection
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
