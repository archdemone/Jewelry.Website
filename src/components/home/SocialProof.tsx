'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Malton, UK',
      rating: 5,
      text: 'The craftsmanship is absolutely stunning. My engagement ring is perfect in every detail.',
      avatar: '/images/testimonials/sarah.jpg',
    },
    {
      name: 'Michael R.',
      location: 'Kirkbymoorside, UK',
      rating: 5,
      text: 'Exceptional quality and the artisan story makes it even more special. Highly recommend!',
      avatar: '/images/testimonials/michael.jpg',
    },
    {
      name: 'Emma L.',
      location: 'Pickering, UK',
      rating: 5,
      text: 'Beautiful, unique pieces that tell a story. The attention to detail is remarkable.',
      avatar: '/images/testimonials/emma.jpg',
    },
  ];

  const stats = [
    { number: '2,847', label: 'Happy Customers' },
    { number: '4.9', label: 'Average Rating' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Handcrafted' },
  ];

  return (
    <section className="bg-cream-50 py-16">
              <div className="container mx-auto px-4">
        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
 className="mb-16 text-center"
>
              <h2 className="heading-primary mb-4 text-3xl text-charcoal-900 md:text-4xl">
            Trusted by Thousands
          </h2>
              <p className="body-text mx-auto mb-12 max-w-2xl text-lg text-gray-600">
            Join thousands of satisfied customers who have chosen our handcrafted jewelry
          </p>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
 className="text-center"
>
              <div className="mb-2 text-3xl font-bold text-gold-600 md:text-4xl">
                  {stat.number}
                </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
              </motion.div>

        {/* Testimonials Section */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
 className="mb-12 text-center"
>
              <h3 className="heading-secondary mb-4 text-2xl text-charcoal-900 md:text-3xl">
            What Our Customers Say
          </h3>
              </motion.div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
 className="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
>
              <div className="mb-4 flex items-center">
              <Quote className="mr-3 h-8 w-8 text-gold-400" />
              <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="body-text mb-4 italic text-gray-700">"{testimonial.text}"</p>
              <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold-200">
              <span className="text-sm font-semibold text-gold-700">
                    {testimonial.name.charAt(0)}
                  </span>
              </div>
              <div>
              <div className="font-medium text-charcoal-900">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
              </div>
              </motion.div>
          ))}
        </div>
              </div>
              </section>
  );
};

export default SocialProof;
