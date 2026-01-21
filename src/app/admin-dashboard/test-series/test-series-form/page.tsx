"use client"

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Exam } from "@/types/types";

function ExamFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditing = !!slug;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [formData, setFormData] = useState<Exam>({
    id: "",
    slug: "",
    name: "",
    fullName: "",
    country: "",
    countryFlag: "",
    shortDescription: "",
    fullDescription: "",
    thumbnail: "",
    icon: "",
    whoIsThisFor: [""],
    whatIncluded: [""],
    studyPlan: [{ phase: "", duration: "", focus: [""] }],
    reviews: [{ name: "", text: "", rating: 5 }]
  });

  // Load exam data for editing
  useEffect(() => {
    if (isEditing && slug) {
      const loadExam = async () => {
        try {
          const response = await fetch(`/api/exams?slug=${slug}`);
          if (response.ok) {
            const exam = await response.json();
            setFormData(exam);
          }
        } catch (error) {
          toast.error("Failed to load exam data");
        } finally {
          setInitialLoading(false);
        }
      };
      loadExam();
    } else {
      setInitialLoading(false);
    }
  }, [slug, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: any) => {
    const currentArray = formData[field as keyof Exam] as any[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string, defaultValue: any = "") => {
    const currentArray = formData[field as keyof Exam] as any[];
    setFormData(prev => ({ ...prev, [field]: [...currentArray, defaultValue] }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = formData[field as keyof Exam] as any[];
    if (currentArray.length > 1) {
      const newArray = currentArray.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.slug.trim()) errors.push("Slug is required");
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.fullName.trim()) errors.push("Full name is required");
    if (!formData.country.trim()) errors.push("Country is required");
    if (!formData.countryFlag.trim()) errors.push("Country flag is required");
    if (!formData.shortDescription.trim()) errors.push("Short description is required");
    if (!formData.fullDescription.trim()) errors.push("Full description is required");
    if (!formData.thumbnail.trim()) errors.push("Thumbnail URL is required");
    if (!formData.icon.trim()) errors.push("Icon is required");

    // Validate whoIsThisFor array
    if (formData.whoIsThisFor.length === 0 || formData.whoIsThisFor.some(item => !item.trim())) {
      errors.push("At least one target audience is required");
    }

    // Validate whatIncluded array
    if (formData.whatIncluded.length === 0 || formData.whatIncluded.some(item => !item.trim())) {
      errors.push("At least one included item is required");
    }

    // Validate studyPlan
    if (formData.studyPlan.length === 0) {
      errors.push("At least one study plan phase is required");
    } else {
      formData.studyPlan.forEach((phase, index) => {
        if (!phase.phase.trim()) {
          errors.push(`Phase ${index + 1} name is required`);
        }
        if (!phase.duration.trim()) {
          errors.push(`Phase ${index + 1} duration is required`);
        }
        if (phase.focus.length === 0 || phase.focus.some(focus => !focus.trim())) {
          errors.push(`Phase ${index + 1} must have at least one focus area`);
        }
      });
    }

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
      const url = isEditing ? `/api/exams?slug=${slug}` : "/api/exams";

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
        toast.success(isEditing ? "Exam updated successfully" : "Exam created successfully");
        router.push("/admin-dashboard/exams");
      } else {
        toast.error(responseData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save exam");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading exam data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/exams">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exams
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Exam" : "Create New Exam"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="exam-slug"
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="INBDE"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Integrated National Board Dental Examination"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="USA"
                />
              </div>
              <div>
                <Label htmlFor="countryFlag">Country Flag</Label>
                <Input
                  id="countryFlag"
                  value={formData.countryFlag}
                  onChange={(e) => handleInputChange("countryFlag", e.target.value)}
                  placeholder="🇺🇸"
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
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => handleInputChange("icon", e.target.value)}
                  placeholder="GraduationCap"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Who Is This For */}
        <Card>
          <CardHeader>
            <CardTitle>Who Is This For</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.whoIsThisFor.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange("whoIsThisFor", index, e.target.value)}
                  placeholder="Target audience"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("whoIsThisFor", index)}
                  disabled={formData.whoIsThisFor.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("whoIsThisFor")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Target Audience
            </Button>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card>
          <CardHeader>
            <CardTitle>What's Included</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.whatIncluded.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange("whatIncluded", index, e.target.value)}
                  placeholder="What's included"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("whatIncluded", index)}
                  disabled={formData.whatIncluded.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("whatIncluded")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Included Item
            </Button>
          </CardContent>
        </Card>

        {/* Study Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Study Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.studyPlan.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Phase {phaseIndex + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("studyPlan", phaseIndex)}
                    disabled={formData.studyPlan.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Phase Name</Label>
                    <Input
                      value={phase.phase}
                      onChange={(e) => {
                        const newStudyPlan = [...formData.studyPlan];
                        newStudyPlan[phaseIndex].phase = e.target.value;
                        handleInputChange("studyPlan", newStudyPlan);
                      }}
                      placeholder="Foundation Phase"
                    />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={phase.duration}
                      onChange={(e) => {
                        const newStudyPlan = [...formData.studyPlan];
                        newStudyPlan[phaseIndex].duration = e.target.value;
                        handleInputChange("studyPlan", newStudyPlan);
                      }}
                      placeholder="2-3 months"
                    />
                  </div>
                </div>

                <Label>Focus Areas</Label>
                {phase.focus.map((focus, focusIndex) => (
                  <div key={focusIndex} className="flex gap-2 mt-2">
                    <Input
                      value={focus}
                      onChange={(e) => {
                        const newStudyPlan = [...formData.studyPlan];
                        newStudyPlan[phaseIndex].focus[focusIndex] = e.target.value;
                        handleInputChange("studyPlan", newStudyPlan);
                      }}
                      placeholder="Focus area"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newStudyPlan = [...formData.studyPlan];
                        newStudyPlan[phaseIndex].focus = newStudyPlan[phaseIndex].focus.filter((_, i) => i !== focusIndex);
                        handleInputChange("studyPlan", newStudyPlan);
                      }}
                      disabled={phase.focus.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    const newStudyPlan = [...formData.studyPlan];
                    newStudyPlan[phaseIndex].focus.push("");
                    handleInputChange("studyPlan", newStudyPlan);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Focus Area
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("studyPlan", { phase: "", duration: "", focus: [""] })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Phase
            </Button>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.reviews.map((review, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Review {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("reviews", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={review.name}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[index].name = e.target.value;
                          handleInputChange("reviews", newReviews);
                        }}
                        placeholder="Reviewer name"
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={review.rating}
                        onChange={(e) => {
                          const newReviews = [...formData.reviews];
                          newReviews[index].rating = parseInt(e.target.value) || 5;
                          handleInputChange("reviews", newReviews);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Review Text</Label>
                    <Textarea
                      value={review.text}
                      onChange={(e) => {
                        const newReviews = [...formData.reviews];
                        newReviews[index].text = e.target.value;
                        handleInputChange("reviews", newReviews);
                      }}
                      rows={3}
                      placeholder="Review text"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("reviews", { name: "", text: "", rating: 5 })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin-dashboard/exams">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEditing ? "Update Exam" : "Create Exam"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ExamFormPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center">Loading...</div></div>}>
      <ExamFormContent />
    </Suspense>
  );
}
