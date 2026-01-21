"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createLead(data: any) {
  try {
    // Basic server-side validation
    if (!data.firstName || !data.email || !data.phone) {
      return { success: false, error: "Missing required fields" };
    }

    await db.insert(leads).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      college: data.college,
      passingYear: data.passingYear,
      programme: data.programme,
      mode: data.mode,
      courseInterest: data.courseInterest,
      query: data.query,
    });

    // If you have an admin dashboard, refresh the leads list
    revalidatePath("/admin/leads");
    
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to submit request" };
  }
}