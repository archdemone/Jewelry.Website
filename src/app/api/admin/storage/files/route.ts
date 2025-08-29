import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'
import { getFiles, getStorageStats } from '@/lib/supabase-storage'

async function isAdmin() {
  const session = await getServerSession(authOptions)
  return (session?.user as any)?.role === 'ADMIN'
}

export async function GET(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get('bucket') || 'product-images'
    const folder = searchParams.get('folder') || 'products'

    const files = await getFiles(bucket, folder)
    const stats = await getStorageStats(bucket)

    return NextResponse.json({
      files,
      stats,
      bucket,
      folder
    })
  } catch (error) {
    console.error('Error getting files from Supabase:', error)
    return NextResponse.json({ 
      error: 'Failed to get files',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { path, bucket = 'product-images' } = await request.json()

    if (!path) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 })
    }

    const { deleteFile } = await import('@/lib/supabase-storage')
    await deleteFile(path, bucket)

    return NextResponse.json({ 
      success: true,
      message: 'File deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting file from Supabase:', error)
    return NextResponse.json({ 
      error: 'Failed to delete file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}