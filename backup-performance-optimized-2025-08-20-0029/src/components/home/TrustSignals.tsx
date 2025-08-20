'use client';

import { Shield, Star, Truck, CreditCard, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSignals = () => {
  const trustItems = [
    {
      icon: Shield,
      text: 'Secure Checkout',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Star,
      text: '4.9/5 (2,847 reviews)',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Truck,
      text: 'Free Shipping',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CreditCard,
      text: '30-Day Returns',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Clock,
      text: 'Handcrafted to Order',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Award,
      text: 'Lifetime Warranty',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`rounded-full p-3 ${item.bgColor} mb-2 transition-transform duration-200 group-hover:scale-110`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <span className="text-xs font-medium leading-tight text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
