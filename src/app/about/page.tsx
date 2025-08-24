import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us — J&M Jewelry',
  description:
    'Discover our story, mission, values, and craftsmanship behind timeless fine jewelry.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-gold-50 to-gold-100">
        <div className="absolute inset-0">
          <Image 
            src="/images/home/header1.webp"
            alt="J&M Jewelry workshop and craftsmanship"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 flex h-full items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="mb-6 font-serif text-5xl font-bold text-gray-900 md:text-6xl">
              Crafting Timeless Elegance
            </h1>
            <p className="text-xl leading-relaxed text-gray-700 md:text-2xl">
              Our jewelry is designed to celebrate life's most meaningful moments—crafted ethically
              with uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-12 md:grid-cols-2 items-center"
          >
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                Founded in 2010, J&M began as a small studio dedicated to responsible
                craftsmanship. Today, we serve customers worldwide while staying true to our roots.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                From sketch to finished piece, we obsess over every detail, ensuring each ring tells a story
                of love, commitment, and timeless beauty.
              </p>
              <Link 
                href="/crafting-process" 
                className="inline-flex items-center px-6 py-3 bg-gold-600 text-white font-medium rounded-lg hover:bg-gold-700 transition-colors"
              >
                Learn About Our Process
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-48 rounded-lg bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
                <span className="text-gold-600 font-medium">Workshop</span>
              </div>
              <div className="h-48 rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                <span className="text-stone-600 font-medium">Materials</span>
              </div>
              <div className="h-48 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-amber-600 font-medium">Craftsmanship</span>
              </div>
              <div className="h-48 rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                <span className="text-rose-600 font-medium">Quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Values, Craftsmanship */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 font-serif text-2xl font-bold text-gray-900">Mission</h3>
              <p className="text-gray-700">
                To craft meaningful pieces that last a lifetime, bringing beauty and joy to every moment.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 font-serif text-2xl font-bold text-gray-900">Values</h3>
              <p className="text-gray-700">
                Integrity, sustainability, transparency, and artistry guide everything we do.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 font-serif text-2xl font-bold text-gray-900">Craftsmanship</h3>
              <p className="text-gray-700">
                Every piece passes through skilled hands and rigorous quality checks.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality & Process */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2"
          >
            <div className="p-8 bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg">
              <h2 className="mb-6 font-serif text-3xl font-bold text-gray-900">Quality & Process</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold-600 text-white text-sm font-medium">1</span>
                  <span>Design & sketch</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold-600 text-white text-sm font-medium">2</span>
                  <span>Modeling & casting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold-600 text-white text-sm font-medium">3</span>
                  <span>Stone setting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold-600 text-white text-sm font-medium">4</span>
                  <span>Polishing & finishing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold-600 text-white text-sm font-medium">5</span>
                  <span>Final inspection</span>
                </li>
              </ol>
            </div>
            <div className="p-8 bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg">
              <h2 className="mb-6 font-serif text-3xl font-bold text-gray-900">Certifications & Awards</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-gold-600">✓</span>
                  <span>Responsible Jewelry Council (RJC) certified</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gold-600">✓</span>
                  <span>Ethical Sourcing Award 2023</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-gold-600">✓</span>
                  <span>Design Excellence Award 2024</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-gray-900">Our Milestones</h2>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { year: '2010', text: 'J&M was founded' },
                { year: '2015', text: 'Expanded to international shipping' },
                { year: '2020', text: 'Launched flagship store' },
                { year: '2024', text: 'Awarded for ethical sourcing' },
              ].map((m) => (
                <div key={m.year} className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-gold-600 mb-2">{m.year}</div>
                  <div className="text-gray-700">{m.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">15+</div>
                <div className="text-gray-600">Years in Business</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">50k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold-600 mb-2">100%</div>
                <div className="text-gray-600">Ethically Sourced</div>
              </div>
            </div>
            <div className="mt-12">
              <Link 
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-gold-600 text-white font-medium rounded-lg hover:bg-gold-700 transition-colors text-lg"
              >
                Shop the Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
