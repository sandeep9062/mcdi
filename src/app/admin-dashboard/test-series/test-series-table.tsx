"use client"

import { useState } from "react";
import Link from "next/link";
import { TestSeries } from "@/types/types";
import { deleteTestSeries } from "@/lib/actions/test-series-actions";

export default function TestSeriesTable({ data }: { data: TestSeries[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (testSeriesId: string) => {
    if (!confirm('Delete test series?')) return;

    try {
      setError(null);
      await deleteTestSeries(testSeriesId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete test series");
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
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Exam Type</th>
            <th className="p-4">Price</th>
            <th className="p-4">Duration</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ts) => (
            <tr key={ts.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{ts.title}</div>
                <div className="text-sm text-gray-500">{ts.shortDescription}</div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{ts.category}</span>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{ts.examType}</span>
              </td>
              <td className="p-4">
                <div className="font-medium">₹{ts.price.toLocaleString()}</div>
                {ts.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">₹{ts.originalPrice.toLocaleString()}</div>
                )}
              </td>
              <td className="p-4">
                <div className="text-sm">{ts.duration}</div>
                <div className="text-xs text-gray-500">{ts.questionsCount} questions</div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/test-series/${ts.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin-dashboard/test-series/test-series-form?slug=${ts.slug}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ts.id)}
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
