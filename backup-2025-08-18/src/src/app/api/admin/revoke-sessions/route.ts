import { requireAdminApi } from '@/lib/admin/admin-auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';

export async function POST() {
  const gate = await requireAdminApi();
  if ((gate as any)?.ok !== true) return gate as Response;
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id as string | undefined;
    if (userId) {
      const user = await db.user.findUnique({ where: { id: userId } });
      await db.user.update({
        where: { id: userId },
        data: { tokenVersion: (user?.tokenVersion || 0) + 1 },
      });
    }
    cookies().delete('mfa_verified');
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
