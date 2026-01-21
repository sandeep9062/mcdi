"use server"

import { db } from "@/db";
import { video } from "@/db/schema";
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

export async function deleteVideo(videoId: string) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Delete video
    await db.delete(video).where(eq(video.id, videoId));
    revalidatePath("/admin-dashboard/videos");
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
}

export async function toggleVideoFeatured(videoId: string, isFeatured: boolean) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Update video featured status (if we add featured field later)
    // For now, this is a placeholder
    revalidatePath("/admin-dashboard/videos");
  } catch (error) {
    console.error("Error toggling video featured status:", error);
    throw error;
  }
}
