

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { review } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const course = searchParams.get('course');

        if (course) {
            // Get reviews for a specific course
            const reviews = await db.select().from(review).where(eq(review.course, course)).orderBy(review.createdAt);

            return NextResponse.json(reviews);
        } else {
            // Get all reviews
            const reviews = await db.select().from(review).orderBy(review.createdAt);

            return NextResponse.json(reviews);
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
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
            'name', 'course', 'rating', 'date', 'text', 'avatar'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const newReview = await db.insert(review).values({
            id: crypto.randomUUID(),
            name: body.name,
            course: body.course,
            rating: body.rating,
            date: body.date,
            text: body.text,
            avatar: body.avatar,
            verified: body.verified || false,
        }).returning();

        return NextResponse.json(newReview[0], { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
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
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID parameter required for update' },
                { status: 400 }
            );
        }

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

export async function DELETE(request: NextRequest) {
    try {
        // Check authentication and admin role
        const authResult = await requireAdmin(request);
        if (!authResult.success) {
            return authResult.response!;
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID parameter required for deletion' },
                { status: 400 }
            );
        }

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
