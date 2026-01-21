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
import { Review } from "@/types/types";
import { createReview, updateReview, getReviewById } from "@/lib/actions/review-actions";

function ReviewFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("id");
  const isEditing = !!reviewId;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [formData, setFormData] = useState<Review>({
    id: "",
    name: "",
    course: "",
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    text: "",
    avatar: "",
    verified: false,
  });

  // Load review data for editing
  useEffect(() => {
    if (isEditing && reviewId) {
      const loadReview = async () => {
        try {
          const review = await getReviewById(reviewId);
          if (review) {
            setFormData(review);
          }
        } catch (error) {
          toast.error("Failed to load review data");
        } finally {
          setInitialLoading(false);
        }
      };
      loadReview();
    } else {
      setInitialLoading(false);
    }
  }, [reviewId, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.course.trim()) errors.push("Course is required");
    if (!formData.text.trim()) errors.push("Review text is required");
    if (!formData.avatar.trim()) errors.push("Avatar URL is required");
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
      if (isEditing) {
        await updateReview(reviewId, formData);
        toast.success("Review updated successfully");
      } else {
        await createReview(formData);
        toast.success("Review created successfully");
      }
      router.push("/admin-dashboard/reviews");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save review");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading review data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/reviews">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reviews
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Review" : "Create New Review"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Review Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Reviewer name"
              />
            </div>

            <div>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => handleInputChange("course", e.target.value)}
                placeholder="Course name"
              />
            </div>

            <div>
              <Label htmlFor="text">Review Text</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                rows={4}
                placeholder="Review content"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange("avatar", e.target.value)}
                  placeholder="https://..."
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleInputChange("rating", parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="verified">Verified</Label>
                <Input
                  id="verified"
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => handleInputChange("verified", e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin-dashboard/reviews">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEditing ? "Update Review" : "Create Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ReviewFormPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center">Loading...</div></div>}>
      <ReviewFormContent />
    </Suspense>
  );
}
