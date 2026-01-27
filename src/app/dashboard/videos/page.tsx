"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Play, 
  Clock, 
  Bookmark, 
  Search, 
  History,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { Video } from "@/types/types"; 

// Extended Video type for Dashboard
interface StudentVideo extends Video {
  id: string;
  title: string;
  category: string;
  // FIX: thumbnail must be a strict string to match the base 'Video' interface
  thumbnail: string; 
  progress: number; 
  isSaved: boolean;
  lastWatched: string;
  durationInMins: number;
}

export default function StudentVideosDashboard() {
  const [videos, setVideos] = useState<StudentVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const response = await fetch("/api/student/my-videos");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching dashboard videos");
      } finally {
        setLoading(false);
      }
    };
    fetchMyVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter(v => 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, videos]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Play className="h-8 w-8 text-teal-600 fill-teal-600" />
                Video Workspace
              </h1>
              <p className="text-gray-500 mt-1">Access your clinical procedures and course lectures.</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search your library..." 
                className="pl-10 bg-gray-50 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <Tabs defaultValue="continue" className="space-y-8">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start gap-8 h-auto p-0">
            <TabsTrigger value="continue" className="data-[state=active]:border-teal-600 border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent shadow-none font-bold">
              Continue Watching
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:border-teal-600 border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent shadow-none font-bold">
              All Content
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:border-teal-600 border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent shadow-none font-bold">
              Saved for Later
            </TabsTrigger>
          </TabsList>

          <TabsContent value="continue" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.filter(v => v.progress > 0 && v.progress < 100).map((video) => (
                <VideoDashboardCard key={video.id} video={video} showProgress />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoDashboardCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.filter(v => v.isSaved).map((video) => (
                <VideoDashboardCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function VideoDashboardCard({ video, showProgress = false }: { video: StudentVideo; showProgress?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
    >
      <div className="relative aspect-video">
        <Image 
          src={video.thumbnail || "/video-placeholder.jpg"} 
          alt={video.title} 
          fill 
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
          <div className="h-12 w-12 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-xl">
            <Play fill="white" size={24} />
          </div>
        </div>
        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-none text-[10px]">
          {video.durationInMins} min
        </Badge>
        {video.progress >= 100 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
            <CheckCircle2 size={16} />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{video.category}</span>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={16} />
          </button>
        </div>
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-3 h-10 group-hover:text-teal-700 transition-colors">
          {video.title}
        </h3>

        {showProgress ? (
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-medium text-gray-500 uppercase">
              <span>{video.progress}% Watched</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {video.lastWatched}</span>
            </div>
            <Progress value={video.progress} className="h-1 bg-gray-100" />
          </div>
        ) : (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
             <span className="text-xs text-gray-400 flex items-center gap-1">
                <History size={12} /> Watched {video.lastWatched}
             </span>
             <button className={`${video.isSaved ? 'text-teal-600' : 'text-gray-300'} hover:scale-110 transition-transform`}>
                <Bookmark size={18} fill={video.isSaved ? "currentColor" : "none"} />
             </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}