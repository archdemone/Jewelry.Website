'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [hoveredGemColor, setHoveredGemColor] = useState<string | null>(null);
  const [hoveredGemColor2, setHoveredGemColor2] = useState<string | null>(null);
  const [hoveredMixColor, setHoveredMixColor] = useState<string | null>(null);

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
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
               <div>
                 {/* View Mode */}
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
               </div>
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

      {/* Advanced Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                         {/* Header */}
             <div className="flex items-center justify-between p-6 border-b">
               <div className="flex-1 min-w-0">
                 <h2 className="text-2xl font-bold text-gray-900 truncate">
                   {editingProduct.name || 'Edit Featured Product'}
                 </h2>
                 <p className="text-sm text-gray-500 mt-1">Update product details and settings</p>
               </div>
               <button
                 onClick={() => setEditingProduct(null)}
                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4 flex-shrink-0"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-140px)] overflow-hidden">
              {/* Left Column - Product Images */}
              <div className="w-1/3 p-6 border-r bg-gray-50 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>
                
                {/* Main Image Preview */}
                <div className="mb-6">
                  <div className="relative aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    {editingProduct.image ? (
                      <Image
                        src={editingProduct.image}
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
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Featured
                    </div>
                  </div>
                </div>

                {/* Image URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.image || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    placeholder="e.g., /images/MyImages/IMG-20250816-WA0000.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="w-2/3 p-6 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                
                                 <div className="grid grid-cols-2 gap-6">
                   <div className="col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                     <input
                       type="text"
                       value={editingProduct.name}
                       onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                       placeholder="Enter product name"
                     />
                   </div>

                                     <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                     <input
                       type="text"
                       value={editingProduct.sku}
                       onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                       placeholder="e.g., RNG-12345"
                     />
                   </div>

                                     <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                     <select
                       value={editingProduct.category}
                       onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                     >
                       {availableCategories.map((cat) => (
                         <option key={cat} value={cat}>{cat}</option>
                       ))}
                     </select>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                     <select
                       value={editingProduct.material}
                       onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                     >
                       {availableMaterials.map((material) => (
                         <option key={material} value={material}>{material}</option>
                       ))}
                     </select>
                   </div>

                                     <div className="col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-3">Primary Gem Color</label>
                     <div className="grid grid-cols-3 gap-3">
                       {availableGemColors.map((color) => (
                         <button
                           key={color}
                           type="button"
                           onClick={() => setEditingProduct({ ...editingProduct, gemColor: color })}
                           onMouseEnter={() => setHoveredGemColor(color)}
                           onMouseLeave={() => setHoveredGemColor(null)}
                           className={`relative rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                             editingProduct.gemColor === color
                               ? 'border-orange-500 bg-orange-50 shadow-md'
                               : 'border-gray-300 hover:border-gray-400'
                           }`}
                         >
                           <div className="flex flex-col items-center gap-3">
                             <div
                               className="h-10 w-10 rounded-full border-2 border-gray-200 shadow-sm"
                               style={{ backgroundColor: getGemColorHex(color) }}
                             />
                             <span className="text-sm font-medium text-gray-700">{color}</span>
                           </div>

                           {/* Gem Color Popup */}
                           {hoveredGemColor === color && (
                             <div className="absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2 transform">
                               <div className="rounded-lg border bg-white p-3 shadow-xl">
                                 <Image
                                   src={getGemColorImage(color)}
                                   alt={`${color} gem`}
                                   width={144}
                                   height={144}
                                   className="rounded object-cover"
                                 />
                               </div>
                             </div>
                           )}
                         </button>
                       ))}
                     </div>
                   </div>

                                     <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (£)</label>
                     <input
                       type="number"
                       value={editingProduct.price}
                       onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                       placeholder="0.00"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (£)</label>
                     <input
                       type="number"
                       value={editingProduct.originalPrice || ''}
                       onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                       placeholder="0.00 (optional)"
                     />
                   </div>

                                     <div className="col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                     <textarea
                       value={editingProduct.description || ''}
                       onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                       rows={4}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                       placeholder="Enter product description..."
                     />
                   </div>

                                     <div className="col-span-2">
                     <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                       <input
                         type="checkbox"
                         id="readyToShip"
                         checked={editingProduct.isReadyToShip}
                         onChange={(e) => setEditingProduct({ ...editingProduct, isReadyToShip: e.target.checked })}
                         className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                       />
                       <label htmlFor="readyToShip" className="text-sm font-medium text-gray-700">Ready to Ship</label>
                       <span className="text-xs text-gray-500 ml-auto">Products marked as ready to ship will show a green badge</span>
                     </div>
                   </div>

                                     {/* Status Badge Preview */}
                   <div className="col-span-2 mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                     <h4 className="text-sm font-medium text-gray-700 mb-3">Status Preview</h4>
                     <div className="flex items-center gap-3 flex-wrap">
                       <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium border border-orange-200">
                         Featured
                       </span>
                       {editingProduct.isReadyToShip && (
                         <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium border border-green-200">
                           Ready to Ship
                         </span>
                       )}
                       {editingProduct.originalPrice && (
                         <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                           {Math.round(((editingProduct.originalPrice - editingProduct.price) / editingProduct.originalPrice) * 100)}% OFF
                         </span>
                       )}
                       {!editingProduct.isReadyToShip && (
                         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200">
                           Custom Order
                         </span>
                       )}
                     </div>
                   </div>
                </div>

                                 {/* Save/Cancel Buttons */}
                 <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
                   <button
                     onClick={() => setEditingProduct(null)}
                     className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                   >
                     Cancel
                   </button>
                   <button
                     onClick={handleSave}
                     className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center font-medium shadow-sm"
                   >
                     <Save className="w-4 h-4 mr-2" />
                     Save Changes
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
