"use client"

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, Plus, Trash2, Upload, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { TestSeries } from "@/types/types";
import { CloudinaryUpload } from "@/components/Upload";

function TestSeriesFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditing = !!slug;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [formData, setFormData] = useState<TestSeries>({
    id: "",
    slug: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    thumbnails: [],
    category: "",
    examType: "",
    price: 0,
    originalPrice: undefined,
    rating: 0,
    reviewCount: 0,
    featured: false,
    questionsCount: 0,
    duration: "",
    difficulty: "Beginner",
    whatIncluded: [""],
    sampleQuestions: [{ question: "", options: [""], correctAnswer: 0, explanation: "" }]
  });

  // Load test series data for editing
  useEffect(() => {
    if (isEditing && slug) {
      const loadTestSeries = async () => {
        try {
          const response = await fetch(`/api/testSeries?slug=${slug}`);
          if (response.ok) {
            const testSeries = await response.json();
            setFormData(testSeries);
          }
        } catch (error) {
          toast.error("Failed to load test series data");
        } finally {
          setInitialLoading(false);
        }
      };
      loadTestSeries();
    } else {
      setInitialLoading(false);
    }
  }, [slug, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: any) => {
    const currentArray = (formData as any)[field] as any[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string, defaultValue: any = "") => {
    const currentArray = (formData as any)[field] as any[];
    setFormData(prev => ({ ...prev, [field]: [...currentArray, defaultValue] }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = (formData as any)[field] as any[];
    if (currentArray.length > 1) {
      const newArray = currentArray.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleThumbnailsChange = (newThumbnails: string[]) => {
    setFormData(prev => ({
      ...prev,
      thumbnails: newThumbnails,
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.slug.trim()) errors.push("Slug is required");
    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.shortDescription.trim()) errors.push("Short description is required");
    if (!formData.fullDescription.trim()) errors.push("Full description is required");
    if (!formData.category.trim()) errors.push("Category is required");
    if (!formData.examType.trim()) errors.push("Exam type is required");
    if (formData.price < 0) errors.push("Price must be a valid number");
    if (formData.questionsCount < 0) errors.push("Questions count must be a valid number");
    if (!formData.duration.trim()) errors.push("Duration is required");

    // Validate whatIncluded array
    if (formData.whatIncluded.length === 0 || formData.whatIncluded.some(item => !item.trim())) {
      errors.push("At least one included item is required");
    }

    // Validate sampleQuestions
    if (formData.sampleQuestions.length === 0) {
      errors.push("At least one sample question is required");
    } else {
      formData.sampleQuestions.forEach((question, index) => {
        if (!question.question.trim()) {
          errors.push(`Sample question ${index + 1} is required`);
        }
        if (question.options.length === 0 || question.options.some(option => !option.trim())) {
          errors.push(`Sample question ${index + 1} must have at least one option`);
        }
        if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
          errors.push(`Sample question ${index + 1} must have a valid correct answer index`);
        }
        if (!question.explanation.trim()) {
          errors.push(`Sample question ${index + 1} must have an explanation`);
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
      const url = isEditing ? `/api/testSeries?slug=${slug}` : "/api/testSeries";

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
        toast.success(isEditing ? "Test series updated successfully" : "Test series created successfully");
        router.push("/admin-dashboard/test-series");
      } else {
        toast.error(responseData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save test series");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading test series data...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/test-series">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Test Series
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Test Series" : "Create New Test Series"}
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
                  placeholder="test-series-slug"
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Dental Board Exam Practice Tests"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="Dental Exams"
                />
              </div>
              <div>
                <Label htmlFor="examType">Exam Type</Label>
                <Input
                  id="examType"
                  value={formData.examType}
                  onChange={(e) => handleInputChange("examType", e.target.value)}
                  placeholder="INBDE, NEET MDS, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ""}
                  onChange={(e) => handleInputChange("originalPrice", e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="questionsCount">Questions Count</Label>
                <Input
                  id="questionsCount"
                  type="number"
                  value={formData.questionsCount}
                  onChange={(e) => handleInputChange("questionsCount", parseInt(e.target.value) || 0)}
                  placeholder="100"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="2 hours"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => handleInputChange("difficulty", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Thumbnails */}
        <Card>
          <CardHeader>
            <CardTitle>Thumbnails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Upload Thumbnails</Label>
              <div className="space-y-4">
                {formData.thumbnails.map((thumbnail, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Thumbnail {index + 1}</p>
                      <p className="text-xs text-gray-400 break-all">{thumbnail}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newThumbnails = formData.thumbnails.filter((_, i) => i !== index);
                        handleThumbnailsChange(newThumbnails);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <CloudinaryUpload
                    onUploadComplete={(url: string) => {
                      const newThumbnails = [...formData.thumbnails, url];
                      handleThumbnailsChange(newThumbnails);
                      toast.success("Thumbnail uploaded successfully!");
                    }}
                    onError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                  <span className="text-sm text-gray-500">
                    <Upload className="inline h-4 w-4 mr-1" />
                    Upload thumbnail images
                  </span>
                </div>
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
                placeholder="Brief description of the test series"
              />
            </div>

            <div>
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                rows={4}
                placeholder="Detailed description of the test series"
              />
            </div>
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

        {/* Sample Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.sampleQuestions.map((question, questionIndex) => (
              <div key={questionIndex} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Sample Question {questionIndex + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("sampleQuestions", questionIndex)}
                    disabled={formData.sampleQuestions.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Textarea
                      value={question.question}
                      onChange={(e) => {
                        const newSampleQuestions = [...formData.sampleQuestions];
                        newSampleQuestions[questionIndex].question = e.target.value;
                        handleInputChange("sampleQuestions", newSampleQuestions);
                      }}
                      rows={3}
                      placeholder="Enter the question"
                    />
                  </div>

                  <div>
                    <Label>Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-2 mt-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newSampleQuestions = [...formData.sampleQuestions];
                            newSampleQuestions[questionIndex].options[optionIndex] = e.target.value;
                            handleInputChange("sampleQuestions", newSampleQuestions);
                          }}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newSampleQuestions = [...formData.sampleQuestions];
                            newSampleQuestions[questionIndex].options = newSampleQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
                            handleInputChange("sampleQuestions", newSampleQuestions);
                          }}
                          disabled={question.options.length === 1}
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
                        const newSampleQuestions = [...formData.sampleQuestions];
                        newSampleQuestions[questionIndex].options.push("");
                        handleInputChange("sampleQuestions", newSampleQuestions);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Correct Answer Index</Label>
                      <Input
                        type="number"
                        min="0"
                        value={question.correctAnswer}
                        onChange={(e) => {
                          const newSampleQuestions = [...formData.sampleQuestions];
                          newSampleQuestions[questionIndex].correctAnswer = parseInt(e.target.value) || 0;
                          handleInputChange("sampleQuestions", newSampleQuestions);
                        }}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label>Explanation</Label>
                      <Textarea
                        value={question.explanation}
                        onChange={(e) => {
                          const newSampleQuestions = [...formData.sampleQuestions];
                          newSampleQuestions[questionIndex].explanation = e.target.value;
                          handleInputChange("sampleQuestions", newSampleQuestions);
                        }}
                        rows={2}
                        placeholder="Explanation for the correct answer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("sampleQuestions", { question: "", options: [""], correctAnswer: 0, explanation: "" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Sample Question
            </Button>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange("featured", e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin-dashboard/test-series">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEditing ? "Update Test Series" : "Create Test Series"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function TestSeriesFormPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center">Loading...</div></div>}>
      <TestSeriesFormContent />
    </Suspense>
  );
}
