'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);

        // Fetch profile and orders in parallel
        const [profileResponse, ordersResponse] = await Promise.all([
          fetch('/api/account/profile'),
          fetch('/api/account/orders')
        ]);

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData.profile);
        }

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders);
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.email]);

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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-gold-50 rounded-2xl shadow-lg border border-amber-100 p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold-200/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-gold-700 bg-clip-text text-transparent">
              Welcome back, {profile?.firstName || session?.user?.name || 'there'}! ✨
            </h2>
            <p className="text-amber-700/80 mt-2">Your jewelry journey continues here</p>
          </div>
          <button onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-gold-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-gold-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{orders.length}</div>
            <div className="text-sm text-gray-600 font-medium">Total Orders</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="h-6 w-6 text-white">✓</div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Completed</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="h-6 w-6 text-white">£</div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              £{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Spent</div>
          </div>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-gold-600 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              Recent Orders
            </h3>
            <Link href="/account?tab=orders"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 hover:underline"
            >
              View All Orders
              <div className="w-4 h-4">→</div>
            </Link>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-6 border border-amber-100 rounded-xl bg-gradient-to-r from-amber-50/50 to-white hover:from-amber-100/50 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-gold-600 rounded-xl flex items-center justify-center shadow-md">
                    <Package className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{order.orderNumber}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 text-lg">£{order.total.toFixed(2)}</div>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-amber-50 via-white to-gold-50 rounded-2xl shadow-lg border border-amber-100 p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">Start your jewelry collection journey and discover our timeless pieces crafted with care</p>
            <Link href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-gold-600 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-gold-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Browse Our Collection
              <div className="w-4 h-4">→</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
        {orders.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">Start shopping to see your order history here</p>
            <Link href="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="bg-gradient-to-br from-amber-50 via-white to-gold-50 rounded-2xl shadow-lg border border-amber-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-gold-600 rounded-lg flex items-center justify-center">
          <Heart className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
      </div>
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Heart className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">Start collecting your favorite jewelry pieces and create your perfect wishlist</p>
        <Link href="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-gold-600 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-gold-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          Discover Jewelry
          <div className="w-4 h-4">→</div>
        </Link>
      </div>
    </div>
  );

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    phone: profile?.phone || ''
  });
  const [saving, setSaving] = useState(false);

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Refresh profile data
        const profileResponse = await fetch('/api/account/profile');
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData.profile);
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email"
                value={profile?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
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
                checked={profile?.preferences.emailNotifications}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">SMS Notifications</div>
                <div className="text-sm text-gray-600">Receive order updates via SMS</div>
              </div>
              <input type="checkbox"
                checked={profile?.preferences.smsNotifications}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Marketing Emails</div>
                <div className="text-sm text-gray-600">Receive promotional emails and offers</div>
              </div>
              <input type="checkbox"
                checked={profile?.preferences.marketingEmails}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 py-2 px-4 border border-red-200 rounded-lg hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

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
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-gold-700 bg-clip-text text-transparent">
                  My Account
                </h1>
                <p className="text-gray-600 text-xs">Manage your jewelry collection and preferences</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-gold-600 rounded-lg flex items-center justify-center shadow-md">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar */}
            <div className="lg:w-56">
              <div className="bg-gradient-to-br from-amber-50 via-white to-gold-50 rounded-xl shadow-md border border-amber-100 p-3">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-2 px-2 py-2 rounded-md text-left transition-all duration-200 ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-amber-500 to-gold-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-white/80 hover:shadow-sm'
                          }`}
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${activeTab === tab.id
                          ? 'bg-white/20'
                          : 'bg-gradient-to-br from-amber-100 to-gold-100'
                          }`}>
                          <Icon className={`h-3 w-3 ${activeTab === tab.id ? 'text-white' : 'text-amber-600'}`} />
                        </div>
                        <span className="font-medium text-xs">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {loading ? (
                <div className="bg-gradient-to-br from-amber-50 via-white to-gold-50 rounded-2xl shadow-lg border border-amber-100 p-8">
                  <div className="animate-pulse">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-gold-200 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-8 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-1/3"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/80 rounded-xl p-6 text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-gold-200 rounded-full mx-auto mb-3"></div>
                          <div className="h-8 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-1/2 mx-auto mb-2"></div>
                          <div className="h-4 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-3/4 mx-auto"></div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/80 rounded-xl p-6">
                      <div className="h-6 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-1/3 mb-4"></div>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-4 p-4 border border-amber-100 rounded-xl">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-gold-200 rounded-xl"></div>
                            <div className="flex-1">
                              <div className="h-5 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-1/2 mb-2"></div>
                              <div className="h-4 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-1/3"></div>
                            </div>
                            <div className="text-right">
                              <div className="h-5 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-16 mb-2"></div>
                              <div className="h-6 bg-gradient-to-r from-amber-200 to-gold-200 rounded w-20"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
