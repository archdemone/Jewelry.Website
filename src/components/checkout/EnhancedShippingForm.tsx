'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, User, MapPin, Phone, Building, CheckCircle, AlertCircle } from 'lucide-react';

export function EnhancedShippingForm() {
  const {
    register,
    formState: { errors, touchedFields },
    setValue,
    trigger,
    watch,
  } = useFormContext<any>();

  const [isValidating, setIsValidating] = useState(false);
  const [fieldStates, setFieldStates] = useState<Record<string, 'idle' | 'validating' | 'valid' | 'error'>>({});

  const watchedFields = useWatch({ 
    name: ['shipping.email', 'shipping.firstName', 'shipping.lastName', 'shipping.address1', 'shipping.city', 'shipping.postalCode'] 
  });

  // Real-time validation
  useEffect(() => {
    const validateField = async (fieldName: string, value: string) => {
      if (!value) {
        setFieldStates(prev => ({ ...prev, [fieldName]: 'idle' }));
        return;
      }

      setFieldStates(prev => ({ ...prev, [fieldName]: 'validating' }));
      
      try {
        await trigger(`shipping.${fieldName}`);
        const hasError = errors.shipping?.[fieldName];
        setFieldStates(prev => ({ 
          ...prev, 
          [fieldName]: hasError ? 'error' : 'valid' 
        }));
      } catch {
        setFieldStates(prev => ({ ...prev, [fieldName]: 'error' }));
      }
    };

    const timeoutId = setTimeout(() => {
      watchedFields.forEach((value, index) => {
        const fieldName = ['email', 'firstName', 'lastName', 'address1', 'city', 'postalCode'][index];
        if (fieldName) {
          validateField(fieldName, value);
        }
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [watchedFields, trigger, errors]);

  const getFieldIcon = (fieldName: string) => {
    const state = fieldStates[fieldName];
    
    if (state === 'validating') {
      return <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gold-500" />;
    }
    
    if (state === 'valid') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    if (state === 'error') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    return null;
  };

  const getFieldClassName = (fieldName: string, baseClass: string) => {
    const state = fieldStates[fieldName];
    const hasError = (errors.shipping as any)?.[fieldName];
    
    if (state === 'valid') {
      return `${baseClass} border-green-300 focus:border-green-500 focus:ring-green-500`;
    }
    
    if (hasError || state === 'error') {
      return `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-500`;
    }
    
    return `${baseClass} border-gray-300 focus:border-gold-500 focus:ring-gold-500`;
  };

  return (
    <div className="space-y-6">
      {/* Email Section */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
              <div className="relative">
              <input
              {...register('shipping.email')}
              type="email"
              placeholder="your@email.com"              className={getFieldClassName('email', 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors')}
                             data-error={!!(errors.shipping as any)?.email}
            />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getFieldIcon('email')}
            </div>
              </div>
                     {(errors.shipping as any)?.email && (
            <motion.p initial={{ opacity: 0, y: -10 }}              animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
                             {String((errors.shipping as any).email.message)}
            </motion.p>
          )}
        </div>
              </motion.div>

      {/* Personal Information */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="space-y-4">
              <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
              <div className="relative">
              <input
                {...register('shipping.firstName')}
                placeholder="John"              className={getFieldClassName('firstName', 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors')}
                                 data-error={!!(errors.shipping as any)?.firstName}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getFieldIcon('firstName')}
              </div>
              </div>
                         {(errors.shipping as any)?.firstName && (
              <motion.p initial={{ opacity: 0, y: -10 }}              animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
                                 {String((errors.shipping as any).firstName.message)}
              </motion.p>
            )}
          </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
              <div className="relative">
              <input
                {...register('shipping.lastName')}
                placeholder="Doe"              className={getFieldClassName('lastName', 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors')}
                                 data-error={!!(errors.shipping as any)?.lastName}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getFieldIcon('lastName')}
              </div>
              </div>
                         {(errors.shipping as any)?.lastName && (
              <motion.p initial={{ opacity: 0, y: -10 }}              animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
                                 {String((errors.shipping as any).lastName.message)}
              </motion.p>
            )}
          </div>
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
            Company (Optional)
          </label>
              <div className="relative">
              <input
              {...register('shipping.company')}
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
            />
              <Building className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              </div>
              </motion.div>

      {/* Address Information */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }} className="space-y-4">
              <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
              <div className="relative">
              <input
              {...register('shipping.address1')}
              placeholder="123 Main Street"              className={getFieldClassName('address1', 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors')}
                             data-error={!!(errors.shipping as any)?.address1}
            />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getFieldIcon('address1')}
            </div>
              </div>
                     {(errors.shipping as any)?.address1 && (
            <motion.p initial={{ opacity: 0, y: -10 }}              animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
                             {String((errors.shipping as any).address1.message)}
            </motion.p>
          )}
        </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
            Apartment, suite, etc. (Optional)
          </label>
              <input
            {...register('shipping.address2')}
            placeholder="Apt 4B"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
          />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
              <div className="relative">
              <input
                {...register('shipping.city')}
                placeholder="London"              className={getFieldClassName('city', 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors')}
                                 data-error={!!(errors.shipping as any)?.city}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getFieldIcon('city')}
              </div>
              </div>
                         {(errors.shipping as any)?.city && (
              <motion.p initial={{ opacity: 0, y: -10 }}              animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
                                 {String((errors.shipping as any).city.message)}
              </motion.p>
            )}
          </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province *
            </label>
              <input
              {...register('shipping.state')}
              placeholder="England"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
            />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
              <div className="relative">
              <input
                {...register('shipping.postalCode')}
                placeholder="SW1A 1AA"              className={getFieldClassName('postalCode', 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors')}
                                 data-error={!!(errors.shipping as any)?.postalCode}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getFieldIcon('postalCode')}
              </div>
              </div>
                         {(errors.shipping as any)?.postalCode && (
              <motion.p initial={{ opacity: 0, y: -10 }}              animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
                                 {String((errors.shipping as any).postalCode.message)}
              </motion.p>
            )}
          </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
              <select {...register('shipping.country')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors">
              <option value="">Select Country</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              </select>
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
              <div className="relative">
              <input
                {...register('shipping.phone')}
                type="tel"
                placeholder="+44 20 7946 0958"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
              />
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              </div>
              </div>
              </motion.div>

      {/* Additional Options */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }} className="space-y-4 pt-4 border-t">
              <div className="flex items-start gap-3">
              <input
            {...register('shipping.saveAddressForFuture')}
            type="checkbox"
            id="saveAddress"
            className="mt-1 h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
          />
              <label htmlFor="saveAddress" className="text-sm text-gray-700">
            Save this address for future purchases
          </label>
              </div>
              <div className="flex items-start gap-3">
              <input
            {...register('shipping.newsletter')}
            type="checkbox"
            id="newsletter"
            className="mt-1 h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
          />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
            Subscribe to our newsletter for exclusive offers and updates
          </label>
              </div>
              </motion.div>
              </div>
  );
}
