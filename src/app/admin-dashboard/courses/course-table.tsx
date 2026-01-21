"use client"

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/types/types";
import { deleteCourse, toggleCourseFeatured, toggleCoursePopular } from "@/lib/actions/course-actions";

export default function CourseTable({ data }: { data: Course[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (courseId: string) => {
    if (!confirm('Delete course?')) return;

    try {
      setError(null);
      await deleteCourse(courseId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
    }
  };

  const handleToggleFeatured = async (courseId: string, isFeatured: boolean) => {
    try {
      setError(null);
      await toggleCourseFeatured(courseId, isFeatured);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update course status");
    }
  };

  const handleTogglePopular = async (courseId: string, isPopular: boolean) => {
    try {
      setError(null);
      await toggleCoursePopular(courseId, isPopular);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update course status");
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
            <th className="p-4">Course</th>
            <th className="p-4">Category</th>
            <th className="p-4">Mode</th>
            <th className="p-4">Price</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-gray-500">{c.duration}</div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {c.category}
                </span>
              </td>
              <td className="p-4">{c.mode}</td>
              <td className="p-4">
                <div className="font-medium">₹{c.price.toLocaleString()}</div>
                {c.originalPrice && c.originalPrice > c.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{c.originalPrice.toLocaleString()}
                  </div>
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{c.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({c.reviewCount})
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {c.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                      Featured
                    </span>
                  )}
                  {c.popular && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      Popular
                    </span>
                  )}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/courses/${c.slug}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin-dashboard/courses/course-form?slug=${c.slug}`}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleToggleFeatured(c.id, c.featured)}
                      className={`text-xs px-2 py-1 rounded ${
                        c.featured
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                      }`}
                    >
                      {c.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleTogglePopular(c.id, c.popular)}
                      className={`text-xs px-2 py-1 rounded ${
                        c.popular
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                      }`}
                    >
                      {c.popular ? 'Unpopular' : 'Popular'}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
