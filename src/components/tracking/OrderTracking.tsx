'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface OrderTrackingProps {
  orderNumber: string;
  trackingNumber?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery?: string;
}

export function OrderTracking({ 
  orderNumber, 
  trackingNumber, 
  status, 
  estimatedDelivery 
}: OrderTrackingProps) {
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock tracking data - in real app, fetch from shipping carrier API
    const mockEvents: TrackingEvent[] = [
      {
        id: '1',
        status: 'Order Placed',
        description: 'Your order has been confirmed and is being processed',
        location: 'Online Store',
        timestamp: '2024-01-20T10:00:00Z',
        isCompleted: true,
      },
      {
        id: '2',
        status: 'Processing',
        description: 'Your order is being prepared for shipment',
        location: 'Warehouse',
        timestamp: '2024-01-20T14:30:00Z',
        isCompleted: true,
      },
      {
        id: '3',
        status: 'Shipped',
        description: 'Your order has been shipped and is on its way',
        location: 'Shipping Center',
        timestamp: '2024-01-21T09:15:00Z',
        isCompleted: status === 'shipped' || status === 'delivered',
      },
      {
        id: '4',
        status: 'In Transit',
        description: 'Your package is being delivered to your address',
        location: 'Local Delivery',
        timestamp: '2024-01-22T11:45:00Z',
        isCompleted: status === 'delivered',
      },
      {
        id: '5',
        status: 'Delivered',
        description: 'Your package has been successfully delivered',
        location: 'Your Address',
        timestamp: estimatedDelivery ? new Date(estimatedDelivery).toISOString() : '2024-01-23T15:30:00Z',
        isCompleted: status === 'delivered',
      },
    ];

    setTrackingEvents(mockEvents);
    setIsLoading(false);
  }, [status, estimatedDelivery]);

  const getStatusColor = (isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return 'text-green-600 bg-green-100 border-green-300';
    if (isCurrent) return 'text-blue-600 bg-blue-100 border-blue-300';
    return 'text-gray-400 bg-gray-100 border-gray-300';
  };

  const getStatusIcon = (isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return CheckCircle;
    if (isCurrent) return Clock;
    return Package;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Tracking</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Order: {orderNumber}</span>
          {trackingNumber && (
            <>
              <span>•</span>
              <span>Tracking: {trackingNumber}</span>
            </>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900">Current Status</h3>
            <p className="text-sm text-blue-700 capitalize">{status}</p>
          </div>
          {estimatedDelivery && (
            <div className="text-right">
              <h3 className="font-medium text-blue-900">Estimated Delivery</h3>
              <p className="text-sm text-blue-700">
                {new Date(estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="space-y-6">
        {trackingEvents.map((event, index) => {
          const Icon = getStatusIcon(event.isCompleted, index === trackingEvents.findIndex(e => !e.isCompleted));
          const isCurrent = index === trackingEvents.findIndex(e => !e.isCompleted);
          
          return (
            <motion.div              key={event.id}              initial={{ opacity: 0, x: -20 }}              animate={{ opacity: 1, x: 0 }}              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              {/* Timeline Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusColor(event.isCompleted, isCurrent)}`}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{event.status}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Timeline Line */}
              {index < trackingEvents.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-200"></div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Delivery Information */}
      {status === 'shipped' && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Truck className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900">Package in Transit</h3>
              <p className="text-sm text-green-700 mt-1">
                Your package is on its way! You'll receive updates as it moves through our delivery network.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4" />
            <span>+44 123 456 7890</span>
          </div>
          <span>•</span>
          <span>support@jewelrystore.com</span>
        </div>
      </div>
    </div>
  );
}

// Order tracking page component
export function OrderTrackingPage({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock order data - in real app, fetch from API
    setTimeout(() => {
      setOrder({
        id: orderId,
        orderNumber: 'ORD-2024-001',
        trackingNumber: 'TRK123456789',
        status: 'shipped',
        estimatedDelivery: '2024-01-25',
        items: [
          {
            id: 'item_1',
            name: 'Diamond Ring',
            quantity: 1,
            price: 299.99,
            image: '/images/products/ring-1.jpg',
          },
        ],
        total: 299.99,
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address1: '123 Main St',
          city: 'London',
          postalCode: 'SW1A 1AA',
          country: 'United Kingdom',
        },
      });
      setIsLoading(false);
    }, 1000);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600">The order you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <OrderTracking              orderNumber={order.orderNumber}              trackingNumber={order.trackingNumber}              status={order.status}              estimatedDelivery={order.estimatedDelivery}
            />
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">£{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
              <div className="text-sm text-gray-600">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">£{item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
