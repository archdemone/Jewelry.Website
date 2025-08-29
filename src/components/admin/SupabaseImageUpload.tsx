'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Upload, X, Image as ImageIcon, Search, Grid, List, Trash2, Copy } from 'lucide-react'
import { UploadedFile } from '@/lib/supabase-storage'

interface SupabaseImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
}

export function SupabaseImageUpload({ images, onImagesChange }: SupabaseImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [showGallery, setShowGallery] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load uploaded files on component mount
  useEffect(() => {
    loadUploadedFiles()
  }, [])

  const loadUploadedFiles = async () => {
    try {
      const response = await fetch('/api/admin/storage/files')
      if (response.ok) {
        const data = await response.json()
        setUploadedFiles(data.files || [])
      }
    } catch (error) {
      console.error('Error loading uploaded files:', error)
    }
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    setIsUploading(true)
    const formData = new FormData()
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        formData.append('files', file)
      }
    })

    try {
      const response = await fetch('/api/admin/storage/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        // Add newly uploaded files to the list
        setUploadedFiles(prev => [...result.files, ...prev])
        // Optionally add to current product images
        const newUrls = result.files.map((file: UploadedFile) => file.url)
        onImagesChange([...images, ...newUrls])
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const addImageFromGallery = (url: string) => {
    if (!images.includes(url)) {
      onImagesChange([...images, url])
    }
    setShowGallery(false)
  }

  const deleteUploadedFile = async (file: UploadedFile) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch('/api/admin/storage/files', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: file.path })
      })

      if (response.ok) {
        setUploadedFiles(prev => prev.filter(f => f.path !== file.path))
        // Remove from current product images if it's there
        const newImages = images.filter(img => img !== file.url)
        onImagesChange(newImages)
      }
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  const filteredFiles = uploadedFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
        isDragOver
          ? 'border-gold-500 bg-gold-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-600">Drag and drop images here, or</p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-sm text-gold-600 hover:text-gold-700"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'browse files'}
        </button>
        <p className="text-xs text-gray-500">PNG, JPG, WebP up to 50MB</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Gallery Button */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowGallery(!showGallery)}
          className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700"
        >
          <ImageIcon className="h-4 w-4" />
          {showGallery ? 'Hide Gallery' : 'Browse Uploaded Images'}
        </button>
        <span className="text-xs text-gray-500">
          {uploadedFiles.length} images available
        </span>
      </div>

      {/* Image Gallery */}
      {showGallery && (
        <div className="border rounded-lg p-4 bg-gray-50">
          {/* Gallery Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm border rounded px-2 py-1 w-48"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gold-100 text-gold-600' : 'text-gray-400'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-gold-100 text-gold-600' : 'text-gray-400'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Gallery Content */}
          {filteredFiles.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No images found</p>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-4 gap-3' 
              : 'space-y-2'
            }>
              {filteredFiles.map((file) => (
                <div
                  key={file.path}
                  className={`relative group border rounded-lg overflow-hidden ${
                    viewMode === 'list' ? 'flex items-center p-2' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill={viewMode === 'grid'}
                    width={viewMode === 'list' ? 60 : undefined}
                    height={viewMode === 'list' ? 60 : undefined}
                    className={`object-cover ${
                      viewMode === 'list' ? 'rounded mr-3' : ''
                    }`}
                    sizes="200px"
                  />
                  
                  {viewMode === 'list' && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className={`absolute top-1 right-1 flex gap-1 ${
                    viewMode === 'list' ? 'relative top-0 right-0' : ''
                  }`}>
                    <button
                      type="button"
                      onClick={() => addImageFromGallery(file.url)}
                      className="p-1 bg-green-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Add to product"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => copyImageUrl(file.url)}
                      className="p-1 bg-blue-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy URL"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteUploadedFile(file)}
                      className="p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Current Product Images */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Current Product Images:</h4>
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative group h-24">
                <Image
                  src={image}
                  alt={`Product ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  sizes="200px"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}