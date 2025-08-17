'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Heart, Clock, MapPin, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Sparkles,
      title: 'Single Artisan Craftsmanship',
      description:
        'Every ring is personally crafted from start to finish by one master artisan, ensuring consistent quality and attention to detail.',
    },
    {
      icon: MapPin,
      title: 'Locally Sourced Materials',
      description:
        'We source all metals and gemstones from local, ethical suppliers, supporting our community and ensuring traceability.',
    },
    {
      icon: Heart,
      title: 'Personal Connection',
      description:
        'Work directly with the maker - no middlemen, no markup. Your vision becomes reality through direct collaboration.',
    },
    {
      icon: Clock,
      title: 'Timeless Crafting Process',
      description:
        'Each ring takes 2-6 weeks to craft, using traditional techniques passed down through generations of artisans.',
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description:
        'Every ring comes with a lifetime warranty, reflecting our confidence in the quality of our handcrafted pieces.',
    },
    {
      icon: Users,
      title: 'Family Tradition',
      description:
        "Three generations of ring making expertise, with each piece carrying the legacy of our family's commitment to excellence.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl">Why Choose Handcrafted Rings?</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            When you choose our handcrafted rings, you're not just buying jewelry - you're investing
            in a piece of art created with passion, tradition, and personal care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-xl bg-gray-50 p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
              >
                <reason.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-4xl rounded-2xl bg-orange-50 p-8"
        >
          <div className="text-center">
            <h3 className="mb-2 text-2xl font-semibold">Trusted by Hundreds of Couples</h3>
            <p className="font-medium text-orange-600">
              Every ring tells a story. Let us help you create yours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
