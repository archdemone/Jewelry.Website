import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        addresses: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Transform user data to match frontend interface
    const profile = {
      id: user.id,
      email: user.email,
      firstName: user.name?.split(' ')[0] || '',
      lastName: user.name?.split(' ').slice(1).join(' ') || '',
      phone: user.addresses.find(addr => addr.isDefault)?.phone || '',
      dateOfBirth: null, // Not stored in DB yet
      preferences: {
        emailNotifications: true, // Default values
        smsNotifications: false,
        marketingEmails: true,
      },
    };

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
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
    const { firstName, lastName, phone } = body;

    // Update user in database
    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: {
        name: `${firstName} ${lastName}`.trim(),
        updatedAt: new Date(),
      }
    });

    // Update or create default address with phone
    if (phone) {
      const defaultAddress = await db.address.findFirst({
        where: {
          userId: updatedUser.id,
          isDefault: true
        }
      });

      if (defaultAddress) {
        await db.address.update({
          where: { id: defaultAddress.id },
          data: { phone }
        });
      } else {
        await db.address.create({
          data: {
            userId: updatedUser.id,
            firstName,
            lastName,
            phone,
            isDefault: true,
            type: 'SHIPPING'
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
