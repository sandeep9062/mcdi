import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { google } from "better-auth/social-providers";
import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD?.trim(),
    },
});

// Verify the transporter connection
transporter.verify().then(() => {
    console.log("SMTP connection is ready");
}).catch((error) => {
    console.error("SMTP connection error:", error);
});

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
            try {
                const verificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;

                console.log("Sending verification email to:", user.email);
                console.log("SMTP Configuration:", {
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: process.env.SMTP_SECURE,
                    user: process.env.SMTP_USER,
                    from: process.env.SMTP_FROM_EMAIL,
                });

                // Send email using nodemailer
                const info = await transporter.sendMail({
                    from: process.env.SMTP_FROM_EMAIL,
                    to: user.email,
                    subject: "Verify your Master Clinic account",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2>Welcome to Master Clinic!</h2>
                            <p>Please verify your email address to complete your registration.</p>
                            <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Verify Email</a>
                            <p>If the button doesn't work, copy and paste this link into your browser:</p>
                            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
                            <p>This link will expire in 24 hours.</p>
                        </div>
                    `,
                });

                console.log("Email sent successfully:", info.messageId);
            } catch (error) {
                console.error("Error sending verification email:", error);
                // Re-throw the error to be handled by better-auth
                throw error;
            }
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    // Required for Next.js App Router cookies to work correctly
    plugins: [nextCookies()]
});
