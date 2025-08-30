import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdminApi } from '@/lib/admin/admin-auth';

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;

  const secret = process.env.REVALIDATE_TOKEN;
  try {
    const body = await req.json().catch(() => ({}));
    const token = req.nextUrl.searchParams.get('secret') || body.secret;
    if (!secret || token !== secret) {
      return new Response(JSON.stringify({ revalidated: false, message: 'Invalid token' }), {
        status: 401,
      });
    }

    const path = req.nextUrl.searchParams.get('path') || body.path;
    const tag = req.nextUrl.searchParams.get('tag') || body.tag;

    if (path) revalidatePath(path);
    if (tag) revalidateTag(tag);

    return new Response(JSON.stringify({ revalidated: true, path, tag }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ revalidated: false, message: err?.message || 'Error' }), {
      status: 500,
    });
  }
}
