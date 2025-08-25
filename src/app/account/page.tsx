'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useWishlistStore } from '@/store/wishlist';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { items: wishlistItems, removeItem, isHydrated: wishlistHydrated } = useWishlistStore();

  useEffect(() => {
    // Hydrate wishlist store
    const { hydrate } = useWishlistStore.getState();
    hydrate();
    
    // Mock data - in real app, fetch from API
    setProfile({
      id: 'user_1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+44 123 456 7890',
      dateOfBirth: '1990-01-01',
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
      },
    });

    setOrders([
      {
        id: 'order_1',
        orderNumber: 'ORD-2024-001',
        status: 'delivered',
        total: 299.99,
        items: [
          {
            id: 'item_1',
            name: 'Diamond Ring',
            quantity: 1,
            price: 299.99,
            image: '/images/products/ring-1.jpg',
          },
        ],
        createdAt: '2024-01-15',
        estimatedDelivery: '2024-01-20',
        trackingNumber: 'TRK123456789',
      },
      {
        id: 'order_2',
        orderNumber: 'ORD-2024-002',
        status: 'shipped',
        total: 199.99,
        items: [
          {
            id: 'item_2',
            name: 'Gold Necklace',
            quantity: 1,
            price: 199.99,
            image: '/images/products/necklace-1.jpg',
          },
        ],
        createdAt: '2024-01-20',
        estimatedDelivery: '2024-01-25',
        trackingNumber: 'TRK987654321',
      },
    ]);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Welcome back, {profile?.firstName}!</h2>
          <button onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              £{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {orders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{order.orderNumber}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">£{order.total.toFixed(2)}</div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/account?tab=orders"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">£{order.total.toFixed(2)}</div>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-600" />
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

              {order.trackingNumber && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Tracking Number</div>
                      <div className="text-sm text-gray-600">{order.trackingNumber}</div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Track Package
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Link href={`/account/orders/${order.id}`}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </Link>
                {order.status === 'delivered' && (
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => {
    if (!wishlistHydrated) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading wishlist...</p>
          </div>
        </div>
      );
    }

    if (wishlistItems.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4">Start adding items you love to your wishlist</p>
            <Link href="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
          <span className="text-sm text-gray-600">{wishlistItems.length} items</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">£{item.price.toFixed(2)}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        £{item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {item.badge && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          <Link href="/account/profile" className="text-blue-600 hover:text-blue-700 font-medium">
            Edit Profile
          </Link>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {profile?.firstName || 'Not set'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {profile?.lastName || 'Not set'}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {profile?.email || 'Not set'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {profile?.phone || 'Not set'}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive order updates via email</div>
            </div>
            <input type="checkbox"
              checked={profile?.preferences.emailNotifications || false}
              onChange={() => {}} // Read-only for now
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">SMS Notifications</div>
              <div className="text-sm text-gray-600">Receive order updates via SMS</div>
            </div>
            <input type="checkbox"
              checked={profile?.preferences.smsNotifications || false}
              onChange={() => {}} // Read-only for now
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Marketing Emails</div>
              <div className="text-sm text-gray-600">Receive promotional emails and offers</div>
            </div>
            <input type="checkbox"
              checked={profile?.preferences.marketingEmails || false}
              onChange={() => {}} // Read-only for now
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link href="/account/addresses" className="w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 py-2 px-4 border border-blue-200 rounded-lg hover:bg-blue-50">
            <Settings className="h-4 w-4" />
            <span>Manage Addresses</span>
          </Link>
          <Link href="/account/profile" className="w-full flex items-center justify-center space-x-2 text-green-600 hover:text-green-700 py-2 px-4 border border-green-200 rounded-lg hover:bg-green-50">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
          <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 py-2 px-4 border border-red-200 rounded-lg hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'orders':
        return renderOrders();
      case 'wishlist':
        return renderWishlist();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
