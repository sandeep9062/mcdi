import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exam } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single exam by slug
      const exams = await db.select().from(exam).where(eq(exam.slug, slug)).limit(1);

      if (exams.length === 0) {
        return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
      }

      return NextResponse.json(exams[0]);
    } else {
      // Get all exams
      const exams = await db.select().from(exam).orderBy(exam.createdAt);

      return NextResponse.json(exams);
    }
  } catch (error) {
    console.error('Error fetching exams:', error);
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
      'slug', 'name', 'fullName', 'country', 'countryFlag',
      'shortDescription', 'fullDescription', 'thumbnail', 'icon',
      'whoIsThisFor', 'whatIncluded', 'studyPlan', 'reviews'
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
    const existingExam = await db.select().from(exam).where(eq(exam.slug, body.slug)).limit(1);
    if (existingExam.length > 0) {
      return NextResponse.json(
        { error: 'Exam with this slug already exists' },
        { status: 409 }
      );
    }

    const newExam = await db.insert(exam).values({
      id: crypto.randomUUID(),
      slug: body.slug,
      name: body.name,
      fullName: body.fullName,
      country: body.country,
      countryFlag: body.countryFlag,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      thumbnail: body.thumbnail,
      icon: body.icon,
      whoIsThisFor: body.whoIsThisFor,
      whatIncluded: body.whatIncluded,
      studyPlan: body.studyPlan,
      reviews: body.reviews,
    }).returning();

    return NextResponse.json(newExam[0], { status: 201 });
  } catch (error) {
    console.error('Error creating exam:', error);
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

    // Check if exam exists
    const existingExam = await db.select().from(exam).where(eq(exam.slug, slug)).limit(1);
    if (!existingExam.length) {
      return NextResponse.json(
        { error: 'Exam not found' },
        { status: 404 }
      );
    }

    // Update exam
    const updatedExam = await db.update(exam)
      .set({
        name: body.name,
        fullName: body.fullName,
        country: body.country,
        countryFlag: body.countryFlag,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        thumbnail: body.thumbnail,
        icon: body.icon,
        whoIsThisFor: body.whoIsThisFor,
        whatIncluded: body.whatIncluded,
        studyPlan: body.studyPlan,
        reviews: body.reviews,
        updatedAt: new Date(),
      })
      .where(eq(exam.slug, slug))
      .returning();

    return NextResponse.json(updatedExam[0]);
  } catch (error) {
    console.error('Error updating exam:', error);
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

    // Check if exam exists
    const existingExam = await db.select().from(exam).where(eq(exam.slug, slug)).limit(1);
    if (!existingExam.length) {
      return NextResponse.json(
        { error: 'Exam not found' },
        { status: 404 }
      );
    }

    // Delete exam
    await db.delete(exam).where(eq(exam.slug, slug));

    return NextResponse.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
