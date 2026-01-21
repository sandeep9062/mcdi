import React from 'react';
import { Video } from '@/types/types';
import { Play, Eye, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow group">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-teal-600 ml-1" />
          </div>
        </div>
        <Badge className="absolute top-3 left-3 bg-teal-600">{video.category}</Badge>
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{video.views.toLocaleString()} views</span>
          </div>
          <span>{new Date(video.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
