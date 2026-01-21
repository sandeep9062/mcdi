"use client"

import { useState } from "react";
import Link from "next/link";
import { Review } from "@/types/types";
import { deleteReview } from "@/lib/actions/review-actions";

export default function ReviewsTable({ data }: { data: Review[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Delete review?')) return;

    try {
      setError(null);
      await deleteReview(reviewId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete review");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4">
          {error}
        </div>
      )}
      <table className="w-full text-left bg-white">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Course</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Date</th>
            <th className="p-4">Verified</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((review) => (
            <tr key={review.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[200px]">{review.text}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{review.course}</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-yellow-400 ${i < review.rating ? '★' : '☆'}`}></span>
                  ))}
                </div>
              </td>
              <td className="p-4">
                <div className="text-sm">{review.date}</div>
              </td>
              <td className="p-4">
                <div className="text-sm">
                  {review.verified ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Verified</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Not Verified</span>
                  )}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin-dashboard/reviews/reviews-form?id=${review.id}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
