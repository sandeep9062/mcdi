import { db } from "@/db";
import { course } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CourseTable from "./course-table";

export default async function AdminCoursesPage() {
  const rawCourses = await db.select().from(course).orderBy(desc(course.createdAt));
  const allCourses = rawCourses.map(course => ({
    ...course,
    originalPrice: course.originalPrice ?? undefined,
    mode: course.mode as "Online" | "Offline" | "Hybrid",
    thumbnails: course.thumbnails as string[],
    whatYouLearn: course.whatYouLearn as string[],
    curriculum: course.curriculum as { module: string; topics: string[]; }[],
    whoIsThisFor: course.whoIsThisFor as string[],
    faculty: course.faculty as { name: string; title: string; image: string; bio: string; }[],
    faqs: course.faqs as { question: string; answer: string; }[],
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Link href="/admin-dashboard/courses/course-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>
      <CourseTable data={allCourses} />
    </div>
  );
}
