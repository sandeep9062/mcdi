"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Note } from "@/types/types";
import { CloudinaryUpload } from "@/components/Upload";

function CreateNoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditing = !!slug;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditing);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    content: "",
    tags: "",
    featured: false,
    popular: false,
    thumbnails: [] as string[], 
  });

  // Load existing note data if editing
  useEffect(() => {
    if (isEditing && slug) {
      const fetchNote = async () => {
        try {
          const response = await fetch(`/api/notes?slug=${slug}`);
          if (!response.ok) {
            throw new Error("Failed to fetch note");
          }
          const note: Note = await response.json();

          setFormData({
            title: note.title,
            shortDescription: note.shortDescription,
            fullDescription: note.fullDescription || "",
            content: note.content,
            tags: note.tags.join(", "),
            featured: note.featured,
            popular: note.popular,
            thumbnails: note.thumbnails,
          });
        } catch (error) {
          console.error("Error fetching note:", error);
          toast.error("Failed to load note data");
          router.push("/admin-dashboard/notes");
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchNote();
    }
  }, [isEditing, slug, router]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThumbnailsChange = (newThumbnails: string[]) => {
    setFormData((prev) => ({
      ...prev,
      thumbnails: newThumbnails,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.shortDescription || !formData.content) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Prepare data for submission
      const noteData = {
        ...formData,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        dateCreated: isEditing
          ? undefined
          : new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
      };

      const response = await fetch("/api/notes", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEditing ? { ...noteData, originalSlug: slug } : noteData,
        ),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || `Failed to ${isEditing ? "update" : "create"} note`,
        );
      }

      toast.success(`Note ${isEditing ? "updated" : "created"} successfully!`);
      router.push("/admin-dashboard/notes");
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} note:`,
        error,
      );
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isEditing ? "update" : "create"} note`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/notes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Note" : "Create New Note"}
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
              placeholder="Enter note title"
              required
            />
          </div>

          {/* Thumbnails */}
          <div className="md:col-span-2">
            <Label htmlFor="thumbnails">Thumbnails</Label>
            <div className="space-y-4">
              {/* Current Thumbnails Preview */}
              {formData.thumbnails.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {formData.thumbnails.map((thumbnail, index) => (
                    <div key={index} className="relative">
                      <img
                        src={thumbnail}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newThumbnails = formData.thumbnails.filter((_, i) => i !== index);
                          handleThumbnailsChange(newThumbnails);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Cloudinary Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <CloudinaryUpload
                  onUploadComplete={(url: string) => {
                    const newThumbnails = [...formData.thumbnails, url];
                    handleThumbnailsChange(newThumbnails);
                    toast.success("Thumbnail uploaded successfully!");
                  }}
                  onError={(error: any) => {
                    console.error("Upload error:", error);
                    toast.error("Failed to upload thumbnail");
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Click to upload a new thumbnail image
                </p>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) =>
                handleInputChange("shortDescription", e.target.value)
              }
              placeholder="Brief description (1-2 sentences)"
              rows={2}
              required
            />
          </div>

          {/* Full Description */}
          <div className="md:col-span-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) =>
                handleInputChange("fullDescription", e.target.value)
              }
              placeholder="Detailed description (optional)"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="dental anatomy, tooth structure, occlusion"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <Label htmlFor="content">Content (Markdown) *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="# Introduction

Enter your note content here using Markdown formatting...

## Section Title

- Bullet points
- More content

### Subsection

**Bold text** and *italic text* supported."
              rows={20}
              className="font-mono text-sm"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Use Markdown formatting for headings, lists, and text styling
            </p>
          </div>

          {/* Featured & Popular */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleInputChange("featured", !!checked)
                  }
                />
                <Label htmlFor="featured">Featured Note</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) =>
                    handleInputChange("popular", !!checked)
                  }
                />
                <Label htmlFor="popular">Popular Note</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Link href="/admin-dashboard/notes">
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
                {isEditing ? "Update Note" : "Create Note"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateNotePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CreateNoteForm />
    </Suspense>
  );
}
