import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/admin-auth';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export default async function EnrollMfaPage() {
  const session = await requireAdmin();
  const userId = (session.user as any).id as string;
  const user = await db.user.findUnique({ where: { id: userId } });
  let secret = user?.mfaSecret;
  if (!secret) {
    secret = authenticator.generateSecret();
    await db.user.update({ where: { id: userId }, data: { mfaSecret: secret, mfaEnabled: true } });
  }
  const otpauth = authenticator.keyuri(user?.email || 'admin', 'Aurora Admin', secret);
  const qr = await QRCode.toDataURL(otpauth);
  return (
    <div className="max-w-md">
      <h1 className="mb-4 text-2xl font-semibold">Enroll MFA</h1>
      <p className="mb-4 text-sm text-gray-600">
        Scan this QR with your authenticator app and enter the 6-digit code in the next step.
      </p>
      <img src={qr} alt="MFA QR" className="rounded border" />
      <div className="mt-4 text-sm text-gray-600">
        If you cannot scan, use secret: <code>{secret}</code>
      </div>
      <a href="/admin/mfa/verify" className="mt-6 inline-block underline">
        Continue to verify
      </a>
    </div>
  );
}
