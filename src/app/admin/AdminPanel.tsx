'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ProductEditor from '@/components/admin/ProductEditor';
import type { Product } from '@/types';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ShoppingBag,
  Settings,
  Package,
  Image as ImageIcon,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageFile {
  name: string;
  path: string;
  url: string;
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availableImages, setAvailableImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Dashboard state variables
  const [showDashboard, setShowDashboard] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: '£45,231.89',
    totalOrders: '145',
    totalCustomers: '1,234',
    conversionRate: '3.2%',
    activeProducts: '0',
    lowStockProducts: '0',
    pendingOrders: '0',
  });

  // Updated categories to match the new database
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'mens-rings', name: "Men's Rings" },
    { id: 'womens-rings', name: "Women's Rings" },
    { id: 'unisex-rings', name: 'Unisex Rings' },
    { id: 'wedding-rings', name: 'Wedding Rings' },
    { id: 'engagement-rings', name: 'Engagement Rings' },
    { id: 'inlay-rings', name: 'Inlay Rings' },
    { id: 'statement-rings', name: 'Statement Rings' },
  ];

  const materials = ['Silver', 'Damascus', 'Ceramic(white)', 'Ceramic(black)', 'Carbon', 'Tungsten', 'Titanium', 'Stainless Steel', 'Gold'];
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const gemDensities = ['small', 'medium', 'large'];
  const gemVariations = ['Dark', 'Mixed', 'Bright'];

  // Helper function to resolve image sources
  function resolveImageSrc(u: string) {
    if (!u) return '';
    if (/^https?:\/\//i.test(u)) return u;        // Blob URLs: pass through unchanged
    if (u.startsWith('/images/')) return u;       // Legacy paths: pass through unchanged
    return `/images/${String(u).replace(/^\/+/, '')}`; // Filenames: prepend /images/
  }

  // Normalize images from API response (handles both array and JSON string)
  function normalizeImages(x: unknown): string[] {
    if (Array.isArray(x)) return x as string[];
    if (typeof x === 'string') {
      try {
        const j = JSON.parse(x);
        return Array.isArray(j) ? j : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  useEffect(() => {
    loadProducts();
    loadImages();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        const normalizedProducts = data.map((product: any) => ({
          ...product,
          images: normalizeImages(product.images)
        }));
        setProducts(normalizedProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/images');
      if (response.ok) {
        const data = await response.json();
        setAvailableImages(data);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: 0,
      name: '',
      sku: '',
      slug: '',
      category: 'womens-rings',
      price: 0,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      ringSizes: { us: [6, 7, 8, 9], eu: [52, 54, 57, 59] },
      ringWidth: [4, 6, 8],
      isReadyToShip: false,
      isInStock: true,
      status: 'draft',
      images: [],
      isFeatured: false,
    });
    setIsAddingProduct(true);
  };

  const handleSave = (savedProduct: Product) => {
    // Update the products list with the saved product
    setProducts(prev => {
      const existingIndex = prev.findIndex(p => p.id === savedProduct.id);
      if (existingIndex >= 0) {
        // Update existing product
        const updated = [...prev];
        updated[existingIndex] = {
          ...savedProduct,
          images: normalizeImages(savedProduct.images)
        };
        return updated;
      } else {
        // Add new product
        return [...prev, {
          ...savedProduct,
          images: normalizeImages(savedProduct.images)
        }];
      }
    });

    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(prev => prev.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setShowDashboard(true)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${showDashboard
                ? 'border-gold-500 text-gold-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setShowDashboard(false)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${!showDashboard
                ? 'border-gold-500 text-gold-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Products
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showDashboard ? (
          /* Dashboard View */
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalRevenue}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCustomers}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.conversionRate}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={handleAddNew}
                  className="flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Manage Media
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Site Settings
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New product added</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New order received</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          /* Products View */
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600 mt-2">Manage your product catalog</p>
              </div>
              <Button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                    ? 'bg-gold-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100">
                    {product.images && product.images[0] ? (
                      <img
                        src={resolveImageSrc(product.images[0])}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isReadyToShip && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          Ready to Ship
                        </span>
                      )}
                      {product.status && (
                        <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                          product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                          {product.status}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                        className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="w-8 h-8 p-0 bg-red-500/90 hover:bg-red-500 text-white border-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.sku}</p>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-gray-900">£{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">£{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span>{product.material}</span>
                    </div>

                    {product.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        {product.reviews && (
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  {selectedCategory !== 'all' ? 'No products in this category.' : 'Get started by adding your first product.'}
                </p>
                <Button onClick={handleAddNew} className="bg-gold-600 hover:bg-gold-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Shared ProductEditor Modal */}
      <ProductEditor
        product={editingProduct || undefined}
        open={!!editingProduct || isAddingProduct}
        onClose={handleClose}
        onSaved={handleSave}
        mode="main"
      />
    </div>
  );
}
