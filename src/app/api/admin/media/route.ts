import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { db } from '@/lib/db';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role === 'ADMIN';
}

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get media files from database
    const mediaFiles = await db.media.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Transform to match expected format
    const files = mediaFiles.map(file => ({
      name: file.name,
      path: file.url, // Use Blob URL as path
      url: file.url,  // Use Blob URL
      size: file.size,
      type: file.type,
      modifiedDate: file.updatedAt.toISOString(),
    }));
    
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error reading media files:', error);
    return NextResponse.json({ error: 'Failed to load media files' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, url, path, size, type } = await request.json();
    
    // Save media file to database
    const mediaFile = await db.media.create({
      data: {
        name,
        url,
        path,
        size,
        type,
      }
    });
    
    return NextResponse.json(mediaFile);
  } catch (error) {
    console.error('Error saving media file:', error);
    return NextResponse.json({ error: 'Failed to save media file' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { path: filePath } = await request.json();
    
    if (!filePath) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }
    
    // Delete from database
    await db.media.deleteMany({
      where: { url: filePath }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
