'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useCartStore } from '@/store/cart';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, FileText, CreditCard, Truck } from 'lucide-react';

export function EnhancedOrderReview() {
  const { items, subtotal, isHydrated } = useCartStore();
  const { watch } = useFormContext<any>();
  
  const shippingMethod = useWatch({ name: 'shippingMethod' });
  const shipping = useWatch({ name: 'shipping' });

  // Calculate totals
  const shippingCost = shippingMethod?.price || 0;
  const tax = subtotal * 0.20; // 20% VAT for UK
  const total = subtotal + shippingCost + tax;

  if (!isHydrated) {
    return (
      <div className="space-y-6">
              <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
              </div>
              </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-gold-600" />
          Order Summary
        </h3>
              <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div key={item.productId}              initial={{ opacity: 0, x: -20 }}              animate={{ opacity: 1, x: 0 }}              transition={{ delay: index * 0.1 }} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-medium">
                  {item.quantity}
                </div>
              <div>
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              </div>
              <div className="text-right">
              <p className="font-medium text-gray-900">£{(item.price * item.quantity).toFixed(2)}</p>
              </div>
              </motion.div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
              {shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}
            </span>
              </div>
              <div className="flex justify-between text-sm">
              <span className="text-gray-600">VAT (20%)</span>
              <span className="text-gray-900">£{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gold-600">£{total.toFixed(2)}</span>
              </div>
              </div>
              </motion.div>

      {/* Shipping Information */}
      {shipping && (
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-gold-600" />
            Shipping Information
          </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
              <div className="text-sm text-gray-600 space-y-1">
              <p>{shipping.firstName} {shipping.lastName}</p>
                {shipping.company && <p>{shipping.company}</p>}
                <p>{shipping.address1}</p>
                {shipping.address2 && <p>{shipping.address2}</p>}
                <p>{shipping.city}, {shipping.state} {shipping.postalCode}</p>
              <p>{shipping.country}</p>
                {shipping.phone && <p>{shipping.phone}</p>}
              </div>
              </div>
              <div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping Method</h4>
              <div className="text-sm text-gray-600">
              <p className="font-medium">{shippingMethod?.name || 'Standard Shipping'}</p>
              <p>{shippingMethod?.description || '3-5 business days'}</p>
              <p className="mt-2">
                  {shippingCost === 0 ? 'Free shipping' : `£${shippingCost.toFixed(2)}`}
                </p>
              </div>
              </div>
              </div>
              </motion.div>
      )}

      {/* Payment Information */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gold-600" />
          Payment Information
        </h3>
              <div className="text-sm text-gray-600">
              <p>Payment will be processed securely through our payment gateway.</p>
              <p className="mt-2">You will be redirected to complete your payment after placing the order.</p>
              </div>
              </motion.div>

      {/* Terms and Conditions */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">By placing this order, you agree to:</p>
              <ul className="space-y-1 list-disc list-inside">
              <li>Our terms and conditions</li>
              <li>Our privacy policy</li>
              <li>Our return and refund policy</li>
              </ul>
              </div>
              </div>
              </motion.div>

      {/* Important Notes */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important Information:</p>
              <ul className="space-y-1 list-disc list-inside">
              <li>Orders are processed within 24 hours</li>
              <li>You will receive an email confirmation</li>
              <li>Shipping tracking will be provided</li>
              <li>30-day money-back guarantee</li>
              </ul>
              </div>
              </div>
              </motion.div>
              </div>
  );
}
