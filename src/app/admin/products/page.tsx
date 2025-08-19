'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Eye,
  Package,
  Settings,
  Star,
  X,
  Save,
  Grid,
  List,
  RotateCcw,
  Check,
} from 'lucide-react';

interface RingProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  material: string;
  gemColor: string;
  gemColor2?: string;
  gemDensity: string;
  gemVariation: string;
  mixColors: string[];
  ringSizes: {
    us: number[];
    eu: number[];
  };
  ringWidth: number[];
  isReadyToShip: boolean;
  rating?: number;
  reviews?: number;
  status: 'active' | 'draft' | 'archived';
  images: string[];
  description?: string;
  isFeatured?: boolean;
  featuredOrder?: number | null;
}

interface ImageFile {
  name: string;
  url: string;
  size: number;
}

export default function UnifiedAdminProductsPage() {
  const [activeTab, setActiveTab] = useState('all-products');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [material, setMaterial] = useState('all');
  const [readyToShip, setReadyToShip] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingProduct, setEditingProduct] = useState<RingProduct | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [availableImages, setAvailableImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredGemColor, setHoveredGemColor] = useState<string | null>(null);
  const [hoveredGemColor2, setHoveredGemColor2] = useState<string | null>(null);
  const [hoveredMixColor, setHoveredMixColor] = useState<string | null>(null);

  // Categories and options
  const categories = ['Womens', 'Mens', 'Couple Ring Set', 'Double Inlay'];
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
    };
    return imageMap[color] || '/images/gems/colour/custom.jpg';
  };

  // Default seed data
  const defaultProducts: RingProduct[] = [
    {
      id: 'p1',
      name: "Women's Silver Inlay Ring - Dark Red",
      sku: 'RNG-W-SIL-RED-001',
      category: 'Womens',
      subCategory: 'Inlay Ring',
      price: 299,
      originalPrice: 349,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      ringSizes: { us: [5, 6, 7, 8, 9], eu: [49, 52, 54, 57, 59] },
      ringWidth: [4, 6, 8],
      isReadyToShip: true,
      rating: 4.8,
      reviews: 24,
      status: 'active',
      images: ['/images/MyImages/IMG-20250816-WA0000.jpg'],
      description: 'Beautiful handcrafted silver ring with dark red gem inlay.',
      isFeatured: true,
      featuredOrder: 1,
    },
    {
      id: 'p2',
      name: "Men's Damascus Wedding Ring - Bright Blue",
      sku: 'RNG-M-DAM-BLU-001',
      category: 'Mens',
      subCategory: 'Wedding',
      price: 449,
      material: 'Damascus',
      gemColor: 'Blue',
      gemDensity: 'large',
      gemVariation: 'Bright',
      mixColors: [],
      ringSizes: { us: [8, 9, 10, 11, 12], eu: [57, 59, 61, 63, 65] },
      ringWidth: [6, 8, 10],
      isReadyToShip: true,
      rating: 4.9,
      reviews: 18,
      status: 'active',
      images: ['/images/MyImages/IMG-20250816-WA0001.jpg'],
      description: 'Stunning damascus steel wedding ring with bright blue gem.',
      isFeatured: true,
      featuredOrder: 2,
    },
  ];

  const [products, setProducts] = useState<RingProduct[]>(defaultProducts);

  useEffect(() => {
    loadProducts();
    loadImages();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
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

  const handleAddProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      sku: '',
      category: 'Womens',
      price: 0,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      ringSizes: { us: [6, 7, 8, 9], eu: [52, 54, 57, 59] },
      ringWidth: [4, 6, 8],
      isReadyToShip: false,
      status: 'draft',
      images: [],
      isFeatured: false,
    });
    setIsAddingProduct(true);
  };

  const handleEditProduct = (product: RingProduct) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      const method = isAddingProduct ? 'POST' : 'PUT';
      const url = isAddingProduct ? '/api/admin/products' : `/api/admin/products/${editingProduct.id}`;
      
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
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleFeatured = async (product: RingProduct) => {
    const updatedProduct = {
      ...product,
      isFeatured: !product.isFeatured,
      featuredOrder: !product.isFeatured ? Date.now() : undefined,
    };

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
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
    const matchesQuery = query === '' || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase());
    
    const matchesStatus = status === 'all' || product.status === status;
    const matchesCategory = category === 'all' || product.category === category;
    const matchesMaterial = material === 'all' || product.material === material;
    const matchesReadyToShip = readyToShip === 'all' || 
      (readyToShip === 'ready' && product.isReadyToShip) ||
      (readyToShip === 'not-ready' && !product.isReadyToShip);

    const matchesTab = activeTab === 'all-products' || 
      (activeTab === 'featured' && product.isFeatured);

    return matchesQuery && matchesStatus && matchesCategory && matchesMaterial && matchesReadyToShip && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getFeaturedBadge = (isFeatured: boolean) => {
    return isFeatured ? (
      <Badge className="bg-gold-100 text-gold-800 flex items-center gap-1">
        <Star className="w-3 h-3" />
        Featured
      </Badge>
    ) : null;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage all your jewelry products with advanced features</p>
        </div>
        <Button onClick={handleAddProduct} className="bg-gold-500 hover:bg-gold-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

             {/* Tabs */}
       <div className="w-full">
         <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 w-full">
           <button
             onClick={() => setActiveTab('all-products')}
             className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
               activeTab === 'all-products' 
                 ? 'bg-white text-gray-900 shadow-sm' 
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             <Package className="w-4 h-4 mr-2" />
             All Products ({products.length})
           </button>
           <button
             onClick={() => setActiveTab('featured')}
             className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
               activeTab === 'featured' 
                 ? 'bg-white text-gray-900 shadow-sm' 
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             <Star className="w-4 h-4 mr-2" />
             Featured ({products.filter(p => p.isFeatured).length})
           </button>
         </div>

                 {activeTab === 'all-products' && (
           <div className="space-y-4 mt-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <Input
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="all">All Materials</option>
                  {materials.map((mat) => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ready to Ship</label>
                <select
                  value={readyToShip}
                  onChange={(e) => setReadyToShip(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="ready">Ready</option>
                  <option value="not-ready">Not Ready</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery('');
                    setStatus('all');
                    setCategory('all');
                    setMaterial('all');
                    setReadyToShip('all');
                  }}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 relative">
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
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {getStatusBadge(product.status)}
                      {getFeaturedBadge(product.isFeatured || false)}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFeatured(product)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-yellow-400 text-yellow-600' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.sku}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gold-600">£{product.price}</span>
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-600" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>{product.material}</span>
                      <span>•</span>
                      <span>{product.gemColor}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              {product.images && product.images[0] ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="rounded-full object-cover"
                                  sizes="40px"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <Package className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.material} • {product.gemColor}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gold-600">£{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleFeatured(product)}
                          >
                            <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-yellow-400 text-yellow-600' : 'text-gray-400'}`} />
                          </Button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
                     )}
           </div>
         )}
 
         {activeTab === 'featured' && (
           <div className="space-y-4 mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Featured Products</h3>
              <p className="text-sm text-gray-600">Manage products that appear on the homepage</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.sku}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFeatured(product)}
                    >
                      <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-yellow-400 text-yellow-600' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gold-600">£{product.price}</span>
                    <span className="text-gray-500">Order: {product.featuredOrder || 'N/A'}</span>
                  </div>
                </Card>
              ))}
                         </div>
           </Card>
         </div>
       )}
       </div>

             {/* Advanced Edit Modal */}
       {editingProduct && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
             {/* Header */}
             <div className="flex items-center justify-between p-6 border-b">
               <h2 className="text-2xl font-bold text-gray-900">
                 {isAddingProduct ? 'Add New Product' : 'Edit Product'}
               </h2>
               <button
                 onClick={() => {
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
                         key={image.name}
                         onClick={() => {
                           const newImages = editingProduct.images.includes(image.url)
                             ? editingProduct.images.filter(img => img !== image.url)
                             : [...editingProduct.images, image.url];
                           setEditingProduct({ ...editingProduct, images: newImages });
                         }}
                         className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                           editingProduct.images.includes(image.url)
                             ? 'border-gold-500 ring-2 ring-gold-200'
                             : 'border-gray-200 hover:border-gray-300'
                         }`}
                       >
                         <Image
                           src={image.url}
                           alt={image.name}
                           fill
                           className="object-cover"
                           sizes="200px"
                         />
                         {editingProduct.images.includes(image.url) && (
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
                     <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                     <input
                       type="text"
                       value={editingProduct.sku}
                       onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                     <select
                       value={editingProduct.category}
                       onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     >
                       {categories.map((cat) => (
                         <option key={cat} value={cat}>{cat}</option>
                       ))}
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
                     <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                     <select
                       value={editingProduct.material}
                       onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
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
                           onClick={() => setEditingProduct({ ...editingProduct, gemColor: color })}
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
                             onClick={() => setEditingProduct({ ...editingProduct, gemColor2: color })}
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
                       onChange={(e) => setEditingProduct({ ...editingProduct, gemDensity: e.target.value })}
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
                       onChange={(e) => setEditingProduct({ ...editingProduct, gemVariation: e.target.value })}
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
                             checked={editingProduct.mixColors.includes(color)}
                             onChange={(e) => {
                               const newMixColors = e.target.checked
                                 ? [...editingProduct.mixColors, color]
                                 : editingProduct.mixColors.filter(c => c !== color);
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

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
                     <input
                       type="number"
                       value={editingProduct.price}
                       onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (£)</label>
                     <input
                       type="number"
                       value={editingProduct.originalPrice || ''}
                       onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value) || undefined })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                     <select
                       value={editingProduct.status}
                       onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     >
                       <option value="draft">Draft</option>
                       <option value="active">Active</option>
                       <option value="archived">Archived</option>
                     </select>
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

                   <div className="col-span-2">
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="isFeatured"
                         checked={editingProduct.isFeatured || false}
                         onChange={(e) => setEditingProduct({ 
                           ...editingProduct, 
                           isFeatured: e.target.checked,
                           featuredOrder: e.target.checked ? Date.now() : null
                         })}
                         className="rounded"
                       />
                       <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Product</label>
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
                   <button
                     onClick={() => {
                       setEditingProduct(null);
                       setIsAddingProduct(false);
                     }}
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
