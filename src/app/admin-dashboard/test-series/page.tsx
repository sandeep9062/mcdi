import { db } from "@/db";
import { testSeries } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TestSeriesTable from "./test-series-table";

export default async function AdminTestSeriesPage() {
  const rawTestSeries = await db.select().from(testSeries).orderBy(desc(testSeries.createdAt));
  const allTestSeries = rawTestSeries.map(ts => ({
    ...ts,
    thumbnails: ts.thumbnails as string[],
    whatIncluded: ts.whatIncluded as string[],
    sampleQuestions: ts.sampleQuestions as { question: string; options: string[]; correctAnswer: number; explanation: string; }[],
    originalPrice: ts.originalPrice ?? undefined,
    difficulty: ts.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test Series Management</h1>
        <Link href="/admin-dashboard/test-series/test-series-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Test Series
          </Button>
        </Link>
      </div>
      <TestSeriesTable data={allTestSeries} />
    </div>
  );
}
