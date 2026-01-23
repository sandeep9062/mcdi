import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as schema from "./schema";
import { courses } from "../data/courses";
import { exams } from "../data/exams";
import { reviews } from "../data/reviews";
import { testSeries } from "../data/testSeries";
import { videos } from "../data/videos";
import { notes } from "../data/notes";

// Load environment variables from .env
config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
    console.log("🌱 Seeding started...");

    try {
        // Seed courses
        console.log("📚 Seeding courses...");
        await db.insert(schema.course).values(courses);
        console.log("✅ Courses seeded successfully!");

        // Seed exams
        console.log("🎓 Seeding exams...");
        await db.insert(schema.exam).values(exams);
        console.log("✅ Exams seeded successfully!");

        // Seed test series
        console.log("📝 Seeding test series...");
        await db.insert(schema.testSeries).values(testSeries);
        console.log("✅ Test series seeded successfully!");

        // Seed reviews
        console.log("⭐ Seeding reviews...");
        await db.insert(schema.review).values(reviews);
        console.log("✅ Reviews seeded successfully!");

        // Seed videos
        console.log("🎥 Seeding videos...");
        await db.insert(schema.video).values(videos);
        console.log("✅ Videos seeded successfully!");

        // Seed notes
        console.log("📖 Seeding notes...");
        await db.insert(schema.note).values(notes);
        console.log("✅ Notes seeded successfully!");

        console.log("🎉 All seeding completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

main();
