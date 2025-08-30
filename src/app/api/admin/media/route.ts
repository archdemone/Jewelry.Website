export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin/admin-auth';
import { db } from '@/lib/db';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

// Helper function to get available categories (folders)
async function getAvailableCategories(): Promise<string[]> {
  const publicImagesPath = join(process.cwd(), 'public', 'images');
  const categories: string[] = [];

  try {
    const items = await readdir(publicImagesPath);

    for (const item of items) {
      const fullPath = join(publicImagesPath, item);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        categories.push(item);
      }
    }
  } catch (error) {
    console.error('Error getting categories:', error);
  }

  return categories.sort();
}

// Helper function to recursively scan directory for images
async function scanImagesDirectory(dirPath: string, basePath: string = ''): Promise<Array<{ name: string; url: string; path: string; size: number; type: string; createdAt: Date }>> {
  const images: Array<{ name: string; url: string; path: string; size: number; type: string; createdAt: Date }> = [];

  try {
    const items = await readdir(dirPath);
    console.log(`Scanning directory: ${dirPath}, found ${items.length} items`);

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const relativePath = basePath ? join(basePath, item) : item;
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        console.log(`Found directory: ${item}, scanning recursively`);
        // Recursively scan subdirectories
        const subImages = await scanImagesDirectory(fullPath, relativePath);
        images.push(...subImages);
      } else if (stats.isFile()) {
        // Check if it's an image file (support all common image formats)
        const ext = item.toLowerCase().split('.').pop();
        if (ext && ['webp', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'ico', 'tiff', 'tif'].includes(ext)) {
          const url = `/images/${relativePath}`;
          const name = item.replace(/\.[^/.]+$/, ''); // Remove extension for display name

          console.log(`Found image: ${item} -> ${url}`);
          images.push({
            name,
            url,
            path: relativePath,
            size: stats.size,
            type: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
            createdAt: stats.birthtime,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return images;
}

// POST /api/admin/media (create)
export async function POST(req: NextRequest) {
  try {
    // Auth check
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const { url, alt, category, fileName } = await req.json();

    if (!url) {
      return NextResponse.json({ ok: false, error: 'URL is required' }, { status: 400 });
    }

    // If category and fileName are provided, save to public folder
    if (category && fileName) {
      try {
        // Download the image from the uploaded URL
        const imageResponse = await fetch(url);
        if (!imageResponse.ok) {
          throw new Error('Failed to download image');
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const categoryPath = join(process.cwd(), 'public', 'images', category);

        // Ensure category directory exists
        try {
          await stat(categoryPath);
        } catch {
          // Directory doesn't exist, create it
          const { mkdir } = await import('fs/promises');
          await mkdir(categoryPath, { recursive: true });
        }

        // Save file to the category folder
        const filePath = join(categoryPath, fileName);
        const { writeFile } = await import('fs/promises');
        await writeFile(filePath, Buffer.from(imageBuffer));

        // Get file extension for type
        const fileExt = fileName.split('.').pop()?.toLowerCase() || 'jpeg';

        // Return success with the new file path
        const newUrl = `/images/${category}/${fileName}`;
        return NextResponse.json({
          ok: true,
          media: {
            id: `public-${category}-${fileName}`,
            name: fileName.replace(/\.[^/.]+$/, ''),
            url: newUrl,
            path: `${category}/${fileName}`,
            size: imageBuffer.byteLength,
            type: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            source: 'public'
          }
        });
      } catch (error) {
        console.error('Error saving to public folder:', error);
        return NextResponse.json({ ok: false, error: 'Failed to save file to public folder' }, { status: 500 });
      }
    }

    // Insert into Media (unique on url). Ignore conflict with 409.
    try {
      const media = await db.media.create({
        data: {
          name: alt || 'Untitled',
          url,
          path: url, // Using URL as path for now
          size: 0, // Size not available from URL
          type: 'image/jpeg', // Default type
        },
      });

      return NextResponse.json({ ok: true, media });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Unique constraint violation
        return NextResponse.json({ ok: false, error: 'Media already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Media creation error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/admin/media (list)
export async function GET(req: NextRequest) {
  try {
    // Auth check
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    // If action is 'categories', return available categories
    if (action === 'categories') {
      const categories = await getAvailableCategories();
      return NextResponse.json({ categories });
    }

    // Regular media list logic
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '24');
    const offset = (page - 1) * pageSize;

    // Get database items (only for database category or all images)
    const where = query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { url: { contains: query, mode: 'insensitive' } },
      ],
    } : {};

    let dbItems = await db.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // If we're viewing a specific public category, filter out database items that belong to that category
    if (category && category !== 'database' && category !== '') {
      dbItems = dbItems.filter(item => {
        // Check if the database item URL points to the same category folder
        const itemPath = item.url;
        return !itemPath.includes(`/images/${category}/`);
      });
    }

    // Get public images based on category
    const publicImagesPath = join(process.cwd(), 'public', 'images');
    let publicImages: Array<{ name: string; url: string; path: string; size: number; type: string; createdAt: Date }> = [];

    if (category === 'database') {
      // For database category, don't include any public images
      publicImages = [];
    } else if (category === '') {
      // For "All Images" category, get all public images
      publicImages = await scanImagesDirectory(publicImagesPath);
    } else if (category) {
      // Get images from specific category folder
      const categoryPath = join(publicImagesPath, category);
      try {
        publicImages = await scanImagesDirectory(categoryPath, category);
      } catch (error) {
        console.error(`Error scanning category ${category}:`, error);
        publicImages = [];
      }
    }

    // Filter public images by query if provided
    const filteredPublicImages = query
      ? publicImages.filter(img =>
        img.name.toLowerCase().includes(query.toLowerCase()) ||
        img.url.toLowerCase().includes(query.toLowerCase())
      )
      : publicImages;

    // Combine and sort all items (database items first, then public images)
    const allItems = [
      ...dbItems.map(item => ({
        ...item,
        source: 'database' as const,
      })),
      ...filteredPublicImages.map(item => ({
        id: `public-${item.path.replace(/[^a-zA-Z0-9]/g, '-')}`,
        name: item.name,
        url: item.url,
        path: item.path,
        size: item.size,
        type: item.type,
        createdAt: item.createdAt,
        updatedAt: item.createdAt,
        uploadedBy: null,
        source: 'public' as const,
      }))
    ];

    // Sort by creation date (newest first)
    allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Remove pagination - show all items
    const total = allItems.length;
    const items = allItems;

    const response = NextResponse.json({ items, total });
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error: any) {
    console.error('Media list error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/media?id=...
export async function DELETE(req: NextRequest) {
  try {
    // Auth check
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID is required' }, { status: 400 });
    }

    // Handle public file deletion
    if (id.startsWith('public-')) {
      try {
        // Extract path from ID (public-category-filename)
        const pathParts = id.replace('public-', '').split('-');
        const category = pathParts[0];
        const fileName = pathParts.slice(1).join('-');

        const filePath = join(process.cwd(), 'public', 'images', category, fileName);
        const { unlink } = await import('fs/promises');
        await unlink(filePath);

        return NextResponse.json({ ok: true });
      } catch (error) {
        console.error('Error deleting public file:', error);
        return NextResponse.json({ ok: false, error: 'Failed to delete file' }, { status: 500 });
      }
    }

    // Delete from database
    await db.media.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Media deletion error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
