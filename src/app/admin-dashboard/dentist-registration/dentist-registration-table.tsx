"use client"

import { useState } from "react";
import Link from "next/link";
import { DentistRegistration } from "@/types/types";
import { deleteDentistRegistration, toggleDentistRegistrationFeatured, toggleDentistRegistrationPopular } from "@/lib/actions/dentist-registration-actions";

export default function DentistRegistrationTable({ data }: { data: DentistRegistration[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete dentist registration?')) return;

    try {
      setError(null);
      await deleteDentistRegistration(slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete dentist registration");
    }
  };

  const handleToggleFeatured = async (slug: string, isFeatured: boolean) => {
    try {
      setError(null);
      await toggleDentistRegistrationFeatured(slug, isFeatured);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update dentist registration status");
    }
  };

  const handleTogglePopular = async (slug: string, isPopular: boolean) => {
    try {
      setError(null);
      await toggleDentistRegistrationPopular(slug, isPopular);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update dentist registration status");
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
            <th className="p-4">Dentist Registration</th>
            <th className="p-4">Category</th>
            <th className="p-4">Mode</th>
            <th className="p-4">Price</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{r.title}</div>
                <div className="text-sm text-gray-500">{r.duration}</div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {r.category}
                </span>
              </td>
              <td className="p-4">{r.mode}</td>
              <td className="p-4">
                <div className="font-medium">₹{r.price.toLocaleString()}</div>
                {r.originalPrice && r.originalPrice > r.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{r.originalPrice.toLocaleString()}
                  </div>
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{r.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({r.reviewCount})
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {r.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                      Featured
                    </span>
                  )}
                  {r.popular && (
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
                      href={`/dentist-registration/${r.slug}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin-dashboard/dentist-registration/course-form?slug=${r.slug}`}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(r.slug)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleToggleFeatured(r.slug, r.featured)}
                      className={`text-xs px-2 py-1 rounded ${
                        r.featured
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                      }`}
                    >
                      {r.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleTogglePopular(r.slug, r.popular)}
                      className={`text-xs px-2 py-1 rounded ${
                        r.popular
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                      }`}
                    >
                      {r.popular ? 'Unpopular' : 'Popular'}
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