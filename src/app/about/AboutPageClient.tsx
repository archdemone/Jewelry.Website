'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  FileText,
  Gem,
  Hammer,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  MessageSquare,
} from 'lucide-react';

export default function AboutPageClient() {
  const storySections = [
    {
      id: 'story',
      title: 'Our Story',
      icon: Heart,
      content: {
        subtitle: 'From Passion to Profession',
        description: 'What began as a personal passion for creating beautiful jewelry has evolved into a thriving local business, serving our community with the same dedication and love for craftsmanship that started it all.',
        details: [
          'Started as a hobby in a small home workshop',
          'Grew through word-of-mouth recommendations',
          'Now a fully licensed and insured business',
          'Serving the local community with pride'
        ]
      }
    },
    {
      id: 'quality',
      title: 'Quality & Materials',
      icon: Gem,
      content: {
        subtitle: 'Premium Materials, Documented Quality',
        description: 'Every piece is crafted using only the finest materials, with full documentation and certification to ensure you know exactly what you\'re getting.',
        details: [
          'All materials come with certification documents',
          'Precious metals sourced from certified suppliers',
          'Gemstones with full traceability',
          'Quality guaranteed with written documentation'
        ]
      }
    },
    {
      id: 'craftsmanship',
      title: 'Solo Craftsmanship',
      icon: Hammer,
      content: {
        subtitle: 'One Artisan, Uncompromising Quality',
        description: 'Every piece is personally crafted by a single artisan, ensuring consistent quality and attention to detail that only comes from individual craftsmanship.',
        details: [
          'Single artisan handles every piece from start to finish',
          'No assembly line production',
          'Personal attention to every detail',
          'Consistent quality through individual care'
        ]
      }
    },
    {
      id: 'approval',
      title: 'Council Approved',
      icon: Award,
      content: {
        subtitle: 'Local District Council Approved',
        description: 'Our business operates with full approval from the local district council, meeting all safety, environmental, and business standards.',
        details: [
          'Fully licensed by local district council',
          'Meets all safety and environmental standards',
          'Regular inspections and compliance checks',
          'Approved for commercial jewelry production'
        ]
      }
    }
  ];

  const stats = [
    {
      number: '100%',
      label: 'Local Business',
      icon: MapPin,
      description: 'Proudly serving our local community'
    },
    {
      number: '1',
      label: 'Master Artisan',
      icon: Hammer,
      description: 'Every piece crafted by the same hands'
    },
    {
      number: '100%',
      label: 'Documented Quality',
      icon: FileText,
      description: 'Full certification for all materials'
    },
    {
      number: '5★',
      label: 'Council Rated',
      icon: Star,
      description: 'Fully approved and licensed'
    }
  ];

  const timeline = [
    {
      year: '2015',
      title: 'Metal Work Beginnings',
      description: 'Started experimenting with metal work and welding, developing foundational skills in metal manipulation and craftsmanship techniques.'
    },
    {
      year: '2018',
      title: 'Jewelry Crafting Interest Sparks',
      description: 'Interest in jewelry making ignited, began learning the intricate processes of creating wearable jewelry with first real rings and metalworking techniques.'
    },
    {
      year: '2020',
      title: 'First Handcrafted Gem Inlay Ring',
      description: 'Successfully created first handcrafted gem inlay ring that received family and friends approval, marking a significant milestone in craftsmanship development.'
    },
    {
      year: '2023',
      title: 'Skill Development & Health Challenges',
      description: 'Continued improving jewelry making skills and techniques, though faced some health-related setbacks that temporarily slowed progress for approximately 2 years.'
    },
    {
      year: '2025',
      title: 'Business Establishment Phase',
      description: 'Currently working with local council to transform this passion project into an established, licensed business with proper certifications and approvals.'
    }
  ];

  return (
    <main className="space-y-0">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute inset-0">
            <img
              src="/images/about/aboutheader.webp"
              alt="Artisan workshop header"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-[var(--font-serif)] font-bold mb-2"
              >
                About J&M
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl font-bold mb-4"
              >
                Jevgenijs Mironovs Jewelry Making
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg max-w-2xl mx-auto text-orange-400"
              >
                A local passion project turned thriving business, crafting quality jewelry with documented materials and council approval.
              </motion.p>
            </div>
          </div>
        </section >

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-gold-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Sections */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-[var(--font-serif)] font-bold mb-4">Our Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From a small home workshop to a council-approved business, discover how passion and quality drive everything we do.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {storySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gold-100 rounded-lg mr-4">
                      <section.icon className="h-6 w-6 text-gold-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>

                  <h4 className="text-lg font-medium text-gold-600 mb-3">{section.content.subtitle}</h4>
                  <p className="text-gray-600 mb-6">{section.content.description}</p>

                  <ul className="space-y-2">
                    {section.content.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-[var(--font-serif)] font-bold mb-4">Our Timeline</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From humble beginnings to a thriving local business - here's our journey.
              </p>
            </motion.div>

            {/* Desktop Timeline */}
            <div className="relative hidden md:block">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gold-200"></div>

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                        <div className="text-2xl font-bold text-gold-600 mb-2">{item.year}</div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-gold-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Mobile timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold-200"></div>

                  <div className="flex items-start gap-4 pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-2 z-10">
                      <div className="w-3 h-3 bg-gold-600 rounded-full border-2 border-white shadow-md"></div>
                    </div>

                    {/* Content */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex-1 min-w-0">
                      <div className="text-xl font-bold text-gold-600 mb-1">{item.year}</div>
                      <h3 className="text-base font-semibold mb-2 leading-tight">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-gold-50 to-amber-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-[var(--font-serif)] font-bold mb-4">Ready to Experience Quality Craftsmanship?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover our collection of handcrafted jewelry, each piece made with documented quality materials and council-approved standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition-colors flex items-center justify-center"
                  >
                    View Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-gold-600 text-gold-600 px-8 py-3 rounded-lg font-semibold hover:bg-gold-600 hover:text-white transition-colors flex items-center justify-center"
                  >
                    Get in Touch
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
