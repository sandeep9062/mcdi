"use server"

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export async function updateUserRole(userId: string, newRole: string) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Update the target user's role
    await db.update(user).set({ role: newRole }).where(eq(user.id, userId));
    revalidatePath("/admin-dashboard/users");
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

export async function toggleUserStatus(userId: string, isVerified: boolean) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Update user status
    await db.update(user).set({ emailVerified: !isVerified }).where(eq(user.id, userId));
    revalidatePath("/admin-dashboard/users");
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    // Check admin authorization
    await requireAdmin();

    // Delete user
    await db.delete(user).where(eq(user.id, userId));
    revalidatePath("/admin-dashboard/users");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
