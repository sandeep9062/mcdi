import { db } from "@/db";
import { video } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import VideosTable from "./videos-table";

export default async function AdminVideosPage() {
  const rawVideos = await db.select().from(video).orderBy(desc(video.createdAt));
  const allVideos = rawVideos.map(v => ({
    id: v.id,
    title: v.title,
    description: v.description,
    thumbnails: v.thumbnails as string[],
    thumbnail: (v.thumbnails as string[])?.[0] || "", // Extract first thumbnail for the Video type
    youtubeId: v.youtubeId,
    category: v.category,
    duration: v.duration,
    views: v.views,
    date: v.date,
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Videos Management</h1>
        <Link href="/admin-dashboard/videos/videos-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Video
          </Button>
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Videos Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-2xl font-bold text-blue-600">{allVideos.length}</div>
            <div className="text-blue-700">Total Videos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {allVideos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
            </div>
            <div className="text-green-700">Total Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(allVideos.reduce((sum, v) => sum + v.views, 0) / Math.max(allVideos.length, 1))}
            </div>
            <div className="text-purple-700">Avg Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {new Set(allVideos.map(v => v.category)).size}
            </div>
            <div className="text-orange-700">Categories</div>
          </div>
        </div>
      </div>

      <VideosTable data={allVideos} />
    </div>
  );
}
