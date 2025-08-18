'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'New York',
      rating: 5,
      text: 'The craftsmanship is absolutely stunning. My engagement ring is perfect in every detail.',
      avatar: '/images/testimonials/sarah.jpg'
    },
    {
      name: 'Michael R.',
      location: 'Los Angeles',
      rating: 5,
      text: 'Exceptional quality and the artisan story makes it even more special. Highly recommend!',
      avatar: '/images/testimonials/michael.jpg'
    },
    {
      name: 'Emma L.',
      location: 'Chicago',
      rating: 5,
      text: 'Beautiful, unique pieces that tell a story. The attention to detail is remarkable.',
      avatar: '/images/testimonials/emma.jpg'
    }
  ];

  const stats = [
    { number: '2,847', label: 'Happy Customers' },
    { number: '4.9', label: 'Average Rating' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Handcrafted' }
  ];

  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl heading-primary text-charcoal-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg body-text text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen our handcrafted jewelry
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl heading-secondary text-charcoal-900 mb-4">
            What Our Customers Say
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-gold-400 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="body-text text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gold-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gold-700 font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-charcoal-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
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
