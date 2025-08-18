'use client';

import { Bell, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { AdminMobileSidebarButton } from '@/components/admin/AdminSidebar';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

export function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #1234 from John Doe - £299.00',
      type: 'success',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Silver Inlay Ring - Dark Red is running low (3 left)',
      type: 'warning',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'Review Posted',
      message: 'New 5-star review on Damascus Wedding Ring',
      type: 'info',
      time: '2 hours ago',
      read: true,
    },
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const colors = {
      info: 'bg-blue-100 text-blue-600',
      success: 'bg-green-100 text-green-600',
      warning: 'bg-yellow-100 text-yellow-600',
      error: 'bg-red-100 text-red-600',
    };
    return colors[type];
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <AdminMobileSidebarButton />
        <div className="font-semibold">Admin Dashboard</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={clsx(buttonVariants({ variant: 'ghost' }), 'relative')}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-50"
              >
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getNotificationIcon(notification.type)}`}>
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <X className="h-4 w-4 text-gray-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 border-t">
                    <Link
                      href="/admin/notifications"
                      className="block text-center text-sm text-blue-600 hover:text-blue-700"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
