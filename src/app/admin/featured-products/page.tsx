'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductEditor from '@/components/admin/ProductEditor';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Save,
  RotateCcw,
  Star,
  Package,
  Settings,
  X,
} from 'lucide-react';
import {
  getFeaturedProducts,
  updateFeaturedProduct,
  addFeaturedProduct,
  deleteFeaturedProduct,
  resetToDefault,
  type FeaturedProduct,
  availableMaterials,
  availableGemColors,
  availableGemDensities,
  availableGemVariations,
  availableCategories,
} from '@/lib/featured-products';

export default function AdminFeaturedProductsPage() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [query, setQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<FeaturedProduct | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<FeaturedProduct>>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getFeaturedProducts());
  };

  const handleEdit = (product: FeaturedProduct) => {
    setEditingProduct({ ...product });
    setIsAddingNew(false);
  };

  const handleSave = (savedProduct: FeaturedProduct) => {
    if (editingProduct) {
      updateFeaturedProduct(editingProduct.id, savedProduct);
    } else if (isAddingNew && newProduct.name) {
      const productToAdd = {
        ...newProduct,
        id: Date.now().toString(),
        slug: newProduct.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
        sku: `RNG-${Date.now()}`,
        status: 'active' as const,
        rating: 4.5,
        reviews: 0,
        mixColors: [],
        ringSizes: { us: [6, 7, 8, 9], eu: [52, 54, 57, 59] },
        ringWidth: [4, 6, 8],
        isReadyToShip: false,
        craftTime: '2-3 weeks',
      } as FeaturedProduct;
      addFeaturedProduct(productToAdd);
    }
    setEditingProduct(null);
    setIsAddingNew(false);
    setNewProduct({});
    loadProducts();
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
    setNewProduct({});
  };

  const handleAddNew = () => {
    setNewProduct({
      name: '',
      sku: '',
      category: 'womens-rings',
      price: 0,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      craftTime: '2-3 weeks',
      mixColors: [],
      ringSizes: { us: [6, 7, 8, 9], eu: [52, 54, 57, 59] },
      ringWidth: [4, 6, 8],
      isReadyToShip: false,
      status: 'active',
      image: '',
      rating: 4.5,
      reviews: 0,
    });
    setEditingProduct(null);
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this featured product?')) {
      deleteFeaturedProduct(id);
      loadProducts();
    }
  };

  const handleReset = () => {
    if (confirm('This will reset all featured products to default. Are you sure?')) {
      resetToDefault();
      loadProducts();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.sku?.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
              <p className="text-gray-600 mt-2">Manage your featured products that appear on the homepage</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </Button>
              <Button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4" />
                Add Featured Product
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search featured products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(products.map((p) => p.category)).size}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isReadyToShip && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Ready to Ship
                    </Badge>
                  )}
                  <Badge className="bg-orange-500 text-white text-xs">
                    Featured
                  </Badge>
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
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.material}</span>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No featured products found</h3>
            <p className="text-gray-500 mb-4">
              {query ? 'Try adjusting your search terms.' : 'Get started by adding your first featured product.'}
            </p>
            {!query && (
              <Button onClick={handleAddNew} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Featured Product
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Shared ProductEditor Modal */}
      <ProductEditor
        product={editingProduct || (isAddingNew ? newProduct as any : undefined)}
        open={!!editingProduct || isAddingNew}
        onClose={handleClose}
        onSaved={handleSave}
        mode="featured"
      />
    </div>
  );
}
