'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, AlertCircle } from 'lucide-react';
import { ShippingMethodSelector } from './ShippingMethodSelector';
import { getStripe } from '@/lib/stripe';

interface EnhancedPaymentFormProps {
  onNext?: () => void;
  onBack?: () => void;
  isProcessing?: boolean;
  totalAmount?: number;
}

export function EnhancedPaymentForm({ 
  onNext, 
  onBack, 
  isProcessing = false, 
  totalAmount = 0 
}: EnhancedPaymentFormProps) {
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [paymentElement, setPaymentElement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await getStripe();
      setStripe(stripeInstance);
    };
    initializeStripe();
  }, []);

  const initializePaymentElement = async () => {
    if (!stripe || totalAmount <= 0) return;

    try {
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'gbp',
        }),
      });

      const { clientSecret, error: paymentError } = await response.json();

      if (paymentError) {
        throw new Error(paymentError);
      }

      const elementsInstance = stripe.elements({
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#3b82f6',
          },
        },
      });

      const paymentElementInstance = elementsInstance.create('payment');
      setElements(elementsInstance);
      setPaymentElement(paymentElementInstance);
    } catch (err: any) {
      console.error('Error initializing payment element:', err);
      setError(err.message || 'Failed to initialize payment');
    }
  };

  useEffect(() => {
    if (paymentMethod === 'stripe' && totalAmount > 0) {
      initializePaymentElement();
    }
  }, [paymentMethod, totalAmount, stripe]);

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      setError('Stripe is not initialized');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (onNext) {
        onNext();
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
              Secure Payment Processing
            </span>
              </div>
              <p className="text-sm text-blue-700 mt-2">
            Your payment information is encrypted and secure. We use Stripe for secure payment processing.
          </p>
              </div>
              <div className="space-y-4">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
              <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
              <input type="radio"
                  value="stripe"              checked={paymentMethod === 'stripe'}              onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
              <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Credit/Debit Card (Stripe)</span>
              </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer opacity-50">
              <input type="radio"
                  value="paypal"
                  disabled className="text-blue-600 focus:ring-blue-500"
                />
              <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">PayPal</span>
              <span className="text-xs text-gray-400">(Coming Soon)</span>
              </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer opacity-50">
              <input type="radio"
                  value="apple-pay"
                  disabled className="text-blue-600 focus:ring-blue-500"
                />
              <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Apple Pay</span>
              <span className="text-xs text-gray-400">(Coming Soon)</span>
              </div>
              </label>
              </div>
              </div>

          {paymentMethod === 'stripe' && paymentElement && (
            <div className="space-y-4">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Details
                </label>
              <div              ref={(el) => {
                    if (el && paymentElement) {
                      paymentElement.mount(el);
                    }
                  }}
                  className="border border-gray-300 rounded-md p-3"
                />
              </div>
              </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-red-600 text-sm">{error}</p>
              </div>
              </div>
          )}

          {paymentMethod === 'stripe' && !paymentElement && totalAmount > 0 && (
            <div className="text-sm text-gray-600">
              <p>Loading payment form...</p>
              </div>
          )}
        </div>
              </motion.div>

      {/* Shipping Method Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }} className="space-y-4">
              <ShippingMethodSelector />
              </motion.div>

      {/* Action Buttons */}
      {(onBack || onNext) && (
        <div className="flex justify-between">
          {onBack && (
            <button type="button"              onClick={onBack}              disabled={isLoading || isProcessing} className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              Back
            </button>
          )}
          {onNext && (
            <button type="button"              onClick={handlePaymentSubmit}              disabled={isLoading || isProcessing || !paymentElement} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Processing Payment...' : isProcessing ? 'Processing...' : 'Continue to Review'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
