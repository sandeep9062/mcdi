import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { video } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const videoData = await db.select().from(video).where(eq(video.id, id)).limit(1);

    if (videoData.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(videoData[0]);
  } catch (error) {
    console.error('Error fetching video:', error);
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

    // Check if video exists
    const existingVideo = await db.select().from(video).where(eq(video.id, id)).limit(1);
    if (!existingVideo.length) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Update video
    const updatedVideo = await db.update(video)
      .set({
        title: body.title,
        description: body.description,
        thumbnails: body.thumbnails,
        youtubeId: body.youtubeId,
        category: body.category,
        duration: body.duration,
        views: body.views,
        date: body.date,
        updatedAt: new Date(),
      })
      .where(eq(video.id, id))
      .returning();

    return NextResponse.json(updatedVideo[0]);
  } catch (error) {
    console.error('Error updating video:', error);
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

    // Check if video exists
    const existingVideo = await db.select().from(video).where(eq(video.id, id)).limit(1);
    if (!existingVideo.length) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Delete video
    await db.delete(video).where(eq(video.id, id));

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
