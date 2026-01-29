"use client"

import { useState } from "react";
import Link from "next/link";
import { Note } from "@/types/types";
import { toast } from "sonner";

export default function NotesTable({ data, onRefresh }: { data: Note[]; onRefresh?: () => void }) {
  const handleDelete = async (noteSlug: string) => {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/notes?slug=${noteSlug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete note');
      }

      toast.success('Note deleted successfully!');
      // Refresh the data if callback provided, otherwise reload page
      if (onRefresh) {
        onRefresh();
      } else {
        window.location.reload();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete note");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-left bg-white">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">Tags</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((note) => (
            <tr key={note.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{note.title}</div>
                <div className="text-sm text-gray-500">{note.shortDescription}</div>
              </td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{note.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin-dashboard/notes/notes-form?slug=${note.slug}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note.slug)}
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