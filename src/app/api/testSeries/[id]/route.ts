import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testSeries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const testSeriesData = await db.select().from(testSeries).where(eq(testSeries.id, id)).limit(1);

    if (testSeriesData.length === 0) {
      return NextResponse.json({ error: 'Test Series not found' }, { status: 404 });
    }

    return NextResponse.json(testSeriesData[0]);
  } catch (error) {
    console.error('Error fetching test series:', error);
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

    // Check if test series exists
    const existingTestSeries = await db.select().from(testSeries).where(eq(testSeries.id, id)).limit(1);
    if (!existingTestSeries.length) {
      return NextResponse.json(
        { error: 'Test Series not found' },
        { status: 404 }
      );
    }

    // Update test series
    const updatedTestSeries = await db.update(testSeries)
      .set({
        title: body.title,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        price: body.price,
        originalPrice: body.originalPrice,
        thumbnails: body.thumbnails,
        category: body.category,
        examType: body.examType,
        duration: body.duration,
        rating: body.rating,
        reviewCount: body.reviewCount,
        featured: body.featured,
        questionsCount: body.questionsCount,
        difficulty: body.difficulty,
        whatIncluded: body.whatIncluded,
        sampleQuestions: body.sampleQuestions,
        updatedAt: new Date(),
      })
      .where(eq(testSeries.id, id))
      .returning();

    return NextResponse.json(updatedTestSeries[0]);
  } catch (error) {
    console.error('Error updating test series:', error);
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

    // Check if test series exists
    const existingTestSeries = await db.select().from(testSeries).where(eq(testSeries.id, id)).limit(1);
    if (!existingTestSeries.length) {
      return NextResponse.json(
        { error: 'Test Series not found' },
        { status: 404 }
      );
    }

    // Delete test series
    await db.delete(testSeries).where(eq(testSeries.id, id));

    return NextResponse.json({ message: 'Test Series deleted successfully' });
  } catch (error) {
    console.error('Error deleting test series:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
