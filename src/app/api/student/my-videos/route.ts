import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { video } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get videos that the user has access to
    // For now, we'll return all videos since we don't have an enrollment system
    // In a real implementation, you would join with an enrollment table
    const userVideos = await db
      .select({
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnails: video.thumbnails,
        youtubeId: video.youtubeId,
        category: video.category,
        duration: video.duration,
        views: video.views,
        date: video.date,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt
      })
      .from(video)
      .orderBy(video.updatedAt);

    return NextResponse.json(userVideos);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch user videos" },
      { status: 500 }
    );
  }
}