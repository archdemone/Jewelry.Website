'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  ShoppingBag,
  Settings,
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
  gemColor2?: 'Red' | 'Green' | 'Blue' | 'Purple' | 'Yellow' | 'Custom';
  gemDensity: 'small' | 'medium' | 'large';
  gemVariation: 'Dark' | 'Mixed' | 'Bright';
  mixColors: string[];
  mixColors2?: string[];
  category: 'Wedding' | 'Inlay Ring' | 'Couple Ring Set' | 'Mens' | 'Womens' | 'Unisex' | 'Single Inlay' | 'Double Inlay';
  subCategory?: string;
  ringSizes: { us: number[]; eu: number[] };
  ringWidth: number[];
  isReadyToShip: boolean;
  status?: 'active' | 'draft' | 'archived' | 'out_of_stock';
  currency?: 'GBP' | 'USD';
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
  const [hoveredGemColor, setHoveredGemColor] = useState<string | null>(null);
  const [hoveredGemColor2, setHoveredGemColor2] = useState<string | null>(null);
  const [hoveredMixColor, setHoveredMixColor] = useState<string | null>(null);
  const [hoveredMixColor2, setHoveredMixColor2] = useState<string | null>(null);

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
    const imageMap: Record<string, string> = {
      'Red': '/images/gems/colour/red.jpg',
      'Green': '/images/gems/colour/green.jpg',
      'Blue': '/images/gems/colour/blue.jpg',
      'Purple': '/images/gems/colour/purple.jpg',
      'Yellow': '/images/gems/colour/yellow.jpg',
      'Custom': '/images/gems/colour/custom.jpg',
      'Black': '/images/gems/colour/custom.jpg',
      'White': '/images/gems/colour/custom.jpg',
      'Pink': '/images/gems/colour/custom.jpg',
      'Orange': '/images/gems/colour/custom.jpg',
      'Turquoise': '/images/gems/colour/custom.jpg',
    };
    return imageMap[color] || '/images/gems/colour/custom.jpg';
  };

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
      currency: 'GBP',
      slug: `product-${Date.now()}`,
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
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage your jewelry products</p>
          </div>
        </div>
      </div>

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
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
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
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => {
                      if (product.slug) {
                        window.open(`/products/${product.slug}`, '_blank');
                      } else {
                        alert('Product slug not available. Please save the product first.');
                      }
                    }}
                    className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                    title="View Product"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
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
      </div>

      {/* Edit/Add Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {isAddingProduct ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button
                onClick={handleCancelEdit}
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
                      <Image
                        src={editingProduct.images[0]}
                        alt={editingProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
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
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                        editingProduct.status === 'active' ? 'bg-green-100 text-green-800' :
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
                      <button
                        key={image.path}
                        onClick={() => {
                          const newImages = editingProduct.images?.includes(image.path)
                            ? editingProduct.images.filter(img => img !== image.path)
                            : [...(editingProduct.images || []), image.path];
                          setEditingProduct({ ...editingProduct, images: newImages });
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          editingProduct.images?.includes(image.path)
                            ? 'border-gold-500 ring-2 ring-gold-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={image.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                        {editingProduct.images?.includes(image.path) && (
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      <option value="Wedding">Wedding Rings</option>
                      <option value="Inlay Ring">Inlay Rings</option>
                      <option value="Couple Ring Set">Couple Ring Set</option>
                      <option value="Mens">Men's Rings</option>
                      <option value="Womens">Women's Rings</option>
                      <option value="Unisex">Unisex Rings</option>
                      <option value="Single Inlay">Single Inlay</option>
                      <option value="Double Inlay">Double Inlay</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                    <input
                      type="text"
                      value={editingProduct.subCategory || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                      placeholder="e.g., Engagement, Anniversary"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Slug</label>
                    <input
                      type="text"
                      value={editingProduct.slug}
                      onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                      placeholder="e.g., gold-ring-rose"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Gem Color</label>
                    <div className="grid grid-cols-3 gap-2">
                      {gemColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, gemColor: color as any })}
                          onMouseEnter={() => setHoveredGemColor(color)}
                          onMouseLeave={() => setHoveredGemColor(null)}
                          className={`relative rounded-lg border-2 p-3 transition-all ${
                            editingProduct.gemColor === color
                              ? 'border-gold-500 bg-gold-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="h-8 w-8 rounded-full border-2 border-gray-200"
                              style={{ backgroundColor: getGemColorHex(color) }}
                            />
                            <span className="text-sm font-medium">{color}</span>
                          </div>

                          {/* Gem Color Popup */}
                          {hoveredGemColor === color && (
                            <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                              <div className="rounded-lg border bg-white p-2 shadow-lg">
                                <Image
                                  src={getGemColorImage(color)}
                                  alt={`${color} gem`}
                                  width={128}
                                  height={128}
                                  className="rounded object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Second Gem Color for Couple Rings */}
                  {editingProduct.category === 'Couple Ring Set' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Second Gem Color (Ring 2)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {gemColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, gemColor2: color as any })}
                            onMouseEnter={() => setHoveredGemColor2(color)}
                            onMouseLeave={() => setHoveredGemColor2(null)}
                            className={`relative rounded-lg border-2 p-3 transition-all ${
                              editingProduct.gemColor2 === color
                                ? 'border-gold-500 bg-gold-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="h-8 w-8 rounded-full border-2 border-gray-200"
                                style={{ backgroundColor: getGemColorHex(color) }}
                              />
                              <span className="text-sm font-medium">{color}</span>
                            </div>

                            {/* Gem Color Popup */}
                            {hoveredGemColor2 === color && (
                              <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                                <div className="rounded-lg border bg-white p-2 shadow-lg">
                                  <Image
                                    src={getGemColorImage(color)}
                                    alt={`${color} gem`}
                                    width={128}
                                    height={128}
                                    className="rounded object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Second Gem Color for Double Inlay */}
                  {editingProduct.category === 'Double Inlay' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Second Gem Color (Inlay 2)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {gemColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, gemColor2: color as any })}
                            onMouseEnter={() => setHoveredGemColor2(color)}
                            onMouseLeave={() => setHoveredGemColor2(null)}
                            className={`relative rounded-lg border-2 p-3 transition-all ${
                              editingProduct.gemColor2 === color
                                ? 'border-gold-500 bg-gold-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="h-8 w-8 rounded-full border-2 border-gray-200"
                                style={{ backgroundColor: getGemColorHex(color) }}
                              />
                              <span className="text-sm font-medium">{color}</span>
                            </div>

                            {/* Gem Color Popup */}
                            {hoveredGemColor2 === color && (
                              <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                                <div className="rounded-lg border bg-white p-2 shadow-lg">
                                  <Image
                                    src={getGemColorImage(color)}
                                    alt={`${color} gem`}
                                    width={128}
                                    height={128}
                                    className="rounded object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mix Colors (for Custom option)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                        <label 
                          key={color} 
                          className="relative flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer"
                          onMouseEnter={() => setHoveredMixColor(color)}
                          onMouseLeave={() => setHoveredMixColor(null)}
                        >
                          <input
                            type="checkbox"
                            checked={editingProduct.mixColors?.includes(color) || false}
                            onChange={(e) => {
                              const newMixColors = e.target.checked
                                ? [...(editingProduct.mixColors || []), color]
                                : (editingProduct.mixColors || []).filter(c => c !== color);
                              setEditingProduct({ ...editingProduct, mixColors: newMixColors });
                            }}
                            className="mr-2"
                          />
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: getGemColorHex(color) }}
                            />
                            <span className="text-sm">{color}</span>
                          </div>

                          {/* Mix Color Popup */}
                          {hoveredMixColor === color && (
                            <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                              <div className="rounded-lg border bg-white p-2 shadow-lg">
                                <Image
                                  src={getGemColorImage(color)}
                                  alt={`${color} gem`}
                                  width={128}
                                  height={128}
                                  className="rounded object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Second Mix Colors for Couple Rings */}
                  {editingProduct.category === 'Couple Ring Set' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mix Colors for Ring 2 (Custom option)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                          <label 
                            key={color} 
                            className="relative flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer"
                            onMouseEnter={() => setHoveredMixColor2(color)}
                            onMouseLeave={() => setHoveredMixColor2(null)}
                          >
                            <input
                              type="checkbox"
                              checked={editingProduct.mixColors2?.includes(color) || false}
                              onChange={(e) => {
                                const newMixColors2 = e.target.checked
                                  ? [...(editingProduct.mixColors2 || []), color]
                                  : (editingProduct.mixColors2 || []).filter(c => c !== color);
                                setEditingProduct({ ...editingProduct, mixColors2: newMixColors2 });
                              }}
                              className="mr-2"
                            />
                            <div className="flex items-center gap-2">
                              <div
                                className="h-4 w-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: getGemColorHex(color) }}
                              />
                              <span className="text-sm">{color}</span>
                            </div>

                            {/* Mix Color Popup */}
                            {hoveredMixColor2 === color && (
                              <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                                <div className="rounded-lg border bg-white p-2 shadow-lg">
                                  <Image
                                    src={getGemColorImage(color)}
                                    alt={`${color} gem`}
                                    width={128}
                                    height={128}
                                    className="rounded object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Second Mix Colors for Double Inlay */}
                  {editingProduct.category === 'Double Inlay' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mix Colors for Inlay 2 (Custom option)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                          <label 
                            key={color} 
                            className="relative flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer"
                            onMouseEnter={() => setHoveredMixColor2(color)}
                            onMouseLeave={() => setHoveredMixColor2(null)}
                          >
                            <input
                              type="checkbox"
                              checked={editingProduct.mixColors2?.includes(color) || false}
                              onChange={(e) => {
                                const newMixColors2 = e.target.checked
                                  ? [...(editingProduct.mixColors2 || []), color]
                                  : (editingProduct.mixColors2 || []).filter(c => c !== color);
                                setEditingProduct({ ...editingProduct, mixColors2: newMixColors2 });
                              }}
                              className="mr-2"
                            />
                            <div className="flex items-center gap-2">
                              <div
                                className="h-4 w-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: getGemColorHex(color) }}
                              />
                              <span className="text-sm">{color}</span>
                            </div>

                            {/* Mix Color Popup */}
                            {hoveredMixColor2 === color && (
                              <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                                <div className="rounded-lg border bg-white p-2 shadow-lg">
                                  <Image
                                    src={getGemColorImage(color)}
                                    alt={`${color} gem`}
                                    width={128}
                                    height={128}
                                    className="rounded object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ({editingProduct.currency === 'USD' ? '$' : '£'})</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ({editingProduct.currency === 'USD' ? '$' : '£'})</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value === '' ? null : Number(value);
                        setEditingProduct({ ...editingProduct, originalPrice: numValue });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editingProduct.status || 'draft'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={editingProduct.currency || 'GBP'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, currency: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      <option value="GBP">£ GBP</option>
                      <option value="USD">$ USD</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ring Sizes (US)</label>
                    <input
                      type="text"
                      value={editingProduct.ringSizes?.us?.join(', ') || ''}
                      onChange={(e) => {
                        const sizes = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                        setEditingProduct({ 
                          ...editingProduct, 
                          ringSizes: { ...editingProduct.ringSizes, us: sizes }
                        });
                      }}
                      placeholder="e.g., 6, 7, 8, 9"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ring Sizes (EU)</label>
                    <input
                      type="text"
                      value={editingProduct.ringSizes?.eu?.join(', ') || ''}
                      onChange={(e) => {
                        const sizes = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                        setEditingProduct({ 
                          ...editingProduct, 
                          ringSizes: { ...editingProduct.ringSizes, eu: sizes }
                        });
                      }}
                      placeholder="e.g., 52, 54, 56, 58"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ring Width (mm)</label>
                    <input
                      type="text"
                      value={editingProduct.ringWidth?.join(', ') || ''}
                      onChange={(e) => {
                        const widths = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                        setEditingProduct({ ...editingProduct, ringWidth: widths });
                      }}
                      placeholder="e.g., 2, 3, 4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                                     <div className="col-span-2">
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="readyToShip"
                         checked={editingProduct.isReadyToShip}
                         onChange={(e) => setEditingProduct({ ...editingProduct, isReadyToShip: e.target.checked })}
                         className="rounded"
                       />
                       <label htmlFor="readyToShip" className="text-sm font-medium text-gray-700">Ready to Ship</label>
                     </div>
                   </div>

                   {/* Status Badge Preview */}
                   <div className="col-span-2 mt-6 p-4 bg-gray-50 rounded-lg">
                     <h4 className="text-sm font-medium text-gray-700 mb-2">Status Preview</h4>
                     <div className="flex items-center gap-2">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         editingProduct.status === 'active' ? 'bg-green-100 text-green-800' :
                         editingProduct.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                         editingProduct.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                         'bg-red-100 text-red-800'
                       }`}>
                         {editingProduct.status === 'active' ? 'Active' :
                          editingProduct.status === 'draft' ? 'Draft' :
                          editingProduct.status === 'archived' ? 'Archived' :
                          'Out of Stock'}
                       </span>
                       {editingProduct.isReadyToShip && (
                         <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                           Ready to Ship
                         </span>
                       )}
                     </div>
                   </div>
                 </div>

                 {/* Save/Cancel Buttons */}
                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
