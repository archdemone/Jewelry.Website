'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

interface MediaFile {
  name: string;
  path: string;
  url: string;
  size: number;
  type: string;
  modifiedDate: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);

  useEffect(() => {
    loadMediaFiles();
  }, []);

  const loadMediaFiles = async () => {
    try {
      const response = await fetch('/api/admin/media');
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Error loading media files:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    
    Array.from(e.target.files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await loadMediaFiles();
        alert('Files uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (filePath: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: filePath }),
      });

      if (response.ok) {
        setFiles(files.filter(f => f.path !== filePath));
        setSelectedFiles(selectedFiles.filter(p => p !== filePath));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    alert('Path copied to clipboard!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."              value={searchQuery}              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex border border-gray-300 rounded-lg">
            <button              onClick={() => setViewMode('grid')}              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button              onClick={() => setViewMode('list')}              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
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

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <motion.div              key={file.path}              initial={{ opacity: 0, scale: 0.9 }}              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 relative cursor-pointer" onClick={() => setPreviewFile(file)}>
                  <Image              src={file.url}              alt={file.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center">
                      <button              onClick={() => copyToClipboard(file.path)}
                        className="p-1 bg-white/20 rounded hover:bg-white/30 text-white"
                        title="Copy path"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button              onClick={() => handleDelete(file.path)}
                        className="p-1 bg-white/20 rounded hover:bg-white/30 text-white"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Name</th>
                <th className="text-left p-4 font-medium text-gray-900">Size</th>
                <th className="text-left p-4 font-medium text-gray-900">Modified</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.path} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 mr-3">
                        <Image              src={file.url}              alt={file.name}
                          fill
                          className="object-cover rounded"
                          sizes="40px"
                        />
                      </div>
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{formatFileSize(file.size)}</td>
                  <td className="p-4 text-gray-600">{new Date(file.modifiedDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button              onClick={() => setPreviewFile(file)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button              onClick={() => copyToClipboard(file.path)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Copy path"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button              onClick={() => handleDelete(file.path)}
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

      {filteredFiles.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
          <p className="text-gray-600">Upload some files to get started</p>
        </div>
      )}

      {previewFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewFile(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">{previewFile.name}</h3>
              <button              onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative flex justify-center items-center" style={{ maxHeight: '70vh' }}>
                <Image              src={previewFile.url}              alt={previewFile.name}              width={800}              height={600}
                  className="max-w-full max-h-[70vh] object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-gray-200 px-2 py-1 rounded">{previewFile.path}</code>
                  <button              onClick={() => copyToClipboard(previewFile.path)}
                    className="p-1 hover:bg-gray-300 rounded"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button              onClick={() => {
                    handleDelete(previewFile.path);
                    setPreviewFile(null);
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