import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as schema from "./schema";
import { courses } from "../data/courses";
import { exams } from "../data/exams";
import { reviews } from "../data/reviews";
import { testSeries } from "../data/testSeries";
import { videos } from "../data/videos";
import { dentistRegistrations } from "../data/denistRegistration";


// Load environment variables from .env
config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
    console.log("🌱 Seeding started...");

    try {
        // Clear existing data first
        console.log("🗑️ Clearing existing data...");
        await db.delete(schema.course);
        await db.delete(schema.exam);
        await db.delete(schema.testSeries);
        await db.delete(schema.review);
        await db.delete(schema.video);
        await db.delete(schema.dentistRegistration);
      
        console.log("✅ Existing data cleared!");

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

        // Seed dentist registrations - only include fields defined in the database schema
        console.log("🦷 Seeding dentist registrations...");
        const filteredDentistRegistrations = dentistRegistrations.map(dentist => ({
          id: dentist.id,
          slug: dentist.slug,
          title: dentist.title,
          shortDescription: dentist.shortDescription,
          fullDescription: dentist.fullDescription,
          price: dentist.price,
          originalPrice: dentist.originalPrice,
          thumbnails: dentist.thumbnails,
          category: dentist.category,
          mode: dentist.mode,
          duration: dentist.duration,
          rating: dentist.rating,
          reviewCount: dentist.reviewCount,
          featured: dentist.featured,
          popular: dentist.popular,
          whatYouLearn: dentist.whatYouLearn,
          curriculum: dentist.curriculum,
          whoIsThisFor: dentist.whoIsThisFor,
          faculty: dentist.faculty,
          faqs: dentist.faqs,
          createdAt: new Date(dentist.createdAt),
          updatedAt: new Date(dentist.updatedAt)
        }));
        
        await db.insert(schema.dentistRegistration).values(filteredDentistRegistrations);
        console.log("✅ Dentist registrations seeded successfully!");

        console.log("🎉 All seeding completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

main();
