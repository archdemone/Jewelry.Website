'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  ShoppingBag,
  Settings,
  Users,
  BarChart3,
  Package,
  Image as ImageIcon,
} from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number | null;
  images?: string[];
  material: 'Silver' | 'Damascus' | 'Ceramic(white)' | 'Ceramic(black)' | 'Carbon' | 'Tungsten' | 'Titanium' | 'Stainless Steel' | 'Gold';
  gemColor: 'Red' | 'Green' | 'Blue' | 'Purple' | 'Yellow' | 'Custom';
  gemDensity: 'small' | 'medium' | 'large';
  gemVariation: 'Dark' | 'Mixed' | 'Bright';
  mixColors: string[];
  category: 'Wedding' | 'Inlay Ring' | 'Couple Ring Set' | 'Mens' | 'Womens' | 'Unisex' | 'Single Inlay' | 'Double Inlay';
  subCategory?: string;
  ringSizes: { us: number[]; eu: number[] };
  ringWidth: number[];
  isReadyToShip: boolean;
  rating?: number;
  reviews?: number;
  badge?: string;
  slug: string;
  description?: string;
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

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'womens', name: "Women's Rings" },
    { id: 'mens', name: "Men's Rings" },
    { id: 'unisex', name: 'Unisex Rings' },
    { id: 'wedding', name: 'Wedding Rings' },
    { id: 'inlay', name: 'Inlay Rings' },
  ];

  const materials = ['Silver', 'Damascus', 'Ceramic(white)', 'Ceramic(black)', 'Carbon', 'Tungsten', 'Titanium', 'Stainless Steel', 'Gold'];
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const gemDensities = ['small', 'medium', 'large'];
  const gemVariations = ['Dark', 'Mixed', 'Bright'];

  // Load products and images on mount
  useEffect(() => {
    loadProducts();
    loadAvailableImages();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to load products');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const loadAvailableImages = async () => {
    try {
      const response = await fetch('/api/admin/images');
      if (response.ok) {
        const data = await response.json();
        setAvailableImages(data);
      } else {
        console.error('Failed to load images');
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category.toLowerCase() === selectedCategory;
  });

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: '',
      price: 0,
      images: [],
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      category: 'Womens',
      ringSizes: { us: [], eu: [] },
      ringWidth: [],
      isReadyToShip: true,
      slug: '',
      description: '',
    };
    setEditingProduct(newProduct);
    setIsAddingProduct(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = async (productId: string | number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/admin/products?id=${productId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setProducts(products.filter(p => p.id !== productId));
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      const method = isAddingProduct ? 'POST' : 'PUT';
      const response = await fetch('/api/admin/products', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        
        if (isAddingProduct) {
          setProducts([...products, savedProduct]);
        } else {
          setProducts(products.map(p => p.id === editingProduct.id ? savedProduct : p));
        }
        
        setEditingProduct(null);
        setIsAddingProduct(false);
        
        // Show success message
        alert(isAddingProduct ? 'Product added successfully!' : 'Product updated successfully!');
      } else {
        console.error('Failed to save product');
        alert('Failed to save product. Please try again.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome to your jewelry store admin panel</p>
          </div>
          
        </div>
      </div>



      {/* Quick Actions */}
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
              <Eye className="h-6 w-6 text-green-600" />
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

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
                 <div className="mb-6">
           <h2 className="text-xl font-semibold text-gray-900">Recent Products</h2>
         </div>
        
        {/* Category Filter */}
        <div className="flex space-x-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-gold-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

              {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
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
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit/Add Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isAddingProduct ? 'Add New Product' : 'Edit Product'}
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (£)</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || null })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      <option value="Womens">Women's Rings</option>
                      <option value="Mens">Men's Rings</option>
                      <option value="Unisex">Unisex Rings</option>
                      <option value="Wedding">Wedding Rings</option>
                      <option value="Inlay Ring">Inlay Rings</option>
                    </select>
                  </div>
                </div>

                {/* Product Specifications */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                    <select
                      value={editingProduct.material}
                      onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {materials.map((material) => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gem Color</label>
                    <select
                      value={editingProduct.gemColor}
                      onChange={(e) => setEditingProduct({ ...editingProduct, gemColor: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {gemColors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gem Density</label>
                    <select
                      value={editingProduct.gemDensity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, gemDensity: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {gemDensities.map((density) => (
                        <option key={density} value={density}>{density}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gem Variation</label>
                    <select
                      value={editingProduct.gemVariation}
                      onChange={(e) => setEditingProduct({ ...editingProduct, gemVariation: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      {gemVariations.map((variation) => (
                        <option key={variation} value={variation}>{variation}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Image Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                  {availableImages.map((image) => (
                    <button
                      key={image.path}
                      onClick={() => {
                        const newImages = editingProduct.images?.includes(image.path)
                          ? editingProduct.images.filter(img => img !== image.path)
                          : [...(editingProduct.images || []), image.path];
                        setEditingProduct({ ...editingProduct, images: newImages });
                      }}
                      className={`relative p-2 border-2 rounded-lg transition-colors ${
                        editingProduct.images?.includes(image.path)
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-16 object-cover rounded"
                      />
                      {editingProduct.images?.includes(image.path) && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isAddingProduct ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
