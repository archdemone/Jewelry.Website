'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductImage } from '@/lib/assets/images';
import ProductEditor from '@/components/admin/ProductEditor';
import type { Product } from '@/types';

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [availableImages, setAvailableImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredGemColor, setHoveredGemColor] = useState<string | null>(null);
  const [hoveredGemColor2, setHoveredGemColor2] = useState<string | null>(null);
  const [hoveredMixColor, setHoveredMixColor] = useState<string | null>(null);
  const [hoveredMixColor2, setHoveredMixColor2] = useState<string | null>(null);

  // Categories and options - Updated to match new database
  const categories = ['mens-rings', 'womens-rings', 'unisex-rings', 'wedding-rings', 'engagement-rings', 'inlay-rings', 'statement-rings'];
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
  const defaultProducts: Product[] = [
    {
      id: 1,
      name: "Women's Silver Inlay Ring - Dark Red",
      sku: 'RNG-W-SIL-RED-001',
      slug: 'womens-silver-inlay-ring-dark-red',
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
      id: 2,
      name: "Men's Damascus Wedding Ring - Bright Blue",
      sku: 'RNG-M-DAM-BLU-001',
      slug: 'mens-damascus-wedding-ring-bright-blue',
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

  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from the new Prisma database API
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        // Normalize images to ensure they're always arrays
        const normalizedProducts = (data.products || []).map((p: any) => ({
          ...p,
          images: normalizeImages(p.images)
        }));
        setProducts(normalizedProducts);
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
  };

  const handleAddProduct = () => {
    setEditingProduct({
      id: 0,
      name: '',
      sku: '',
      slug: '',
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
      isInStock: true,
      status: 'draft',
      images: [],
      isFeatured: false,
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
        const savedProduct = await response.json();

        // Normalize images in the returned product
        const normalizedSavedProduct = {
          ...savedProduct,
          images: normalizeImages(savedProduct.images)
        };

        // Update local state with the returned product
        if (isAddingProduct) {
          // Add new product to the list
          setProducts(prev => [normalizedSavedProduct, ...prev]);
        } else {
          // Update existing product in the list
          setProducts(prev => prev.map(p => p.id === normalizedSavedProduct.id ? normalizedSavedProduct : p));
        }

        setEditingProduct(null);
        setIsAddingProduct(false);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string | number) => {
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
    const matchesQuery = query === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku?.toLowerCase().includes(query.toLowerCase());

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
          <button onClick={() => setActiveTab('all-products')} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${activeTab === 'all-products'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            All Products ({products.length})
          </button>
          <button onClick={() => setActiveTab('featured')} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${activeTab === 'featured'
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
                  <Input placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}
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
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
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
                  <select value={material} onChange={(e) => setMaterial(e.target.value)}
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
                  <select value={readyToShip} onChange={(e) => setReadyToShip(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="all">All</option>
                    <option value="ready">Ready</option>
                    <option value="not-ready">Not Ready</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={() => {
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
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm" onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm" onClick={() => setViewMode('list')}
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
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {getStatusBadge(product.status || 'draft')}
                        {getFeaturedBadge(product.isFeatured || false)}
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button size="sm"
                          variant="outline" onClick={() => toggleFeatured(product)}
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
                        <Button size="sm"
                          variant="outline" onClick={() => handleEditProduct(product)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm"
                          variant="outline" onClick={() => handleDeleteProduct(product.id)}
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
                                <img
                                  src={getProductImage(product)}
                                  alt={product.name}
                                  style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                                  loading="lazy"
                                />
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
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status || 'draft')}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button size="sm"
                              variant="outline" onClick={() => toggleFeatured(product)}
                            >
                              <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-yellow-400 text-yellow-600' : 'text-gray-400'}`} />
                            </Button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button size="sm"
                                variant="outline" onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm"
                                variant="outline" onClick={() => handleDeleteProduct(product.id)}
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
                      <Button size="sm"
                        variant="outline" onClick={() => toggleFeatured(product)}
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

      {/* Shared Product Editor Modal */}
      <ProductEditor
        product={editingProduct || undefined}
        open={!!editingProduct}
        onClose={() => {
          setEditingProduct(null);
          setIsAddingProduct(false);
        }}
        onSaved={(savedProduct) => {
          // Update local state with the returned product
          if (isAddingProduct) {
            // Add new product to the list
            setProducts(prev => [savedProduct, ...prev]);
          } else {
            // Update existing product in the list
            setProducts(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
          }
          setEditingProduct(null);
          setIsAddingProduct(false);
        }}
      />
    </div>
  );
}
