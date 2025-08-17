'use client';

import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="bg-orange-50 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
          >
            <Mail className="h-8 w-8 text-white" />
          </motion.div>

          <h2 className="mb-4 font-serif text-4xl">Stay Connected with the Artisan</h2>
          <p className="mb-8 text-xl text-gray-600">
            Be the first to see new ring designs, artisan stories, and exclusive offers. Join our
            community of ring lovers and get 10% off your first purchase.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
          >
            <label htmlFor="homepage-newsletter" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="homepage-newsletter"
              name="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-full border border-gray-300 px-6 py-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoComplete="email"
            />
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#EA580C' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Sparkles className="h-5 w-5" />
              Subscribe
            </motion.button>
          </motion.div>

          <p className="mt-4 text-sm text-gray-500">
            No spam, ever. Unsubscribe anytime. Your privacy is important to us.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-1 gap-6 text-sm md:grid-cols-3"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span>Early access to new designs</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span>Artisan workshop stories</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span>Exclusive member discounts</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
