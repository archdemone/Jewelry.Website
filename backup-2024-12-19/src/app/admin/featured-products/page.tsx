'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  const handleSave = () => {
    if (editingProduct) {
      updateFeaturedProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      loadProducts();
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
        craftTime: '2-3 weeks',
        isReadyToShip: true,
      } as FeaturedProduct;

      addFeaturedProduct(productToAdd);
      setNewProduct({});
      setIsAddingNew(false);
      loadProducts();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this featured product?')) {
      deleteFeaturedProduct(id);
      loadProducts();
    }
  };

  const handleReset = () => {
    if (confirm('This will reset all featured products to their default state. Are you sure?')) {
      resetToDefault();
      loadProducts();
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      query === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
          <p className="mt-1 text-gray-600">Manage products that appear on the homepage</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Featured Product
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search featured products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Add New Product Form */}
      {isAddingNew && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Add New Featured Product</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Input
              placeholder="Product Name"
              value={newProduct.name || ''}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <Input
              placeholder="Original Price (optional)"
              type="number"
              value={newProduct.originalPrice || ''}
              onChange={(e) =>
                setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) || undefined })
              }
            />
            <select
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={newProduct.material || ''}
              onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
            >
              <option value="">Select Material</option>
              {availableMaterials.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={newProduct.gemColor || ''}
              onChange={(e) => setNewProduct({ ...newProduct, gemColor: e.target.value })}
            >
              <option value="">Select Gem Color</option>
              {availableGemColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={newProduct.category || ''}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Input
              placeholder="Image Path (e.g., /images/MyImages/IMG-20250816-WA0000.jpg)"
              value={newProduct.image || ''}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={newProduct.description || ''}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              rows={3}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newProduct.isReadyToShip || false}
                onChange={(e) => setNewProduct({ ...newProduct, isReadyToShip: e.target.checked })}
              />
              <label className="text-sm">Ready to Ship</label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
              <Save className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingNew(false);
                setNewProduct({});
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute right-2 top-2 flex gap-1">
                {product.isReadyToShip ? (
                  <Badge className="bg-green-500 text-white">Ready</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    Custom
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-500 text-white">
                    {Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100,
                    )}
                    % OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {editingProduct?.id === product.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Price"
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                      }
                    />
                    <Input
                      placeholder="Original Price"
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          originalPrice: Number(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={editingProduct.material}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, material: e.target.value })
                    }
                  >
                    {availableMaterials.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={editingProduct.gemColor}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, gemColor: e.target.value })
                    }
                  >
                    {availableGemColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingProduct.isReadyToShip}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, isReadyToShip: e.target.checked })
                      }
                    />
                    <label className="text-sm">Ready to Ship</label>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Save className="mr-1 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">{product.name}</h3>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg font-bold">£{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        £{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="mb-3 space-y-1">
                    <div className="text-sm">
                      <span className="text-gray-600">Material:</span> {product.material}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Gem:</span> {product.gemColor}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Category:</span> {product.category}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(product)} size="sm" variant="outline">
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Link href={`/products/${product.slug}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="py-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">No featured products found</h3>
          <p className="mb-4 text-gray-600">
            Try adjusting your search or add new featured products
          </p>
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Featured Product
          </Button>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-orange-100 p-2">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Featured</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready to Ship</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.isReadyToShip).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-2">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-2">
              <Package className="h-6 w-6 text-purple-600" />
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
    </div>
  );
}
