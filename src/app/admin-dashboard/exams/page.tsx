import { db } from "@/db";
import { exam } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExamTable from "./exam-table";

export default async function AdminExamsPage() {
  const rawExams = await db.select().from(exam).orderBy(desc(exam.createdAt));
  const allExams = rawExams.map(exam => ({
    ...exam,
    whoIsThisFor: exam.whoIsThisFor as string[],
    whatIncluded: exam.whatIncluded as string[],
    studyPlan: exam.studyPlan as { phase: string; duration: string; focus: string[]; }[],
    reviews: exam.reviews as { name: string; text: string; rating: number; }[],
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exam Management</h1>
        <Link href="/admin-dashboard/exams/exam-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </Link>
      </div>
      <ExamTable data={allExams} />
    </div>
  );
}
