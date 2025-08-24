import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import fs from 'fs/promises';
import path from 'path';

// Allowed directories for media files
const ALLOWED_DIRS = ['images/MyImages', 'images/products', 'images/banners'];
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role === 'ADMIN';
}

function isPathSafe(filePath: string): boolean {
  const normalized = path.normalize(filePath);
  const resolved = path.resolve(PUBLIC_DIR, normalized);
  return resolved.startsWith(PUBLIC_DIR) && ALLOWED_DIRS.some(dir =>
    normalized.startsWith(dir) || normalized.startsWith('/' + dir)
  );
}

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const files: any[] = [];

    for (const dir of ALLOWED_DIRS) {
      const dirPath = path.join(PUBLIC_DIR, dir);

      try {
        await fs.access(dirPath);
        const items = await fs.readdir(dirPath, { withFileTypes: true });

        for (const item of items) {
          if (item.isFile() && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.name)) {
            const filePath = path.join(dir, item.name);
            const fullPath = path.join(dirPath, item.name);
            const stats = await fs.stat(fullPath);

            files.push({
              name: item.name,
              path: '/' + filePath.replace(/\\\\/g, '/'),
              url: '/' + filePath.replace(/\\\\/g, '/'),
              size: stats.size,
              type: `image/${path.extname(item.name).slice(1).toLowerCase()}`,
              modifiedDate: stats.mtime.toISOString(),
            });
          }
        }
      } catch (error) {
        console.log(`Directory ${dirPath} not found, skipping...`);
      }
    }

    return NextResponse.json(files);
  } catch (error) {
    console.error('Error reading media files:', error);
    return NextResponse.json({ error: 'Failed to load media files' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { path: filePath } = await request.json();

    if (!filePath || !isPathSafe(filePath)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    const fullPath = path.join(PUBLIC_DIR, filePath);

    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Delete the file
    await fs.unlink(fullPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
