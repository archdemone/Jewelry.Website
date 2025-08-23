'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Truck, Clock, Shield } from 'lucide-react';

const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '3-5 business days',
    price: 0,
    icon: Truck,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '1-2 business days',
    price: 9.99,
    icon: Clock,
  },
  {
    id: 'premium',
    name: 'Premium Shipping',
    description: 'Next day delivery',
    price: 19.99,
    icon: Shield,
  },
];

export function ShippingMethodSelector() {
  const { register, watch } = useFormContext<any>();
  const selectedMethod = watch('shippingMethod');

  return (
    <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Shipping Method</h3>
              </div>
              <div className="space-y-3">
        {shippingMethods.map((method, index) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <motion.div              key={method.id}              initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: index * 0.1 }}
            >
              <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-gold-300 transition-colors">
              <input
                  {...register('shippingMethod')}
                  type="radio"              value={method.id}
                  className="sr-only"
                />
              <div className={`flex items-center justify-center w-5 h-5 border-2 rounded-full mr-4 ${ isSelected ? 'border-gold-500 bg-gold-500' : 'border-gray-300' }`}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-full bg-gray-100">
              <Icon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
              <h4 className="font-medium text-gray-900">{method.name}</h4>
              <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              <div className="text-right">
              <span className="font-medium text-gray-900">
                      {method.price === 0 ? 'Free' : `£${method.price.toFixed(2)}`}
                    </span>
              </div>
              </div>
              </label>
              </motion.div>
          );
        })}
      </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Free Standard Shipping</p>
              <p>All orders over £50 qualify for free standard shipping within the UK.</p>
              </div>
              </div>
              </div>
              </div>
  );
}
