'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Apple, Chrome } from 'lucide-react';

export default function ExpressCheckout() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Express Checkout</h3>
              </div>
              <div className="space-y-4">
              <div className="text-center">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Quick Payment Options</h4>
              <p className="text-gray-600 mb-6">
            Skip the form and pay securely with your preferred method.
          </p>
              </div>
        
        {/* Payment Method Buttons */}
        <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors" disabled>
              <Apple className="h-5 w-5" />
              <span>Apple Pay</span>
              <span className="text-xs text-gray-400">(Coming Soon)</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled>
              <Chrome className="h-5 w-5" />
              <span>Google Pay</span>
              <span className="text-xs text-gray-400">(Coming Soon)</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" disabled>
              <CreditCard className="h-5 w-5" />
              <span>PayPal</span>
              <span className="text-xs text-gray-400">(Coming Soon)</span>
              </button>
              </div>
              <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p>Express checkout will be available in the next phase.</p>
              <p className="mt-1">For now, please complete the form below.</p>
              </div>
              </div>
              </motion.div>
  );
}
