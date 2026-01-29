import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { course } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single course by slug
      const courses = await db.select().from(course).where(eq(course.slug, slug)).limit(1);

      if (courses.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      return NextResponse.json(courses[0]);
    } else {
      // Get all courses
      const courses = await db.select().from(course).orderBy(course.createdAt);

      return NextResponse.json(courses);
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
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
      'thumbnails', 'category', 'mode', 'duration', 'rating', 'reviewCount',
      'whatYouLearn', 'curriculum', 'whoIsThisFor', 'faculty', 'faqs'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if slug already exists
    const existingCourse = await db.select().from(course).where(eq(course.slug, body.slug)).limit(1);
    if (existingCourse.length > 0) {
      return NextResponse.json(
        { error: 'Course with this slug already exists' },
        { status: 409 }
      );
    }

    const newCourse = await db.insert(course).values({
      id: crypto.randomUUID(),
      slug: body.slug,
      title: body.title,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      price: body.price,
      originalPrice: body.originalPrice,
      thumbnails: body.thumbnails,
      category: body.category,
      mode: body.mode,
      duration: body.duration,
      rating: body.rating,
      reviewCount: body.reviewCount,
      featured: body.featured || false,
      popular: body.popular || false,
      whatYouLearn: body.whatYouLearn,
      curriculum: body.curriculum,
      whoIsThisFor: body.whoIsThisFor,
      faculty: body.faculty,
      faqs: body.faqs,
    }).returning();

    return NextResponse.json(newCourse[0], { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
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

    // Check if course exists
    const existingCourse = await db.select().from(course).where(eq(course.slug, slug)).limit(1);
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
        thumbnails: body.thumbnails,
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
      .where(eq(course.slug, slug))
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

    // Check if course exists
    const existingCourse = await db.select().from(course).where(eq(course.slug, slug)).limit(1);
    if (!existingCourse.length) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Delete course
    await db.delete(course).where(eq(course.slug, slug));

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
