import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdminApi } from '@/lib/admin/admin-auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function ok(json: any, init?: number) {
  return NextResponse.json({ ok: true, ...json }, { status: init || 200 });
}

function bad(error: string, code = 400) {
  return NextResponse.json({ ok: false, error }, { status: code });
}

export async function POST(req: Request) {
  try {
    // Check for required environment variables
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('Missing BLOB_READ_WRITE_TOKEN environment variable');
      return bad('Upload service not configured', 503);
    }

    // Auth check - using correct pattern
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const form = await req.formData();
    const file = form.get('file') as unknown as File | null;

    if (!file) {
      return bad('No file provided');
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return bad('Unsupported file type', 415);
    }

    if (file.size > MAX_FILE_SIZE) {
      return bad('File too large', 413);
    }

    const ext = file.name.split('.').pop() || 'bin';
    const key = `products/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    try {
      const blob = await put(key, file, { access: 'public' });
      return ok({ url: blob.url, key: blob.pathname });
    } catch (blobError: any) {
      console.error('Vercel Blob upload error:', blobError);
      return bad(`Upload failed: ${blobError.message || 'Unknown error'}`, 500);
    }
  } catch (err: any) {
    console.error('Upload endpoint error:', err);
    const msg = err?.message || 'Upload failed';
    return bad(msg, 500);
  }
}
