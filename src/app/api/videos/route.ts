import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { video } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-middleware';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const youtubeId = searchParams.get('youtubeId');

    if (id) {
      // Get single video by id
      const videoData = await db.select().from(video).where(eq(video.id, id)).limit(1);

      if (videoData.length === 0) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }

      return NextResponse.json(videoData[0]);
    } else if (youtubeId) {
      // Get single video by youtubeId
      const videoData = await db.select().from(video).where(eq(video.youtubeId, youtubeId)).limit(1);

      if (videoData.length === 0) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }

      return NextResponse.json(videoData[0]);
    } else {
      // Get all videos
      const videoData = await db.select().from(video).orderBy(video.createdAt);

      return NextResponse.json(videoData);
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
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
      'title', 'description', 'thumbnails', 'youtubeId', 'category', 'duration', 'views', 'date'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if youtubeId already exists
    const existingVideo = await db.select().from(video).where(eq(video.youtubeId, body.youtubeId)).limit(1);
    if (existingVideo.length > 0) {
      return NextResponse.json(
        { error: 'Video with this YouTube ID already exists' },
        { status: 409 }
      );
    }

    const newVideo = await db.insert(video).values({
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      thumbnails: body.thumbnails,
      youtubeId: body.youtubeId,
      category: body.category,
      duration: body.duration,
      views: body.views,
      date: body.date,
    }).returning();

    return NextResponse.json(newVideo[0], { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
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
        { error: 'Video ID parameter required for update' },
        { status: 400 }
      );
    }

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
        { error: 'Video ID parameter required for deletion' },
        { status: 400 }
      );
    }

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
