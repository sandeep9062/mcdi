"use client"

import { useState } from "react";
import Link from "next/link";
import { Video } from "@/types/types";
import { deleteVideo } from "@/lib/actions/video-actions";

export default function VideosTable({ data }: { data: Video[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (videoId: string) => {
    if (!confirm('Delete video?')) return;

    try {
      setError(null);
      await deleteVideo(videoId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete video");
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
            <th className="p-4">Duration</th>
            <th className="p-4">Views</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((video) => (
            <tr key={video.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{video.title}</div>
                <div className="text-sm text-gray-500">{video.description}</div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{video.category}</span>
              </td>
              <td className="p-4">
                <div className="text-sm">{video.duration}</div>
              </td>
              <td className="p-4">
                <div className="text-sm">{video.views.toLocaleString()} views</div>
              </td>
              <td className="p-4">
                <div className="text-sm">{video.date}</div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/videos?youtubeId=${video.youtubeId}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin-dashboard/videos/videos-form?youtubeId=${video.youtubeId}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(video.id)}
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
