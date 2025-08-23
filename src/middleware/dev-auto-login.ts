import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function devAutoLogin(request: NextRequest) {
  // Only run in development and only for sandbox
  if (process.env.NODE_ENV === 'production' || process.env.SANDBOX !== '1') {
    return NextResponse.next();
  }

  const session = await getServerSession(authOptions);

  // If already logged in, continue
  if (session?.user) {
    return NextResponse.next();
  }

  try {
    // Check if admin user exists, if not create one
    let adminUser = await db.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      // Create admin user with default credentials
      const hashedPassword = await bcrypt.hash('admin123', 12);
      adminUser = await db.user.create({
        data: {
          email: 'admin@jewelry-shop.dev',
          name: 'Admin User',
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: new Date(),
          mfaEnabled: false,
          tokenVersion: 0,
        }
      });
      console.log('🛠️  Created development admin user:', adminUser.email);
    }

    // For development auto-login, we'll use a simple approach
    // In a real scenario, you'd want to use NextAuth's signIn function
    // But for simplicity, we'll create a session cookie directly

    console.log('🔓 Development auto-login: Admin user ready for login');

    // Continue to normal flow - user will need to login manually
    // but the admin user is ready with credentials:
    // Email: admin@jewelry-shop.dev
    // Password: admin123

    return NextResponse.next();
  } catch (error) {
    console.error('❌ Dev auto-login error:', error);
    return NextResponse.next();
  }
}
