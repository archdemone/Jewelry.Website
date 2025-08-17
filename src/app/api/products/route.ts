import { requireAdminApi } from '@/lib/admin/admin-auth';
import { audit } from '@/lib/audit';

export async function POST(req: Request) {
  const gate = await requireAdminApi();
  if ((gate as any)?.ok !== true) return gate as Response;
  try {
    const body = await req.json().catch(() => ({}));
    // TODO: persist to DB
    await audit('product:create', 'product', undefined, null, body);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Unexpected error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
