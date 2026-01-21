"use client"

import { useState } from "react";
import Link from "next/link";
import { Exam } from "@/types/types";
import { deleteExam } from "@/lib/actions/exam-actions";

export default function ExamTable({ data }: { data: Exam[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (examId: string) => {
    if (!confirm('Delete exam?')) return;

    try {
      setError(null);
      await deleteExam(examId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete exam");
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
            <th className="p-4">Exam</th>
            <th className="p-4">Country</th>
            <th className="p-4">Description</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{e.name}</div>
                <div className="text-sm text-gray-500">{e.fullName}</div>
              </td>
              <td className="p-4">
                <div className="flex items-center">
                  <span className="mr-2">{e.countryFlag}</span>
                  <span>{e.country}</span>
                </div>
              </td>
              <td className="p-4">
                <div className="max-w-xs truncate">{e.shortDescription}</div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/exam-prep/${e.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin-dashboard/exams/exam-form?slug=${e.slug}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(e.id)}
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
