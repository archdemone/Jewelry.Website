'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Trash2,
  Eye,
  Download,
  Grid,
  List,
  Search,
  X,
  Image as ImageIcon,
  Copy
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  path: string;
  size: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  source?: 'database' | 'public';
}

interface MediaResponse {
  items: MediaItem[];
  total: number;
}

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    loadCategories();
    loadMediaItems();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch('/api/admin/media?action=categories', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadMediaItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        query: searchQuery
      });

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`/api/admin/media?${params}`, {
        cache: 'no-store'
      });
      if (response.ok) {
        const data: MediaResponse = await response.json();
        setMediaItems(data.items);
      }
    } catch (error) {
      console.error('Error loading media items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);

    try {
      // Upload each file individually to the upload endpoint
      const uploadPromises = Array.from(e.target.files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        // Determine if we should save to public folder or database
        const shouldSaveToPublic = selectedCategory && selectedCategory !== 'database';

        // Save via admin media API
        const mediaResponse = await fetch('/api/admin/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: data.url,
            alt: file.name,
            category: shouldSaveToPublic ? selectedCategory : undefined,
            fileName: shouldSaveToPublic ? file.name : undefined,
          }),
        });

        if (!mediaResponse.ok) {
          const errorData = await mediaResponse.json();
          if (mediaResponse.status === 409) {
            // Media already exists, skip
            return null;
          }
          throw new Error(errorData.error || 'Failed to save to database');
        }

        const mediaData = await mediaResponse.json();
        return mediaData.media;
      });

      const uploadedItems = await Promise.all(uploadPromises);
      const validItems = uploadedItems.filter(item => item !== null);

      if (validItems.length > 0) {
        // Reload media items to show the new files
        await loadMediaItems();
        alert(`${validItems.length} file(s) uploaded successfully!`);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert(`Failed to upload files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/admin/media?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadMediaItems(); // Reload to update the list
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));
        if (previewItem?.id === id) {
          setPreviewItem(null);
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleReplaceFile = async (item: MediaItem, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    try {
      // Extract category and original file extension from item path
      const pathParts = item.path.split('/');
      const category = pathParts[0];

      // Get the original file extension from the item URL
      const originalUrl = item.url;
      const originalExt = originalUrl.split('.').pop() || 'jpg';

      // Create new filename with original extension
      const fileName = item.name + '.' + originalExt;

      // First delete the old file
      await handleDelete(item.id);

      // Then upload the new file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Save to public folder with the original name and extension
      const mediaResponse = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: data.url,
          alt: fileName,
          category: category,
          fileName: fileName,
        }),
      });

      if (mediaResponse.ok) {
        await loadMediaItems();
        alert('File replaced successfully!');
      } else {
        const errorData = await mediaResponse.json();
        throw new Error(errorData.error || 'Failed to save new file');
      }
    } catch (error) {
      console.error('Error replacing file:', error);
      alert(`Failed to replace file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredItems = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage your images and media files</p>
        </div>
        <label className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center cursor-pointer">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
          <input type="file"
            multiple accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      {/* Category Navigation */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        {loadingCategories ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-gray-600">Loading categories...</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedCategory === ''
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
              All Images
            </button>
            <button
              onClick={() => setSelectedCategory('database')}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedCategory === 'database'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
              Uploaded Images
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedCategory === category
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search and View Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text"
              placeholder="Search files..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  loadMediaItems();
                }
              }}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={loadMediaItems}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <Search className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="flex border border-gray-300 rounded-lg">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
            Uploading files...
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading media files...</p>
        </div>
      )}

      {!loading && viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 relative cursor-pointer" onClick={() => setPreviewItem(item)}>
                  <img src={item.url} alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.url);
                      }}
                        className="p-1 bg-white/20 rounded hover:bg-white/30 text-white"
                        title="Copy URL"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <div className="flex gap-1">
                        {item.source === 'public' && (
                          <label className="p-1 bg-white/20 rounded hover:bg-white/30 text-white cursor-pointer"
                            title="Replace File"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Upload className="h-4 w-4" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleReplaceFile(item, e)}
                              className="hidden"
                            />
                          </label>
                        )}
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                          className="p-1 bg-white/20 rounded hover:bg-white/30 text-white"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Name</th>
                <th className="text-left p-4 font-medium text-gray-900">Size</th>
                <th className="text-left p-4 font-medium text-gray-900">Created</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 mr-3">
                        <img src={item.url} alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{formatFileSize(item.size)}</td>
                  <td className="p-4 text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => setPreviewItem(item)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => copyToClipboard(item.url)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Copy URL"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-gray-100 rounded text-red-600"
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
      )}

      {!loading && filteredItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
          <p className="text-gray-600">Upload some files to get started</p>
        </div>
      )}

      {previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewItem(null)}
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">{previewItem.name}</h3>
              <button onClick={() => setPreviewItem(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative flex justify-center items-center" style={{ maxHeight: '70vh' }}>
                <img src={previewItem.url} alt={previewItem.name}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-gray-200 px-2 py-1 rounded">{previewItem.url}</code>
                  <button onClick={() => copyToClipboard(previewItem.url)}
                    className="p-1 hover:bg-gray-300 rounded"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={() => {
                  handleDelete(previewItem.id);
                  setPreviewItem(null);
                }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
