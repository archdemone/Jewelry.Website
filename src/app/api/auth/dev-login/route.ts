import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  // Only allow in development and sandbox
  if (process.env.NODE_ENV === 'production' || process.env.SANDBOX !== '1') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    // Check if admin user exists, if not create one
    let adminUser = await db.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      // Create admin user with user's credentials
      const hashedPassword = await bcrypt.hash('boberpoper34', 12);
      adminUser = await db.user.create({
        data: {
          email: 'admin@jewelry.com',
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

    // Return admin credentials for easy login
    return NextResponse.json({
      message: 'Development admin user ready',
      credentials: {
        email: 'admin@jewelry.com',
        password: 'boberpoper34'
      },
      loginUrl: '/auth/login?callbackUrl=/admin',
      directAdminUrl: '/admin' // Will redirect to login if not authenticated
    });

  } catch (error) {
    console.error('❌ Dev login setup error:', error);
    return NextResponse.json({ error: 'Failed to setup dev login' }, { status: 500 });
  }
}
