import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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
          images.push(`/images/${relativePath.replace(/\\\\/g, '/')}`);
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
    const images = await getImagesFromDirectory(IMAGES_DIR);

    // Convert to the format expected by the admin panel
    const imageFiles = images.map(imagePath => ({
      name: path.basename(imagePath),
      path: imagePath,
      url: imagePath,
    }));

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error loading images:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}
