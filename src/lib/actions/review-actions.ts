"use server";

import { db } from "@/db";
import { review } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { user } from "@/db/schema";

async function requireAdmin() {
  // Get current session
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error("Unauthorized: No session found");
  }

  // Get user role from database
  const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  if (!dbUser.length) {
    throw new Error("Unauthorized: User not found");
  }

  if (dbUser[0].role !== 'admin') {
    throw new Error("Forbidden: Admin access required");
  }

  return dbUser[0];
}

export async function getReviews() {
  try {
    const reviews = await db.select().from(review).orderBy(review.createdAt);
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
}

export async function getReviewById(id: string) {
  try {
    const reviewData = await db
      .select()
      .from(review)
      .where(eq(review.id, id))
      .limit(1);

    return reviewData[0] || null;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw new Error("Failed to fetch review");
  }
}

export async function createReview(reviewData: {
  name: string;
  course: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  verified?: boolean;
}) {
  try {
    // Check admin authorization
    await requireAdmin();

    const newReview = await db
      .insert(review)
      .values({
        id: crypto.randomUUID(),
        name: reviewData.name,
        course: reviewData.course,
        rating: reviewData.rating,
        date: reviewData.date,
        text: reviewData.text,
        avatar: reviewData.avatar,
        verified: reviewData.verified || false,
      })
      .returning();

    revalidatePath("/admin-dashboard/reviews");
    return newReview[0];
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }
}

export async function updateReview(
  id: string,
  reviewData: {
    name: string;
    course: string;
    rating: number;
    date: string;
    text: string;
    avatar: string;
    verified: boolean;
  }
) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Check if review exists
    const existingReview = await db
      .select()
      .from(review)
      .where(eq(review.id, id))
      .limit(1);

    if (!existingReview.length) {
      throw new Error("Review not found");
    }

    // Update review
    const updatedReview = await db
      .update(review)
      .set({
        name: reviewData.name,
        course: reviewData.course,
        rating: reviewData.rating,
        date: reviewData.date,
        text: reviewData.text,
        avatar: reviewData.avatar,
        verified: reviewData.verified,
        updatedAt: new Date(),
      })
      .where(eq(review.id, id))
      .returning();

    revalidatePath("/admin-dashboard/reviews");
    return updatedReview[0];
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error("Failed to update review");
  }
}

export async function deleteReview(id: string) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Check if review exists
    const existingReview = await db
      .select()
      .from(review)
      .where(eq(review.id, id))
      .limit(1);

    if (!existingReview.length) {
      throw new Error("Review not found");
    }

    // Delete review
    await db.delete(review).where(eq(review.id, id));

    revalidatePath("/admin-dashboard/reviews");
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Failed to delete review");
  }
}
