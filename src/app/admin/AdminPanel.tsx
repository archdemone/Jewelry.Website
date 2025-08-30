'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  images?: string[];
  material: string;
  gemColor: string;
  gemDensity: string;
  gemVariation: string;
  mixColors: string[];
  category: string;
  subCategory?: string;
  ringSizes: { us: number[]; eu: number[] };
  ringWidth: number[];
  isReadyToShip: boolean;
  isInStock?: boolean;
  status?: 'active' | 'draft' | 'archived' | 'out_of_stock';
  currency?: 'GBP' | 'USD';
  rating?: number;
  reviews?: number;
  badge?: string;
  slug: string;
  description?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  sku?: string; // Added sku to the interface
  createdAt?: string; // Added createdAt to the interface
}

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
  const [hoveredGemColor, setHoveredGemColor] = useState<string | null>(null);
  const [hoveredGemColor2, setHoveredGemColor2] = useState<string | null>(null);
  const [hoveredMixColor, setHoveredMixColor] = useState<string | null>(null);
  const [hoveredMixColor2, setHoveredMixColor2] = useState<string | null>(null);

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

  // Helper functions for gem colors
  const getGemColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      'Red': '#dc2626',
      'Green': '#16a34a',
      'Blue': '#2563eb',
      'Purple': '#9333ea',
      'Yellow': '#ca8a04',
      'Custom': '#6b7280',
    };
    return colorMap[color] || '#6b7280';
  };

  const getGemColorImage = (color: string): string => {
    const colorMap: Record<string, string> = {
      'Red': '/images/gem-colors/red-gem.webp',
      'Green': '/images/gem-colors/green-gem.webp',
      'Blue': '/images/gem-colors/blue-gem.webp',
      'Purple': '/images/gem-colors/purple-gem.webp',
      'Yellow': '/images/gem-colors/yellow-gem.webp',
      'Custom': '/images/gem-colors/custom-gem.webp',
    };
    return colorMap[color] || '/images/gem-colors/custom-gem.webp';
  };

  // Image URL resolver for gallery images
  function resolveImageSrc(url: string) {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;       // Blob URL, use as-is
    return `/images/${url.replace(/^\/+/, '')}`;     // local file fallback
  }

  // Load products from the new Prisma database API
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      } else {
        console.error('Failed to load products');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load available images
  const loadAvailableImages = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/images');
      if (response.ok) {
        const data = await response.json();
        setAvailableImages(data.images || []);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadAvailableImages();
  }, [loadProducts, loadAvailableImages]);

  const handleAddProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      price: 0,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      category: 'mens-rings',
      ringSizes: { us: [6, 7, 8, 9], eu: [52, 54, 57, 59] },
      ringWidth: [4, 6, 8],
      isReadyToShip: false,
      isInStock: true,
      status: 'draft',
      images: [],
      isFeatured: false,
      slug: '',
    });
    setIsAddingProduct(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      const method = isAddingProduct ? 'POST' : 'PUT';
      const url = '/api/products';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        setEditingProduct(null);
        setIsAddingProduct(false);
        loadProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleFeatured = async (product: Product) => {
    const updatedProduct = {
      ...product,
      isFeatured: !product.isFeatured,
      featuredOrder: !product.isFeatured ? Date.now() : undefined,
    };

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const getRecentProducts = () => {
    return products
      .filter(p => p.status === 'active')
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 5);
  };

  const getLowStockProducts = () => {
    return products.filter(p => !p.isInStock || p.status === 'out_of_stock').slice(0, 5);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button
          onClick={() => setShowDashboard(!showDashboard)}
          variant="outline"
          className="flex items-center gap-2"
        >
          {showDashboard ? <BarChart3 className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
          {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
        </Button>
      </div>

      {showDashboard && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Edit className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ready to Ship</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.isReadyToShip).length}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Products */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Products</h3>
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="space-y-3">
                {getRecentProducts().map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-blue-600">£{product.price}</p>
                    </div>
                    <Button variant="ghost"
                      size="sm" onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {getRecentProducts().length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No products yet</p>
                )}
              </div>
            </Card>

            {/* Low Stock Alerts */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Low Stock Alerts</h3>
                <div className="flex h-6 w-6 items-center justify-center rounded bg-red-100">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div className="space-y-3">
                {getLowStockProducts().map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-red-50 border border-red-200">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-red-600">Out of stock</p>
                    </div>
                    <Button variant="ghost"
                      size="sm" onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {getLowStockProducts().length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">All products in stock</p>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button onClick={handleAddProduct}
                  className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
                <Button onClick={() => setSelectedCategory('all')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Package className="w-4 h-4 mr-2" />
                  View All Products
                </Button>
                <Button onClick={() => setSelectedCategory('inlay-rings')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Manage Inlay Rings
                </Button>
                <Button onClick={() => window.open('/admin/analytics', '_blank')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <button onClick={handleAddProduct} className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mb-6">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id
              ? 'bg-gold-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                {product.images && product.images[0] ? (
                  <Image src={product.images[0]} alt={product.name}
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">£{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">£{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded">{product.material}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{product.gemColor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or add a new product.</p>
          </div>
        )}
      </div>

      {/* Advanced Edit Modal - Updated Layout */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {isAddingProduct ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button onClick={() => {
                setEditingProduct(null);
                setIsAddingProduct(false);
              }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-140px)] overflow-hidden">
              {/* Left Column - Product Images */}
              <div className="w-1/3 p-6 border-r bg-gray-50 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>

                {/* Main Image Preview */}
                <div className="mb-6">
                  <div className="relative aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    {editingProduct.images && editingProduct.images[0] ? (
                      <img src={resolveImageSrc(editingProduct.images[0])} alt={editingProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No image selected</p>
                        </div>
                      </div>
                    )}
                    {editingProduct.isReadyToShip && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Ready to Ship
                      </div>
                    )}
                    {editingProduct.status && (
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${editingProduct.status === 'active' ? 'bg-green-100 text-green-800' :
                          editingProduct.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            editingProduct.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                              'bg-red-100 text-red-800'
                        }`}>
                        {editingProduct.status === 'active' ? 'Active' :
                          editingProduct.status === 'draft' ? 'Draft' :
                            editingProduct.status === 'archived' ? 'Archived' :
                              'Out of Stock'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Images Grid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Images</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {availableImages.map((image) => (
                      <button key={image.url} onClick={() => {
                        const newImages = editingProduct.images?.includes(image.url)
                          ? editingProduct.images.filter(img => img !== image.url)
                          : [...(editingProduct.images || []), image.url];
                        setEditingProduct({ ...editingProduct, images: newImages });
                      }} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${editingProduct.images?.includes(image.url)
                          ? 'border-gold-500 ring-2 ring-gold-200'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={resolveImageSrc(image.url)} alt={image.name}
                          className="w-full h-full object-cover"
                        />
                        {editingProduct.images?.includes(image.url) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="w-2/3 p-6 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Product Name & SKU - Side by Side */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <input type="text" value={editingProduct.sku || ''} onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category & Sub Category - Side by Side */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {categories.filter(cat => cat.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                    <input type="text" value={editingProduct.subCategory || ''} onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                      placeholder="e.g., Engagement, Anniversary"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  {/* Price & Original Price - Side by Side */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
                    <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (£)</label>
                    <input type="number" value={editingProduct.originalPrice || ''} onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  {/* Material - Full Width */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                    <select value={editingProduct.material} onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {materials.map((material) => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                  </div>

                  {/* Primary Gem Color & Mix Colors - Side by Side */}
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Gem Color</label>
                        <div className="grid grid-cols-3 gap-2">
                          {gemColors.map((color) => (
                            <button key={color}
                              type="button" onClick={() => setEditingProduct({ ...editingProduct, gemColor: color })} onMouseEnter={() => setHoveredGemColor(color)} onMouseLeave={() => setHoveredGemColor(null)} className={`relative rounded-lg border-2 p-3 transition-all ${editingProduct.gemColor === color
                                  ? 'border-gold-500 bg-gold-50'
                                  : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" style={{
                                  backgroundColor: getGemColorHex(color),
                                  aspectRatio: '1 / 1',
                                  minWidth: '16px',
                                  minHeight: '16px'
                                }}
                                />
                                <span className="text-sm font-medium">{color}</span>
                              </div>

                              {/* Gem Color Popup */}
                              {hoveredGemColor === color && (
                                <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform">
                                  <div className="rounded-lg border bg-white p-4 shadow-lg">
                                    <Image src={getGemColorImage(color)} alt={`${color} gem`} width={200} height={200}
                                      className="rounded object-cover" style={{ minWidth: '200px', minHeight: '200px' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mix Colors (for Custom option)</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                            <label key={color}
                              className="relative flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer" onMouseEnter={() => setHoveredMixColor(color)} onMouseLeave={() => setHoveredMixColor(null)}
                            >
                              <input type="checkbox" checked={editingProduct.mixColors?.includes(color) || false} onChange={(e) => {
                                const newMixColors = e.target.checked
                                  ? [...(editingProduct.mixColors || []), color]
                                  : (editingProduct.mixColors || []).filter(c => c !== color);
                                setEditingProduct({ ...editingProduct, mixColors: newMixColors });
                              }}
                                className="mr-2"
                              />
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{
                                  backgroundColor: getGemColorHex(color),
                                  aspectRatio: '1 / 1',
                                  minWidth: '16px',
                                  minHeight: '16px'
                                }}
                                />
                                <span className="text-sm truncate">{color}</span>
                              </div>

                              {/* Mix Color Popup */}
                              {hoveredMixColor === color && (
                                <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform">
                                  <div className="rounded-lg border bg-white p-4 shadow-lg">
                                    <Image src={getGemColorImage(color)} alt={`${color} gem`} width={200} height={200}
                                      className="rounded object-cover" style={{ minWidth: '200px', minHeight: '200px' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gem Density & Gem Variation - Side by Side */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gem Density</label>
                    <select value={editingProduct.gemDensity} onChange={(e) => setEditingProduct({ ...editingProduct, gemDensity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {gemDensities.map((density) => (
                        <option key={density} value={density}>{density}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gem Variation</label>
                    <select value={editingProduct.gemVariation} onChange={(e) => setEditingProduct({ ...editingProduct, gemVariation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {gemVariations.map((variation) => (
                        <option key={variation} value={variation}>{variation}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ring Sizes & Ring Width - Side by Side */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ring Sizes (US)</label>
                    <input type="text" value={editingProduct.ringSizes?.us?.join(', ') || ''} onChange={(e) => {
                      const sizes = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                      setEditingProduct({
                        ...editingProduct,
                        ringSizes: { ...editingProduct.ringSizes, us: sizes }
                      });
                    }}
                      placeholder="e.g., 5, 6, 7, 8, 9"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ring Sizes (EU)</label>
                    <input type="text" value={editingProduct.ringSizes?.eu?.join(', ') || ''} onChange={(e) => {
                      const sizes = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                      setEditingProduct({
                        ...editingProduct,
                        ringSizes: { ...editingProduct.ringSizes, eu: sizes }
                      });
                    }}
                      placeholder="e.g., 49, 52, 54, 57, 59"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ring Width (mm)</label>
                    <input type="text" value={editingProduct.ringWidth?.join(', ') || ''} onChange={(e) => {
                      const widths = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                      setEditingProduct({ ...editingProduct, ringWidth: widths });
                    }}
                      placeholder="e.g., 2, 3, 4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  {/* Status - Side by Side with Ring Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={editingProduct.status || 'draft'} onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Ready to Ship & In Stock - Side by Side */}
                  <div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox"
                        id="readyToShip" checked={editingProduct.isReadyToShip} onChange={(e) => setEditingProduct({ ...editingProduct, isReadyToShip: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="readyToShip" className="text-sm font-medium text-gray-700">Ready to Ship</label>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox"
                        id="isInStock" checked={editingProduct.isInStock ?? true} onChange={(e) => setEditingProduct({ ...editingProduct, isInStock: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="isInStock" className="text-sm font-medium text-gray-700">In Stock</label>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox"
                        id="isFeatured" checked={editingProduct.isFeatured || false} onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          isFeatured: e.target.checked,
                          featuredOrder: e.target.checked ? (editingProduct.featuredOrder || 1) : undefined
                        })}
                        className="rounded"
                      />
                      <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Product</label>
                    </div>
                  </div>

                  {/* Featured Order - Manual Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Order</label>
                    <input type="number" value={editingProduct.featuredOrder || ''} onChange={(e) => setEditingProduct({
                      ...editingProduct,
                                             featuredOrder: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                      placeholder="e.g., 1, 2, 3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  {/* Description - Full Width */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={editingProduct.description || ''} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  {/* Status Badge Preview - Full Width */}
                  <div className="col-span-2 mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Status Preview</h4>
                    <div className="flex items-center gap-2">
                      {/* Status Badge - Show for valid statuses */}
                      {editingProduct.status && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${editingProduct.status === 'active' ? 'bg-green-100 text-green-800' :
                            editingProduct.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                              editingProduct.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                                'bg-gray-100 text-gray-800'
                          }`}>
                          {editingProduct.status === 'active' ? 'Active' :
                            editingProduct.status === 'draft' ? 'Draft' :
                              editingProduct.status === 'archived' ? 'Archived' :
                                'Unknown'}
                        </span>
                      )}

                      {/* Stock Status - Based on isInStock property */}
                      {editingProduct.isInStock !== false && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          In Stock
                        </span>
                      )}
                      {editingProduct.isInStock === false && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Out of Stock
                        </span>
                      )}

                      {/* Ready to Ship */}
                      {editingProduct.isReadyToShip && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Ready to Ship
                        </span>
                      )}

                      {/* Featured */}
                      {editingProduct.isFeatured && (
                        <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save/Cancel Buttons */}
                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
                  <button onClick={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                  }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button onClick={handleSaveProduct}
                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isAddingProduct ? 'Add Product' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

