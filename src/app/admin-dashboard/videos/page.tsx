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
    ...v,
    views: v.views as number,
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
      <VideosTable data={allVideos} />
    </div>
  );
}
