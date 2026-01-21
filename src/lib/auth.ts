import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // Postgres for Neon
        schema: {
            user: user,
            session: session,
            account: account,
            verification: verification
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, token }) => {
            // For development, we'll use console.log with a clickable link
            // In production, replace with your email service (e.g., Resend, Nodemailer)
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;
            console.log("=== EMAIL VERIFICATION ===");
            console.log("To:", user.email);
            console.log("Subject: Verify your Master Clinic account");
            console.log("Body: Click the link below to verify your email:");
            console.log("Verification Link:", verificationUrl);
            console.log("==========================");

            // TODO: Replace with actual email sending service
            // Example with Resend:
            // const resend = new Resend(process.env.RESEND_API_KEY);
            // await resend.emails.send({
            //   from: "noreply@masterclinic.com",
            //   to: user.email,
            //   subject: "Verify your Master Clinic account",
            //   html: `
            //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            //       <h2>Welcome to Master Clinic!</h2>
            //       <p>Please verify your email address to complete your registration.</p>
            //       <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Verify Email</a>
            //       <p>If the button doesn't work, copy and paste this link into your browser:</p>
            //       <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            //       <p>This link will expire in 24 hours.</p>
            //     </div>
            //   `
            // });
        },
    },
    // Required for Next.js App Router cookies to work correctly

    
    plugins: [nextCookies()]
});
