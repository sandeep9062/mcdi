import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testSeries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single test series by slug
      const testSeriesData = await db.select().from(testSeries).where(eq(testSeries.slug, slug)).limit(1);

      if (testSeriesData.length === 0) {
        return NextResponse.json({ error: 'Test Series not found' }, { status: 404 });
      }

      return NextResponse.json(testSeriesData[0]);
    } else {
      // Get all test series
      const testSeriesData = await db.select().from(testSeries).orderBy(testSeries.createdAt);

      return NextResponse.json(testSeriesData);
    }
  } catch (error) {
    console.error('Error fetching test series:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const authResult = await requireAdmin(request);
    if (!authResult.success) {
      return authResult.response!;
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'slug', 'title', 'shortDescription', 'fullDescription', 'price',
      'thumbnails', 'category', 'examType', 'duration', 'rating', 'reviewCount',
      'questionsCount', 'difficulty', 'whatIncluded', 'sampleQuestions'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate that thumbnails is an array
    if (!Array.isArray(body.thumbnails)) {
      return NextResponse.json(
        { error: 'Thumbnails must be an array' },
        { status: 400 }
      );
    }

    // Validate that thumbnails array is not empty
    if (body.thumbnails.length === 0) {
      return NextResponse.json(
        { error: 'Thumbnails array cannot be empty' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingTestSeries = await db.select().from(testSeries).where(eq(testSeries.slug, body.slug)).limit(1);
    if (existingTestSeries.length > 0) {
      return NextResponse.json(
        { error: 'Test Series with this slug already exists' },
        { status: 409 }
      );
    }

    const newTestSeries = await db.insert(testSeries).values({
      id: crypto.randomUUID(),
      slug: body.slug,
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
      featured: body.featured || false,
      questionsCount: body.questionsCount,
      difficulty: body.difficulty,
      whatIncluded: body.whatIncluded,
      sampleQuestions: body.sampleQuestions,
    }).returning();

    return NextResponse.json(newTestSeries[0], { status: 201 });
  } catch (error) {
    console.error('Error creating test series:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication and admin role
    const authResult = await requireAdmin(request);
    if (!authResult.success) {
      return authResult.response!;
    }

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter required for update' },
        { status: 400 }
      );
    }

    // Check if test series exists
    const existingTestSeries = await db.select().from(testSeries).where(eq(testSeries.slug, slug)).limit(1);
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
      .where(eq(testSeries.slug, slug))
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

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication and admin role
    const authResult = await requireAdmin(request);
    if (!authResult.success) {
      return authResult.response!;
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter required for deletion' },
        { status: 400 }
      );
    }

    // Check if test series exists
    const existingTestSeries = await db.select().from(testSeries).where(eq(testSeries.slug, slug)).limit(1);
    if (!existingTestSeries.length) {
      return NextResponse.json(
        { error: 'Test Series not found' },
        { status: 404 }
      );
    }

    // Delete test series
    await db.delete(testSeries).where(eq(testSeries.slug, slug));

    return NextResponse.json({ message: 'Test Series deleted successfully' });
  } catch (error) {
    console.error('Error deleting test series:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
