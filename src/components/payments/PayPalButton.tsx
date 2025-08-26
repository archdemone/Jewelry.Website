'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

export function PayPalButton({ 
  amount, 
  currency = 'GBP', 
  onSuccess, 
  onError, 
  disabled = false 
}: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=disabled&currency=${currency}`;
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [currency]);

  const handlePayPalPayment = () => {
    if (!paypalLoaded || disabled) return;

    setIsLoading(true);

    // PayPal payment logic would go here
    // This is a placeholder for the actual PayPal integration
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess('paypal_payment_id');
      }
    }, 2000);
  };

  return (
    <motion.button whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handlePayPalPayment}
      disabled={disabled || isLoading || !paypalLoaded}
      className={`
        w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors
        ${disabled || isLoading || !paypalLoaded
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700' } `}>
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .653-.352 1.163-.844 1.478-.492.315-1.163.478-1.844.478H5.777c-.681 0-1.352-.163-1.844-.478C3.441 12.819 3.089 12.309 3.089 11.656c0-.653.352-1.163.844-1.478.492-.315 1.163-.478 1.844-.478h12.446c.681 0 1.352.163 1.844.478z"/>
              </svg>
      )}
      {isLoading ? 'Processing...' : `Pay with PayPal - £${amount.toFixed(2)}`}
    </motion.button>
  );
}
