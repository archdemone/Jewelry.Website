import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Recursively get all image files from a directory
async function getImagesFromDirectory(dirPath: string, basePath: string = ''): Promise<string[]> {
  const images: string[] = [];

  try {
    const items = await fs.readdir(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = path.join(basePath, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        const subImages = await getImagesFromDirectory(fullPath, relativePath);
        images.push(...subImages);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
          images.push(`/images/${relativePath.replace(/\\/g, '/')}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return images;
}

// Get all available images
export async function GET() {
  try {
    // Get public images
    const publicImages = await getImagesFromDirectory(IMAGES_DIR);

    // Get database images
    const dbImages = await db.media.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Convert public images to the format expected by the admin panel
    const publicImageFiles = publicImages.map(imagePath => ({
      name: path.basename(imagePath),
      path: imagePath,
      url: imagePath,
      source: 'public' as const,
    }));

    // Convert database images to the format expected by the admin panel
    const dbImageFiles = dbImages.map(item => ({
      name: item.name,
      path: item.url,
      url: item.url,
      source: 'database' as const,
    }));

    // Combine and sort (database items first, then public images)
    const allImages = [...dbImageFiles, ...publicImageFiles];

    return NextResponse.json(allImages);
  } catch (error) {
    console.error('Error loading images:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}
