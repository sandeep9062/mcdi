
"use server"

import { db } from "@/db";
import { testSeries } from "@/db/schema";
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

export async function deleteTestSeries(testSeriesId: string) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Delete exam
    await db.delete(testSeries).where(eq(testSeries.id, testSeriesId));
    revalidatePath("/admin-dashboard/test-series");
  } catch (error) {
    console.error("Error deleting exam:", error);
    throw error;
  }
}

export async function toggleTestSeriesFeatured(examId: string, isFeatured: boolean) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Update exam featured status (if we add featured field later)
    // For now, this is a placeholder
    revalidatePath("/admin-dashboard/test-series");
  } catch (error) {
    console.error("Error toggling exam featured status:", error);
    throw error;
  }
}
