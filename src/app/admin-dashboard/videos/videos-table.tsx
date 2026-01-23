"use client"

import Link from "next/link";
import { Video } from "@/types/types";
import { toast } from "sonner";

export default function VideosTable({ data, onRefresh }: { data: Video[]; onRefresh?: () => void }) {
  const handleDelete = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/videos?id=${videoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete video');
      }

      toast.success('Video deleted successfully!');
      // Refresh the data if callback provided, otherwise reload page
      if (onRefresh) {
        onRefresh();
      } else {
        window.location.reload();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete video");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
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
                <div className="text-sm text-gray-500">{video.description.slice(0, 50)}...</div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{video.category}</span>
              </td>
              <td className="p-4">
                <span className="text-sm">{video.duration}</span>
              </td>
              <td className="p-4">
                <span className="text-sm">{video.views.toLocaleString()}</span>
              </td>
              <td className="p-4">
                <span className="text-sm">{video.date}</span>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`https://youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Watch
                  </Link>
                  <Link
                    href={`/admin-dashboard/videos/videos-form?id=${video.id}`}
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