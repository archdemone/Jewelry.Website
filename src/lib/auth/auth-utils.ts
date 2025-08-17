import { db } from '@/lib/db';
import { randomBytes } from 'crypto';

export async function createPasswordResetToken(email: string) {
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  // Remove existing tokens for this identifier
  await db.verificationToken.deleteMany({ where: { identifier: email } });
  await db.verificationToken.create({ data: { identifier: email, token, expires } });
  return { token, expires };
}

export async function consumePasswordResetToken(token: string) {
  const record = await db.verificationToken.findUnique({ where: { token } });
  if (!record) return null;
  if (record.expires < new Date()) {
    // Cleanup expired
    await db.verificationToken.delete({ where: { token } });
    return null;
  }
  // Delete token after consumption
  await db.verificationToken.delete({ where: { token } });
  return record.identifier; // email
}
