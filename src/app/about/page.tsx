import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — J&M Jewelry',
  description:
    'Discover our story, mission, values, and the personal craftsmanship behind timeless fine jewelry.',
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
            Each piece is personally crafted by a master artisan, ensuring unique beauty and exceptional quality.
          </p>
          <div className="mt-8 h-64 w-full rounded-lg bg-gray-100" />
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Founded in 2010, J&M began as a small studio where every piece was crafted by hand with meticulous attention to detail. Today, we maintain that same personal approach—each ring passes through the hands of a single master artisan from start to finish.
            </p>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              From initial sketch to final polish, we believe in the power of individual craftsmanship to create truly exceptional jewelry.
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
              To create meaningful pieces that last a lifetime, crafted with personal attention and uncompromising standards.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Values</h3>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Integrity, sustainability, transparency, and the artistry of individual craftsmanship.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Craftsmanship</h3>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Every piece is personally inspected and finished by the same artisan who began its creation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold">The Artisan's Touch</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
            Our master artisan brings over 15 years of experience to every piece. Each ring is not just crafted—it's personally created with the same care and attention you'd expect from a family heirloom.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <div className="mx-auto h-32 w-32 rounded-full bg-gray-100" />
              <div className="mt-2 font-medium">Master Artisan</div>
              <div className="text-sm text-gray-600">15+ Years Experience</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="mx-auto h-32 w-32 rounded-full bg-gray-100" />
              <div className="mt-2 font-medium">Personal Attention</div>
              <div className="text-sm text-gray-600">One Artisan Per Piece</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="mx-auto h-32 w-32 rounded-full bg-gray-100" />
              <div className="mt-2 font-medium">Quality Guarantee</div>
              <div className="text-sm text-gray-600">Lifetime Craftsmanship</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold">Our Process</h2>
            <ol className="mt-3 list-inside list-decimal text-base leading-relaxed text-gray-700">
              <li>Personal consultation & design</li>
              <li>Hand-crafted modeling</li>
              <li>Precision stone setting</li>
              <li>Hand polishing & finishing</li>
              <li>Personal quality inspection</li>
            </ol>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold">Quality Assurance</h2>
            <ul className="mt-3 list-inside list-disc text-base leading-relaxed text-gray-700">
              <li>Responsible Jewelry Council (RJC) certified</li>
              <li>Ethical Sourcing Award 2023</li>
              <li>Design Excellence Award 2024</li>
              <li>Personal craftsmanship guarantee</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold">Our Journey</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { year: '2010', text: 'J&M was founded' },
              { year: '2015', text: 'Established personal workshop' },
              { year: '2020', text: 'Launched online presence' },
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
          <h2 className="text-2xl font-semibold">From Our Workshop</h2>
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
              <div className="text-sm text-gray-600">Years of Craftsmanship</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-gray-600">Pieces Personally Crafted</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-gray-600">Personal Attention</div>
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
