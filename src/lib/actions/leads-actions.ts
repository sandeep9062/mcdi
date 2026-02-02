"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

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

    // Send email notification
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: process.env.SMTP_FROM_EMAIL, // Send to admin email
        subject: "New Free Demo Request",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>New Free Demo Request</h2>
                <p>A new free demo request has been submitted. Here are the details:</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
                    <li><strong>Email:</strong> ${data.email}</li>
                    <li><strong>Phone:</strong> ${data.phone}</li>
                    <li><strong>College:</strong> ${data.college || "Not specified"}</li>
                    <li><strong>Passing Year:</strong> ${data.passingYear || "Not specified"}</li>
                    <li><strong>Programme:</strong> ${data.programme || "Not specified"}</li>
                    <li><strong>Mode:</strong> ${data.mode || "Not specified"}</li>
                    <li><strong>Course Interest:</strong> ${data.courseInterest || "Not specified"}</li>
                    <li><strong>Query:</strong> ${data.query || "Not specified"}</li>
                    <li><strong>Present Address:</strong> ${data.presentAddress || "Not specified"}</li>
                    <li><strong>Preferred Demo Date:</strong> ${data.preferredDemoDate || "Not specified"}</li>
                    <li><strong>Preferred Demo Time:</strong> ${data.preferredDemoTime || "Not specified"}</li>
                    <li><strong>Target Course Start Date:</strong> ${data.targetCourseStartDate || "Not specified"}</li>
                </ul>
            </div>
        `,
    });

    // Send confirmation email to the user
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: data.email,
        subject: "Your Free Demo Request has been Received",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Thank you for your Free Demo Request!</h2>
                <p>We have received your request for a free demo class. Our team will contact you shortly to confirm your demo details.</p>
                <p>Here are the details you provided:</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
                    <li><strong>Email:</strong> ${data.email}</li>
                    <li><strong>Phone:</strong> ${data.phone}</li>
                    <li><strong>Course Interest:</strong> ${data.courseInterest || "Not specified"}</li>
                    <li><strong>Preferred Demo Date:</strong> ${data.preferredDemoDate || "Not specified"}</li>
                    <li><strong>Preferred Demo Time:</strong> ${data.preferredDemoTime || "Not specified"}</li>
                </ul>
                <p>Thank you for choosing Master Clinic!</p>
            </div>
        `,
    });

    // If you have an admin dashboard, refresh the leads list
    revalidatePath("/admin/leads");
    
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to submit request" };
  }
}
