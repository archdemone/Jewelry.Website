import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'
import { uploadMultipleFiles, createBucket } from '@/lib/supabase-storage'

async function isAdmin() {
  const session = await getServerSession(authOptions)
  return (session?.user as any)?.role === 'ADMIN'
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Filter for image files only
    const imageFiles = files.filter(file => 
      file && typeof file === 'object' && file.type.startsWith('image/')
    )

    if (imageFiles.length === 0) {
      return NextResponse.json({ error: 'No valid image files provided' }, { status: 400 })
    }

    // Try to create bucket if it doesn't exist (this will fail silently if it already exists)
    try {
      await createBucket('product-images')
    } catch (error) {
      // Bucket might already exist, continue
      console.log('Bucket creation skipped (likely already exists)')
    }

    // Upload files to Supabase Storage
    const uploadedFiles = await uploadMultipleFiles(imageFiles, 'product-images', 'products')

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      message: `Uploaded ${uploadedFiles.length} file(s) successfully` 
    })
  } catch (error) {
    console.error('Error uploading files to Supabase:', error)
    return NextResponse.json({ 
      error: 'Failed to upload files',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}