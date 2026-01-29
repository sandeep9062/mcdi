import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { course, user } from "@/db/schema";
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

    // Get enrolled courses with progress and status
    const enrolledCourses = await db
      .select({
        id: course.id,
        title: course.title,
        shortDescription: course.shortDescription,
        thumbnails: course.thumbnails,
        duration: course.duration,
        lastAccessed: sql`NOW()`, // Placeholder since we don't have enrollment table
        progress: sql`0`, // Placeholder since we don't have enrollment table
        status: sql<string>`'Not Started'` // Placeholder since we don't have enrollment table
      })
      .from(course)
      .where(sql`1=1`) // Placeholder condition
      .orderBy(course.updatedAt);

    return NextResponse.json(enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrolled courses" },
      { status: 500 }
    );
  }
}
