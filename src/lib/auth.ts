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
        pass: process.env.SMTP_PASSWORD,
    },
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
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;

            // Send email using nodemailer
            await transporter.sendMail({
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
