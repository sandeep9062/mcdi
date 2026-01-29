import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dentistRegistration } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single dentist registration by slug
      const registrations = await db.select().from(dentistRegistration).where(eq(dentistRegistration.slug, slug)).limit(1);

      if (registrations.length === 0) {
        return NextResponse.json({ error: 'Dentist registration not found' }, { status: 404 });
      }

      return NextResponse.json(registrations[0]);
    } else {
      // Get all dentist registrations
      const registrations = await db.select().from(dentistRegistration).orderBy(dentistRegistration.createdAt);

      return NextResponse.json(registrations);
    }
  } catch (error) {
    console.error('Error fetching dentist registrations:', error);
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
    const existingRegistration = await db.select().from(dentistRegistration).where(eq(dentistRegistration.slug, body.slug)).limit(1);
    if (existingRegistration.length > 0) {
      return NextResponse.json(
        { error: 'Dentist registration with this slug already exists' },
        { status: 409 }
      );
    }

    const newRegistration = await db.insert(dentistRegistration).values({
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

    return NextResponse.json(newRegistration[0], { status: 201 });
  } catch (error) {
    console.error('Error creating dentist registration:', error);
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

    // Check if dentist registration exists
    const existingRegistration = await db.select().from(dentistRegistration).where(eq(dentistRegistration.slug, slug)).limit(1);
    if (!existingRegistration.length) {
      return NextResponse.json(
        { error: 'Dentist registration not found' },
        { status: 404 }
      );
    }

    // Update dentist registration
    const updatedRegistration = await db.update(dentistRegistration)
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
      .where(eq(dentistRegistration.slug, slug))
      .returning();

    return NextResponse.json(updatedRegistration[0]);
  } catch (error) {
    console.error('Error updating dentist registration:', error);
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

    // Check if dentist registration exists
    const existingRegistration = await db.select().from(dentistRegistration).where(eq(dentistRegistration.slug, slug)).limit(1);
    if (!existingRegistration.length) {
      return NextResponse.json(
        { error: 'Dentist registration not found' },
        { status: 404 }
      );
    }

    // Delete dentist registration
    await db.delete(dentistRegistration).where(eq(dentistRegistration.slug, slug));

    return NextResponse.json({ message: 'Dentist registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting dentist registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
