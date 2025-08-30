import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // If user doesn't exist, create them
    if (!user) {
      user = await db.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || session.user.email.split('@')[0],
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone } = body;

    // Try to update existing user, or create if doesn't exist
    let updatedUser = await db.user.upsert({
      where: { email: session.user.email },
      update: {
        name: name || undefined,
        phone: phone || undefined,
      },
      create: {
        email: session.user.email,
        name: name || session.user.name || session.user.email.split('@')[0],
        phone: phone || undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
