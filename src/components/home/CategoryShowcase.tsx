'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 'mens-rings',
      name: "Mens Rings",
      description: 'Bold and sophisticated rings featuring Damascus steel, titanium, and premium materials for the modern man.',
      image: '/images/MyImages/category-signet-rings.jpg',
      href: '/products/mens#products-section',
      featured: false,
    },
    {
      id: 'womens-rings',
      name: "Womens Rings",
      description: 'Elegant rings crafted with precious metals and stunning gemstone inlays, perfect for every occasion.',
      image: '/images/MyImages/category-engagement-rings.jpg',
      href: '/products/womens#products-section',
      featured: true,
    },
    {
      id: 'unisex-rings',
      name: 'Unisex Rings',
      description: 'Versatile designs in carbon, ceramic, and lightweight materials perfect for any style preference.',
      image: '/images/MyImages/category-stackable-rings.jpg',
      href: '/products/unisex#products-section',
      featured: false,
    },
    {
      id: 'wedding-rings',
      name: 'Wedding Rings',
      description: 'Timeless wedding bands and engagement rings, crafted with love for your most precious moments.',
      image: '/images/MyImages/category-wedding-bands.jpg',
      href: '/products/wedding#products-section',
      featured: false,
    },
    {
      id: 'engagement-rings',
      name: 'Engagement Rings',
      description: 'Handcrafted engagement rings with ethically sourced diamonds and precious gemstones.',
      image: '/images/MyImages/category-engagement-rings.jpg',
      href: '/products/engagement#products-section',
      featured: false,
    },
    {
      id: 'inlay-rings',
      name: 'Inlay Rings',
      description: 'Handcrafted rings with beautiful gemstone inlays, each piece tells a unique story of craftsmanship.',
      image: '/images/MyImages/category-statement-rings.jpg',
      href: '/products/inlay#products-section',
      featured: false,
    },
    {
      id: 'statement-rings',
      name: 'Statement Rings',
      description: 'Bold designs that express your personality and make a lasting impression.',
      image: '/images/MyImages/category-statement-rings.jpg',
      href: '/products/statement#products-section',
      featured: false,
    },
    {
      id: 'all-rings',
      name: 'All Rings',
      description: 'Complete collection of handcrafted rings, from classic designs to contemporary masterpieces.',
      image: '/images/MyImages/category-eternity-rings.jpg',
      href: '/products#products-section',
      featured: false,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 font-serif text-5xl font-bold text-gray-900">
            Explore Our Collections
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Discover handcrafted rings for every occasion and style. Each piece tells a unique story of craftsmanship and beauty.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <Link href={category.href} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {category.featured && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-8">
                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
