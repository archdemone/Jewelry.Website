'use client';

import { motion } from 'framer-motion';

const WorkshopSection = () => {
  return (
    <section className="bg-stone-50 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl">From My Workshop to Your Finger</h2>
          <p className="text-xl text-gray-600">
            Every ring passes through these hands only - from raw material to finished piece
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Material Selection',
              description:
                'I personally source every piece of metal and stone from local, ethical suppliers',
              icon: '🏔️',
            },
            {
              title: 'Solo Craftsmanship',
              description:
                'No assistants, no factory - just one artisan ensuring perfection at every step',
              icon: '🔨',
            },
            {
              title: 'Direct Relationship',
              description: 'You work directly with me, the maker - no middlemen, no markup',
              icon: '🤝',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="rounded-xl bg-white p-8 shadow-lg"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
