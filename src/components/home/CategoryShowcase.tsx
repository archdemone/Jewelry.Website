'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 'engagement-rings',
      name: 'Engagement Rings',
      description: 'Timeless symbols of love and commitment',
      image: '/images/products/category-engagement-rings.jpg',
      href: '/products?category=engagement-rings',
      featured: true,
    },
    {
      id: 'wedding-bands',
      name: 'Wedding Bands',
      description: 'Elegant bands for your special day',
      image: '/images/products/category-wedding-bands.jpg',
      href: '/products?category=wedding-bands',
      featured: false,
    },
    {
      id: 'eternity-rings',
      name: 'Eternity Rings',
      description: 'Celebrate your everlasting love',
      image: '/images/products/category-eternity-rings.jpg',
      href: '/products?category=eternity-rings',
      featured: false,
    },
    {
      id: 'signet-rings',
      name: 'Signet Rings',
      description: 'Personalized pieces with meaning',
      image: '/images/products/category-signet-rings.jpg',
      href: '/products?category=signet-rings',
      featured: false,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl">Explore Our Collections</h2>
          <p className="text-xl text-gray-600">
            Discover handcrafted rings for every occasion and style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Link href={category.href} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  {category.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                {/* Fixed height container for content to prevent layout shifts */}
                <div className="flex flex-col justify-between p-6 h-[120px]">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <div className="mt-4 flex items-center text-orange-500 group-hover:text-orange-600">
                    <span className="font-medium">Explore Collection</span>
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
