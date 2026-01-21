import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { course } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const courses = await db.select().from(course).where(eq(course.id, id)).limit(1);

    if (courses.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(courses[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
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

    // Check if course exists
    const existingCourse = await db.select().from(course).where(eq(course.id, id)).limit(1);
    if (!existingCourse.length) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Update course
    const updatedCourse = await db.update(course)
      .set({
        title: body.title,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        price: body.price,
        originalPrice: body.originalPrice,
        thumbnail: body.thumbnail,
        category: body.category,
        mode: body.mode,
        duration: body.duration,
        rating: body.rating,
        reviewCount: body.reviewCount,
        featured: body.featured,
        popular: body.popular,
        whatYouLearn: body.whatYouLearn,
        curriculum: body.curriculum,
        whoIsThisFor: body.whoIsThisFor,
        faculty: body.faculty,
        faqs: body.faqs,
        updatedAt: new Date(),
      })
      .where(eq(course.id, id))
      .returning();

    return NextResponse.json(updatedCourse[0]);
  } catch (error) {
    console.error('Error updating course:', error);
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

    // Check if course exists
    const existingCourse = await db.select().from(course).where(eq(course.id, id)).limit(1);
    if (!existingCourse.length) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Delete course
    await db.delete(course).where(eq(course.id, id));

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
