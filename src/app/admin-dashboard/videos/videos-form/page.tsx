"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Video } from "@/types/types";

function CreateVideoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditing);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    youtubeId: "",
    category: "",
    duration: "",
    views: 0,
    date: new Date().toISOString().split("T")[0],
  });

  // Load existing video data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchVideo = async () => {
        try {
          const response = await fetch(`/api/videos?id=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch video");
          }
          const video: Video = await response.json();

          setFormData({
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnail,
            youtubeId: video.youtubeId,
            category: video.category,
            duration: video.duration,
            views: video.views,
            date: video.date,
          });
        } catch (error) {
          console.error("Error fetching video:", error);
          toast.error("Failed to load video data");
          router.push("/admin-dashboard/videos");
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchVideo();
    }
  }, [isEditing, id, router]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.thumbnail ||
        !formData.youtubeId ||
        !formData.category ||
        !formData.duration
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Prepare data for submission
      const videoData = {
        ...formData,
      };

      const response = await fetch("/api/videos", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEditing ? { ...videoData, id } : videoData,
        ),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || `Failed to ${isEditing ? "update" : "create"} video`,
        );
      }

      toast.success(`Video ${isEditing ? "updated" : "created"} successfully!`);
      router.push("/admin-dashboard/videos");
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} video:`,
        error,
      );
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isEditing ? "update" : "create"} video`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    "Anatomy",
    "Periodontology",
    "Endodontics",
    "Oral Surgery",
    "Clinical Dentistry",
    "Support Dentistry",
    "Exam Preparation",
    "Study Tips",
  ];

  if (isLoadingData) {
    return (
      <div className="p-8">
        <div className="text-center">Loading video data...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/videos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Videos
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Video" : "Create New Video"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter video title"
              required
            />
          </div>

          {/* YouTube ID */}
          <div>
            <Label htmlFor="youtubeId">YouTube Video ID *</Label>
            <Input
              id="youtubeId"
              value={formData.youtubeId}
              onChange={(e) => handleInputChange("youtubeId", e.target.value)}
              placeholder="dQw4w9WgXcQ"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              The ID from the YouTube URL (after v=)
            </p>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration">Duration *</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="10:30"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: MM:SS or HH:MM:SS
            </p>
          </div>

          {/* Views */}
          <div>
            <Label htmlFor="views">Views</Label>
            <Input
              id="views"
              type="number"
              value={formData.views}
              onChange={(e) => handleInputChange("views", parseInt(e.target.value) || 0)}
              placeholder="0"
              min="0"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Upload Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>

          {/* Thumbnail */}
          <div className="md:col-span-2">
            <Label htmlFor="thumbnail">Thumbnail URL *</Label>
            <Input
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => handleInputChange("thumbnail", e.target.value)}
              placeholder="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              YouTube thumbnail URL or custom image URL
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the video content"
              rows={4}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Link href="/admin-dashboard/videos">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Update Video" : "Create Video"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateVideoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CreateVideoForm />
    </Suspense>
  );
}
