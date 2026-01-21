import { db } from "@/db";
import { review } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ReviewsTable from "./reviews-table";

export default async function AdminReviewsPage() {
  const rawReviews = await db.select().from(review).orderBy(desc(review.createdAt));
  const allReviews = rawReviews.map(r => ({
    ...r,
    rating: r.rating as number,
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews Management</h1>
        <Link href="/admin-dashboard/reviews/reviews-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Review
          </Button>
        </Link>
      </div>
      <ReviewsTable data={allReviews} />
    </div>
  );
}
