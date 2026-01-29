import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { exam, user } from "@/db/schema";
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

    // Get exams that the user has access to
    // For now, we'll return all exams since we don't have an enrollment system
    // In a real implementation, you would join with an enrollment table
    const userExams = await db
      .select({
        id: exam.id,
        slug: exam.slug,
        name: exam.name,
        fullName: exam.fullName,
        country: exam.country,
        countryFlag: exam.countryFlag,
        shortDescription: exam.shortDescription,
        thumbnails: exam.thumbnails,
        icon: exam.icon,
        createdAt: exam.createdAt,
        updatedAt: exam.updatedAt
      })
      .from(exam)
      .orderBy(exam.updatedAt);

    return NextResponse.json(userExams);
  } catch (error) {
    console.error("Error fetching user exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch user exams" },
      { status: 500 }
    );
  }
}