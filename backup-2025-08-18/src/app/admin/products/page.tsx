'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  Star
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

  // Sample data with your ring specifications
  const products: RingProduct[] = [
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
      description: 'Beautiful handcrafted silver ring with dark red gem inlay.'
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
      description: 'Stunning Damascus steel wedding ring with bright blue gem inlay.'
    },
    {
      id: 'p3',
      name: "Unisex Carbon Inlay Ring - Mixed Green",
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
      description: 'Lightweight carbon ring with mixed green and blue gem inlay.'
    }
  ];

  const categories = ['Wedding', 'Inlay Ring', 'Couple Ring Set', 'Mens', 'Womens', 'Unisex', 'Single Inlay', 'Double Inlay'];
  const materials = ['Silver', 'Damascus', 'Ceramic(white)', 'Ceramic(black)', 'Carbon', 'Tungsten', 'Titanium', 'Stainless Steel', 'Gold'];
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesQuery = query === '' || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase());
    
    const matchesStatus = status === 'all' || product.status === status;
    const matchesCategory = category === 'all' || product.category === category;
    const matchesMaterial = material === 'all' || product.material === material;
    const matchesReadyToShip = readyToShip === 'all' || 
      (readyToShip === 'ready' && product.isReadyToShip) ||
      (readyToShip === 'custom' && !product.isReadyToShip);

    return matchesQuery && matchesStatus && matchesCategory && matchesMaterial && matchesReadyToShip;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ring Products</h1>
          <p className="text-gray-600 mt-1">Manage your handcrafted ring collection</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gold-500 hover:bg-gold-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Ring
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search rings by name or SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="all">All Materials</option>
            {materials.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            value={readyToShip}
            onChange={(e) => setReadyToShip(e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="ready">Ready to Ship</option>
            <option value="custom">Custom Orders</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gem Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                        {product.images[0] && (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.subCategory}</div>
                        {product.rating && (
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-500 ml-1">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{product.category}</div>
                    {product.subCategory && (
                      <div className="text-xs text-gray-500">{product.subCategory}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-xs">
                      {product.material}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.gemColor}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {product.gemDensity} • {product.gemVariation}
                        </span>
                      </div>
                      {product.mixColors.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Mix: {product.mixColors.join(', ')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">£{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          £{product.originalPrice}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.isReadyToShip ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        ✓ Ready to Ship
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Custom Order
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : product.status === 'draft' ? (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Draft</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">Archived</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/products/${product.id}`}
                        className="text-gold-600 hover:text-gold-700 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/products/${product.id}`}
                        className="text-gray-600 hover:text-gray-700 p-1"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="text-gray-600 hover:text-gray-700 p-1">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Link href="/admin/products/new">
              <Button className="bg-gold-500 hover:bg-gold-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Ring
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rings</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready to Ship</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.isReadyToShip).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <BulkActions />
    </div>
  );
}
