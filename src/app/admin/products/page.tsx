'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BulkActions from '@/components/admin/BulkActions';
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ColorChip } from '@/components/admin/ColorChip';

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
}

export default function AdminProductsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [material, setMaterial] = useState('all');
  const [readyToShip, setReadyToShip] = useState('all');
  const [editingProduct, setEditingProduct] = useState<RingProduct | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

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
      description: 'Stunning Damascus steel wedding ring with bright blue gem inlay.',
    },
    {
      id: 'p3',
      name: 'Unisex Carbon Inlay Ring - Mixed Green',
      sku: 'RNG-U-CAR-GRN-001',
      category: 'Unisex',
      subCategory: 'Inlay Ring',
      price: 199,
      originalPrice: 249,
      material: 'Carbon',
      gemColor: 'Green',
      gemDensity: 'small',
      gemVariation: 'Mixed',
      mixColors: ['Green', 'Blue'],
      ringSizes: { us: [6, 7, 8, 9, 10], eu: [52, 54, 57, 59, 61] },
      ringWidth: [4, 6],
      isReadyToShip: false,
      rating: 4.7,
      reviews: 31,
      status: 'draft',
      images: ['/images/MyImages/IMG-20250816-WA0002.jpg'],
      description: 'Lightweight carbon ring with mixed green and blue gem inlay.',
    },
  ];

  const [products, setProducts] = useState<RingProduct[]>(defaultProducts);

  // Load admin-created products from localStorage and merge
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('admin_products') : null;
      if (raw) {
        const created: RingProduct[] = JSON.parse(raw);
        // Deduplicate by id if overlaps
        const map = new Map<string, RingProduct>();
        [...created, ...defaultProducts].forEach((p) => map.set(p.id, p));
        setProducts(Array.from(map.values()));
      } else {
        setProducts(defaultProducts);
      }
    } catch {
      setProducts(defaultProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    'Wedding',
    'Inlay Ring',
    'Couple Ring Set',
    'Mens',
    'Womens',
    'Unisex',
    'Single Inlay',
    'Double Inlay',
  ];
  const materials = [
    'Silver',
    'Damascus',
    'Ceramic(white)',
    'Ceramic(black)',
    'Carbon',
    'Tungsten',
    'Titanium',
    'Stainless Steel',
    'Gold',
  ];
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const gemDensities = ['small', 'medium', 'large'];
  const gemVariations = ['Dark', 'Mixed', 'Bright'];

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      query === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = status === 'all' || product.status === status;
    const matchesCategory = category === 'all' || product.category === category;
    const matchesMaterial = material === 'all' || product.material === material;
    const matchesReadyToShip =
      readyToShip === 'all' ||
      (readyToShip === 'ready' && product.isReadyToShip) ||
      (readyToShip === 'custom' && !product.isReadyToShip);

    return (
      matchesQuery && matchesStatus && matchesCategory && matchesMaterial && matchesReadyToShip
    );
  });

  const handleEditProduct = (product: RingProduct) => {
    setEditingProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleAddProduct = () => {
    const newProduct: RingProduct = {
      id: Date.now().toString(),
      name: '',
      sku: '',
      category: 'Womens',
      price: 0,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      ringSizes: { us: [], eu: [] },
      ringWidth: [],
      isReadyToShip: true,
      status: 'draft',
      images: [],
      description: '',
    };
    setEditingProduct(newProduct);
    setIsAddingProduct(true);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      if (isAddingProduct) {
        // Add new product
        const newProduct = { ...editingProduct, id: Date.now().toString() };
        setProducts([...products, newProduct]);
        
        // Save to localStorage
        const existing = localStorage.getItem('admin_products');
        const existingProducts = existing ? JSON.parse(existing) : [];
        localStorage.setItem('admin_products', JSON.stringify([...existingProducts, newProduct]));
      } else {
        // Update existing product
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
        
        // Update localStorage
        const existing = localStorage.getItem('admin_products');
        const existingProducts = existing ? JSON.parse(existing) : [];
        const updatedProducts = existingProducts.map((p: RingProduct) => 
          p.id === editingProduct.id ? editingProduct : p
        );
        localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
      }
      
      setEditingProduct(null);
      setIsAddingProduct(false);
      
      // Show success message
      alert(isAddingProduct ? 'Product added successfully!' : 'Product updated successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        setProducts(products.filter(p => p.id !== productId));
        
        // Update localStorage
        const existing = localStorage.getItem('admin_products');
        const existingProducts = existing ? JSON.parse(existing) : [];
        const updatedProducts = existingProducts.filter((p: RingProduct) => p.id !== productId);
        localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ring Products</h1>
          <p className="mt-1 text-gray-600">Manage your handcrafted ring collection</p>
        </div>
                 <Button onClick={handleAddProduct} className="bg-gold-500 hover:bg-gold-600">
           <Plus className="mr-2 h-4 w-4" />
           Add New Ring
         </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search rings by name or SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="all">All Materials</option>
            {materials.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={readyToShip}
            onChange={(e) => setReadyToShip(e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="ready">Ready to Ship</option>
            <option value="custom">Custom Orders</option>
          </select>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price & Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                        <div className="text-xs text-gray-500 truncate">{product.sku}</div>
                        {product.rating && (
                          <div className="mt-1 flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-xs text-gray-500">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {product.material}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <ColorChip gemName={product.gemColor} />
                        <span className="text-xs text-gray-600">
                          {product.gemDensity} • {product.gemVariation}
                        </span>
                      </div>
                      {product.mixColors.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.mixColors.slice(0, 2).map((c) => (
                            <ColorChip key={c} gemName={c} />
                          ))}
                          {product.mixColors.length > 2 && (
                            <span className="text-xs text-gray-500">+{product.mixColors.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">£{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            £{product.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.isReadyToShip ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                            ✓ Ready
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            Custom
                          </Badge>
                        )}
                        {product.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                        ) : product.status === 'draft' ? (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                            Draft
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 text-xs">
                            Archived
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                                         <div className="flex items-center gap-1">
                       <button
                         onClick={() => handleEditProduct(product)}
                         className="p-1.5 text-gold-600 hover:text-gold-700 hover:bg-gold-50 rounded"
                         title="Edit"
                       >
                         <Edit className="h-4 w-4" />
                       </button>
                       <Link
                         href={`/products/${product.id}`}
                         className="p-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded"
                         title="View"
                       >
                         <Eye className="h-4 w-4" />
                       </Link>
                       <button 
                         className="p-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded"
                         title="Duplicate"
                       >
                         <Copy className="h-4 w-4" />
                       </button>
                       <button 
                         onClick={() => handleDeleteProduct(product.id)}
                         className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                         title="Delete"
                       >
                         <Trash2 className="h-4 w-4" />
                       </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No rings found</h3>
            <p className="mb-4 text-gray-600">Try adjusting your search or filters</p>
                         <Button onClick={handleAddProduct} className="bg-gold-500 hover:bg-gold-600">
               <Plus className="mr-2 h-4 w-4" />
               Add Your First Ring
             </Button>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rings</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-2">
              <Settings className="h-6 w-6 text-blue-600" />
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
            <div className="rounded-lg bg-yellow-100 p-2">
              <Star className="h-6 w-6 text-yellow-600" />
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
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </Card>
      </div>

             <BulkActions />

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
                     <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                     <input
                       type="text"
                       value={editingProduct.sku}
                       onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
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
                       onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
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
                 </div>

                 {/* Product Specifications */}
                 <div className="space-y-4">
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
                     <select
                       value={editingProduct.gemColor}
                       onChange={(e) => setEditingProduct({ ...editingProduct, gemColor: e.target.value })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     >
                       {gemColors.map((color) => (
                         <option key={color} value={color}>{color}</option>
                       ))}
                     </select>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Mix Colors (for Custom option)</label>
                     <div className="flex flex-wrap gap-2">
                       {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                         <label key={color} className="flex items-center">
                           <input
                             type="checkbox"
                             checked={editingProduct.mixColors?.includes(color) || false}
                             onChange={(e) => {
                               const newMixColors = e.target.checked
                                 ? [...(editingProduct.mixColors || []), color]
                                 : (editingProduct.mixColors || []).filter(c => c !== color);
                               setEditingProduct({ ...editingProduct, mixColors: newMixColors });
                             }}
                             className="mr-1"
                           />
                           <span className="text-sm">{color}</span>
                         </label>
                       ))}
                     </div>
                   </div>

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

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                     <select
                       value={editingProduct.status}
                       onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as 'active' | 'draft' | 'archived' })}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                     >
                       <option value="active">Active</option>
                       <option value="draft">Draft</option>
                       <option value="archived">Archived</option>
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
