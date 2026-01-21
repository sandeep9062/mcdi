"use server"

import { db } from "@/db";
import { course } from "@/db/schema";
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

export async function deleteCourse(courseId: string) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Delete course
    await db.delete(course).where(eq(course.id, courseId));
    revalidatePath("/admin-dashboard/courses");
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

export async function toggleCourseFeatured(courseId: string, isFeatured: boolean) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Update course featured status
    await db.update(course).set({ featured: !isFeatured }).where(eq(course.id, courseId));
    revalidatePath("/admin-dashboard/courses");
  } catch (error) {
    console.error("Error toggling course featured status:", error);
    throw error;
  }
}

export async function toggleCoursePopular(courseId: string, isPopular: boolean) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Update course popular status
    await db.update(course).set({ popular: !isPopular }).where(eq(course.id, courseId));
    revalidatePath("/admin-dashboard/courses");
  } catch (error) {
    console.error("Error toggling course popular status:", error);
    throw error;
  }
}
