import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { note } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single note by slug
      const rawNote = await db.select().from(note).where(eq(note.slug, slug)).limit(1);

      if (rawNote.length === 0) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 });
      }

      const foundNote = {
        ...rawNote[0],
        tags: rawNote[0].tags as string[],
      };

      return NextResponse.json(foundNote);
    } else {
      // Get all notes
      const rawNotes = await db.select().from(note).orderBy(note.createdAt);
      const allNotes = rawNotes.map(n => ({
        ...n,
        tags: n.tags as string[],
      }));

      return NextResponse.json(allNotes);
    }
  } catch (error) {
    console.error('Error fetching notes:', error);
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
      'slug', 'title', 'shortDescription',
      'content', 'tags',
      'dateCreated', 'lastUpdated'
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
    const existingNote = await db.select().from(note).where(eq(note.slug, body.slug)).limit(1);
    if (existingNote.length > 0) {
      return NextResponse.json(
        { error: 'Note with this slug already exists' },
        { status: 409 }
      );
    }

    const newNote = await db.insert(note).values({
      id: crypto.randomUUID(),
      slug: body.slug,
      title: body.title,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription || '',
      thumbnails: body.thumbnails || ['/mcdi1.jpeg'],
      content: body.content,
      tags: body.tags,
      dateCreated: body.dateCreated,
      lastUpdated: body.lastUpdated,
      featured: body.featured || false,
      popular: body.popular || false,
    }).returning();

    const createdNote = {
      ...newNote[0],
      tags: newNote[0].tags as string[],
    };

    return NextResponse.json(createdNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
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

    // Validate required fields
    const requiredFields = [
      'slug', 'title', 'shortDescription',
      'content', 'tags',
      'lastUpdated', 'originalSlug'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if the new slug already exists (if slug changed)
    if (body.slug !== body.originalSlug) {
      const existingNote = await db.select().from(note).where(eq(note.slug, body.slug)).limit(1);
      if (existingNote.length > 0) {
        return NextResponse.json(
          { error: 'Note with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update the note
    const updatedNote = await db.update(note)
      .set({
        slug: body.slug,
        title: body.title,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription || '',
        thumbnails: body.thumbnails || ['/mcdi1.jpeg'],
        content: body.content,
        tags: body.tags,
        lastUpdated: body.lastUpdated,
        featured: body.featured || false,
        popular: body.popular || false,
        updatedAt: new Date(),
      })
      .where(eq(note.slug, body.originalSlug))
      .returning();

    if (updatedNote.length === 0) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    const updatedNoteResponse = {
      ...updatedNote[0],
      tags: updatedNote[0].tags as string[],
    };

    return NextResponse.json(updatedNoteResponse);
  } catch (error) {
    console.error('Error updating note:', error);
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
        { error: 'Note slug is required' },
        { status: 400 }
      );
    }

    // Check if note exists
    const existingNote = await db.select().from(note).where(eq(note.slug, slug)).limit(1);
    if (existingNote.length === 0) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    // Delete the note
    await db.delete(note).where(eq(note.slug, slug));

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
