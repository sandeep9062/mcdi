import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { review } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reviews = await db.select().from(review).where(eq(review.id, id)).limit(1);

    if (reviews.length === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(reviews[0]);
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and admin role
    const authResult = await requireAdmin(request);
    if (!authResult.success) {
      return authResult.response!;
    }

    const { id } = await params;
    const body = await request.json();

    // Check if review exists
    const existingReview = await db.select().from(review).where(eq(review.id, id)).limit(1);
    if (!existingReview.length) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Update review
    const updatedReview = await db.update(review)
      .set({
        name: body.name,
        course: body.course,
        rating: body.rating,
        date: body.date,
        text: body.text,
        avatar: body.avatar,
        verified: body.verified,
        updatedAt: new Date(),
      })
      .where(eq(review.id, id))
      .returning();

    return NextResponse.json(updatedReview[0]);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and admin role
    const authResult = await requireAdmin(request);
    if (!authResult.success) {
      return authResult.response!;
    }

    const { id } = await params;

    // Check if review exists
    const existingReview = await db.select().from(review).where(eq(review.id, id)).limit(1);
    if (!existingReview.length) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Delete review
    await db.delete(review).where(eq(review.id, id));

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
