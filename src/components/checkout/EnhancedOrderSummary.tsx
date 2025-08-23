'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useCartStore } from '@/store/cart';
import { motion } from 'framer-motion';
import { Package, Truck, Shield, CreditCard, Clock } from 'lucide-react';
import { ProductImage } from '@/components/products/ProductImage';

interface EnhancedOrderSummaryProps {
  currentStep: number;
  isSubmitting: boolean;
}

export function EnhancedOrderSummary({ currentStep, isSubmitting }: EnhancedOrderSummaryProps) {
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
      <div className="bg-white rounded-lg shadow-sm border p-6">
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
      {/* Order Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-gold-600" />
          Order Summary
        </h3>

        {/* Items List */}
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <motion.div              key={item.productId}              initial={{ opacity: 0, x: -20 }}              animate={{ opacity: 1, x: 0 }}              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <ProductImage              src={item.image}              alt={item.name}
                  className="w-full h-full object-cover"              width={64}              height={64}
                />
                <div className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                £{(item.price * item.quantity).toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-3">
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
          
          <div className="flex justify-between text-lg font-semibold border-t pt-3">
            <span className="text-gray-900">Total</span>
            <span className="text-gold-600">£{total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Shipping Information */}
      {shipping && currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-gold-600" />
            Shipping Address
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{shipping.firstName} {shipping.lastName}</p>
            {shipping.company && <p>{shipping.company}</p>}
            <p>{shipping.address1}</p>
            {shipping.address2 && <p>{shipping.address2}</p>}
            <p>{shipping.city}, {shipping.state} {shipping.postalCode}</p>
            <p>{shipping.country}</p>
            {shipping.phone && <p>{shipping.phone}</p>}
          </div>
        </motion.div>
      )}

      {/* Shipping Method */}
      {shippingMethod && currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-gold-600" />
            Shipping Method
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{shippingMethod.name}</p>
              <p className="text-xs text-gray-500">{shippingMethod.description}</p>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {shippingMethod.price === 0 ? 'Free' : `£${shippingMethod.price.toFixed(2)}`}
            </span>
          </div>
        </motion.div>
      )}

      {/* Security & Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-gold-600" />
          Secure Checkout
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-500" />
            <span>SSL Encrypted Payment</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CreditCard className="h-4 w-4 text-blue-500" />
            <span>Secure Payment Processing</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>30-Day Money Back Guarantee</span>
          </div>
        </div>
      </motion.div>

      {/* Processing State */}
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gold-50 border border-gold-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-gold-500"></div>
            <div>
              <p className="text-sm font-medium text-gold-800">Processing your order...</p>
              <p className="text-xs text-gold-600">Please don't close this window</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center text-xs text-gray-500">
        <p>Need help? Contact us at support@jewelry.com</p>
        <p className="mt-1">or call +44 20 7946 0958</p>
      </div>
    </div>
  );
}
