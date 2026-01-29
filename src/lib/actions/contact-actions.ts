"use server";

import { db } from "@/db";
import { contact } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createContact(data: any) {
  try {
    // 1. Basic server-side validation
    if (!data.name || !data.email || !data.phone) {
      return { success: false, error: "Missing required fields" };
    }

    // 2. Split Name Logic
    // .trim() removes extra spaces
    // .split(/\s+/) splits by any whitespace
    const nameParts = data.name.trim().split(/\s+/);

    const firstName = nameParts[0];
    // If there's more than one part, join the rest as the last name. 
    // Otherwise, leave lastName as an empty string or null.
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // 3. Database Insertion
    await db.insert(contact).values({
      firstName: firstName,
      lastName: lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    revalidatePath("/admin/contact");

    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to submit request" };
  }
}