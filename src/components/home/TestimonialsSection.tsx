'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah & Michael',
      location: 'New York, NY',
      rating: 5,
      text: 'Our engagement ring is absolutely perfect! Working directly with the artisan made the whole experience so personal. He took our vision and created something beyond our dreams. The quality is incredible and knowing it was made by one person makes it even more special.',
      ring: 'Custom Diamond Engagement Ring',
    },
    {
      name: 'Jennifer',
      location: 'Los Angeles, CA',
      rating: 5,
      text: 'I wanted something unique for my wedding band, and the artisan delivered exactly what I envisioned. The hammered texture is beautiful and the fact that it was crafted by hand makes it feel so meaningful. I love telling people about the story behind my ring.',
      ring: 'Hammered Wedding Band',
    },
    {
      name: 'David & Emma',
      location: 'Chicago, IL',
      rating: 5,
      text: "We ordered matching eternity rings for our anniversary. The artisan was so patient with our questions and the rings are stunning. The craftsmanship is evident in every detail. We couldn't be happier with our choice to go with handcrafted rings.",
      ring: 'Matching Eternity Rings',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">
            Real stories from couples who chose handcrafted rings for their special moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative rounded-xl bg-gray-50 p-8"
            >
              {/* Quote Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500"
              >
                <Quote className="h-4 w-4 text-white" />
              </motion.div>

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="mb-6 italic text-gray-700">"{testimonial.text}"</p>

              {/* Ring Type */}
              <p className="mb-4 text-sm font-medium text-gold-600">{testimonial.ring}</p>

              {/* Customer Info */}
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-2xl bg-gold-50 p-8">
            <h3 className="mb-4 font-serif text-2xl">Join Our Happy Customers</h3>
            <p className="mb-6 text-gray-700">
              Every ring tells a story. Let us help you create yours with a handcrafted piece that
              will become part of your family's legacy.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gold-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Start Your Ring Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
