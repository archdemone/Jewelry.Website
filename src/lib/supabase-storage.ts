import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client for storage operations
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (with service role key) for admin operations
const createServerSupabaseClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export interface UploadedFile {
  name: string
  path: string
  url: string
  size: number
  type: string
  uploadedAt: string
}

// Upload a single file to Supabase Storage
export async function uploadFile(
  file: File, 
  bucket: string = 'product-images',
  folder: string = 'products'
): Promise<UploadedFile> {
  try {
    // Generate unique filename
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${safeName}`
    const filePath = `${folder}/${fileName}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      name: fileName,
      path: filePath,
      url: urlData.publicUrl,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

// Upload multiple files
export async function uploadMultipleFiles(
  files: File[], 
  bucket: string = 'product-images',
  folder: string = 'products'
): Promise<UploadedFile[]> {
  const uploadPromises = files.map(file => uploadFile(file, bucket, folder))
  return Promise.all(uploadPromises)
}

// Get all files from a bucket/folder
export async function getFiles(
  bucket: string = 'product-images',
  folder: string = 'products'
): Promise<UploadedFile[]> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`)
    }

    if (!data) return []

    // Convert to our format and get public URLs
    const files: UploadedFile[] = await Promise.all(
      data.map(async (file) => {
        const filePath = `${folder}/${file.name}`
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath)

        return {
          name: file.name,
          path: filePath,
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          type: file.metadata?.mimetype || 'image/jpeg',
          uploadedAt: file.created_at || new Date().toISOString()
        }
      })
    )

    return files
  } catch (error) {
    console.error('Error getting files:', error)
    throw error
  }
}

// Delete a file from storage
export async function deleteFile(
  path: string,
  bucket: string = 'product-images'
): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw new Error(`Delete failed: ${error.message}`)
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// Server-side function to create bucket (admin only)
export async function createBucket(bucketName: string = 'product-images'): Promise<void> {
  try {
    const supabase = createServerSupabaseClient()
    
    const { error } = await supabase.storage.createBucket(bucketName, {
      public: true, // Make bucket public so images can be accessed
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 52428800 // 50MB limit
    })

    if (error) {
      throw new Error(`Failed to create bucket: ${error.message}`)
    }
  } catch (error) {
    console.error('Error creating bucket:', error)
    throw error
  }
}

// Get storage usage statistics
export async function getStorageStats(bucket: string = 'product-images'): Promise<{
  totalFiles: number
  totalSize: number
}> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list('', {
        limit: 1000
      })

    if (error) {
      throw new Error(`Failed to get storage stats: ${error.message}`)
    }

    const totalFiles = data?.length || 0
    const totalSize = data?.reduce((sum, file) => sum + (file.metadata?.size || 0), 0) || 0

    return { totalFiles, totalSize }
  } catch (error) {
    console.error('Error getting storage stats:', error)
    throw error
  }
}