import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { testSeries } from "@/db/schema";
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

    // Get test series that the user has access to
    // For now, we'll return all test series since we don't have an enrollment system
    // In a real implementation, you would join with an enrollment table
    const userTestSeries = await db
      .select({
        id: testSeries.id,
        slug: testSeries.slug,
        title: testSeries.title,
        shortDescription: testSeries.shortDescription,
        fullDescription: testSeries.fullDescription,
        price: testSeries.price,
        originalPrice: testSeries.originalPrice,
        thumbnails: testSeries.thumbnails,
        category: testSeries.category,
        examType: testSeries.examType,
        duration: testSeries.duration,
        rating: testSeries.rating,
        reviewCount: testSeries.reviewCount,
        featured: testSeries.featured,
        questionsCount: testSeries.questionsCount,
        difficulty: testSeries.difficulty,
        whatIncluded: testSeries.whatIncluded,
        sampleQuestions: testSeries.sampleQuestions,
        createdAt: testSeries.createdAt,
        updatedAt: testSeries.updatedAt
      })
      .from(testSeries)
      .orderBy(testSeries.updatedAt);

    return NextResponse.json(userTestSeries);
  } catch (error) {
    console.error("Error fetching user test series:", error);
    return NextResponse.json(
      { error: "Failed to fetch user test series" },
      { status: 500 }
    );
  }
}