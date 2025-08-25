import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { db } from '@/lib/db';
import { z } from 'zod';

// Validation schema for address updates
const addressUpdateSchema = z.object({
  label: z.string().min(1, 'Label is required').max(50, 'Label is too long'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  company: z.string().optional(),
  address1: z.string().min(1, 'Address line 1 is required').max(100, 'Address is too long'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required').max(50, 'City name is too long'),
  state: z.string().min(1, 'State/Province is required').max(50, 'State name is too long'),
  postalCode: z.string().min(1, 'Postal code is required').max(20, 'Postal code is too long'),
  country: z.string().min(1, 'Country is required').max(50, 'Country name is too long'),
  phone: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = addressUpdateSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the address belongs to the user
    const existingAddress = await db.address.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // If this is being set as default, unset other default addresses
    if (validatedData.isDefault) {
      await db.address.updateMany({
        where: { 
          userId: user.id,
          id: { not: params.id }
        },
        data: { isDefault: false },
      });
    }

    const updatedAddress = await db.address.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json({ 
      message: 'Address updated successfully',
      address: updatedAddress 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the address belongs to the user
    const existingAddress = await db.address.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    await db.address.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ 
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}