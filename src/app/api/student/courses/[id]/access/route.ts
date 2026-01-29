import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { course } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { id: courseId } = await params;

    // Update last accessed time (placeholder since we don't have enrollment table)
    // In a real implementation, you would update the course_enrollments table
    const result = await db
      .update(course)
      .set({
        updatedAt: sql`NOW()`
      })
      .where(eq(course.id, courseId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating course access:", error);
    return NextResponse.json(
      { error: "Failed to update course access" },
      { status: 500 }
    );
  }
}