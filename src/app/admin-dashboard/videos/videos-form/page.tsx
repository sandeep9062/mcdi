"use client"

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Video } from "@/types/types";

function VideoFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const youtubeId = searchParams.get("youtubeId");
  const isEditing = !!youtubeId;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [formData, setFormData] = useState<Video>({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    youtubeId: "",
    category: "",
    duration: "",
    views: 0,
    date: new Date().toISOString().split('T')[0]
  });

  // Load video data for editing
  useEffect(() => {
    if (isEditing && youtubeId) {
      const loadVideo = async () => {
        try {
          const response = await fetch(`/api/videos?youtubeId=${youtubeId}`);
          if (response.ok) {
            const video = await response.json();
            setFormData(video);
          }
        } catch (error) {
          toast.error("Failed to load video data");
        } finally {
          setInitialLoading(false);
        }
      };
      loadVideo();
    } else {
      setInitialLoading(false);
    }
  }, [youtubeId, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.description.trim()) errors.push("Description is required");
    if (!formData.thumbnail.trim()) errors.push("Thumbnail URL is required");
    if (!formData.youtubeId.trim()) errors.push("YouTube ID is required");
    if (!formData.category.trim()) errors.push("Category is required");
    if (!formData.duration.trim()) errors.push("Duration is required");
    if (!formData.date.trim()) errors.push("Date is required");

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    setLoading(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/videos?youtubeId=${youtubeId}` : "/api/videos";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(isEditing ? "Video updated successfully" : "Video created successfully");
        router.push("/admin-dashboard/videos");
      } else {
        toast.error(responseData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save video");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading video data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/videos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Video" : "Create New Video"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Video Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Video title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                placeholder="Video description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="youtubeId">YouTube ID</Label>
                <Input
                  id="youtubeId"
                  value={formData.youtubeId}
                  onChange={(e) => handleInputChange("youtubeId", e.target.value)}
                  placeholder="YouTube video ID"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="Video category"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="e.g., 10:30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="views">Views</Label>
                <Input
                  id="views"
                  type="number"
                  value={formData.views}
                  onChange={(e) => handleInputChange("views", parseInt(e.target.value) || 0)}
                  placeholder="Number of views"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin-dashboard/videos">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEditing ? "Update Video" : "Create Video"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function VideoFormPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center">Loading...</div></div>}>
      <VideoFormContent />
    </Suspense>
  );
}
