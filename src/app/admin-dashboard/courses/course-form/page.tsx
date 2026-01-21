"use client"

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, Plus, Trash2, Upload, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Course } from "@/types/types";
import { UploadButton } from "@/utils/uploadthing";

function CourseFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditing = !!slug;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [formData, setFormData] = useState<Course>({
    id: "",
    slug: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: 0,
    thumbnail: "",
    category: "",
    mode: "Online",
    duration: "",
    rating: 5,
    reviewCount: 0,
    featured: false,
    popular: false,
    whatYouLearn: [""],
    curriculum: [{ module: "", topics: [""] }],
    whoIsThisFor: [""],
    faculty: { name: "", title: "", image: "", bio: "" },
    faqs: [{ question: "", answer: "" }]
  });

  // Load course data for editing
  useEffect(() => {
    if (isEditing && slug) {
      const loadCourse = async () => {
        try {
          const response = await fetch(`/api/courses?slug=${slug}`);
          if (response.ok) {
            const course = await response.json();
            setFormData(course);
          }
        } catch (error) {
          toast.error("Failed to load course data");
        } finally {
          setInitialLoading(false);
        }
      };
      loadCourse();
    } else {
      setInitialLoading(false);
    }
  }, [slug, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field: string, nestedField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field as keyof Course] as any, [nestedField]: value }
    }));
  };

  const handleArrayChange = (field: string, index: number, value: any) => {
    const currentArray = formData[field as keyof Course] as any[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string, defaultValue: any = "") => {
    const currentArray = formData[field as keyof Course] as any[];
    setFormData(prev => ({ ...prev, [field]: [...currentArray, defaultValue] }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = formData[field as keyof Course] as any[];
    if (currentArray.length > 1) {
      const newArray = currentArray.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.slug.trim()) errors.push("Slug is required");
    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.shortDescription.trim()) errors.push("Short description is required");
    if (!formData.fullDescription.trim()) errors.push("Full description is required");
    if (!formData.thumbnail.trim()) errors.push("Thumbnail URL is required");
    if (!formData.category.trim()) errors.push("Category is required");
    if (!formData.duration.trim()) errors.push("Duration is required");
    if (formData.price <= 0) errors.push("Price must be greater than 0");

    // Validate whatYouLearn array
    if (formData.whatYouLearn.length === 0 || formData.whatYouLearn.some(item => !item.trim())) {
      errors.push("At least one learning objective is required");
    }

    // Validate curriculum
    if (formData.curriculum.length === 0) {
      errors.push("At least one curriculum module is required");
    } else {
      formData.curriculum.forEach((module, index) => {
        if (!module.module.trim()) {
          errors.push(`Module ${index + 1} name is required`);
        }
        if (module.topics.length === 0 || module.topics.some(topic => !topic.trim())) {
          errors.push(`Module ${index + 1} must have at least one topic`);
        }
      });
    }

    // Validate whoIsThisFor array
    if (formData.whoIsThisFor.length === 0 || formData.whoIsThisFor.some(item => !item.trim())) {
      errors.push("At least one target audience is required");
    }

    // Validate faculty
    if (!formData.faculty.name.trim()) errors.push("Faculty name is required");
    if (!formData.faculty.title.trim()) errors.push("Faculty title is required");
    if (!formData.faculty.image.trim()) errors.push("Faculty image URL is required");
    if (!formData.faculty.bio.trim()) errors.push("Faculty bio is required");

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
      const url = isEditing ? `/api/courses?slug=${slug}` : "/api/courses";

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
        toast.success(isEditing ? "Course updated successfully" : "Course created successfully");
        router.push("/admin-dashboard/courses");
      } else {
        toast.error(responseData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading course data...</div>
      </div>
    );
  }

  return (
    <div className="p-8  w-m-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Course" : "Create New Course"}
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
                  placeholder="course-slug"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g., Medical, Dental"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Course Title"
              />
            </div>

            <div>
              <Label>Thumbnail</Label>
              <div className="space-y-4">
                {formData.thumbnail && (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={formData.thumbnail}
                      alt="Course thumbnail"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Current thumbnail</p>
                      <p className="text-xs text-gray-400 break-all">{formData.thumbnail}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("thumbnail", "")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <UploadButton
                    endpoint="Image"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        handleInputChange("thumbnail", res[0].url);
                        toast.success("Thumbnail uploaded successfully!");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    className="ut-button:bg-primary ut-button:hover:bg-primary/90 ut-button:text-primary-foreground ut-button:px-4 ut-button:py-2 ut-button:rounded-md ut-button:text-sm ut-button:font-medium"
                  />
                  {!formData.thumbnail && (
                    <span className="text-sm text-gray-500">
                      <Upload className="inline h-4 w-4 mr-1" />
                      Upload a thumbnail image
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="mode">Mode</Label>
                <Select value={formData.mode} onValueChange={(value) => handleInputChange("mode", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="e.g., 3 months"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="reviewCount">Review Count</Label>
                <Input
                  id="reviewCount"
                  type="number"
                  value={formData.reviewCount}
                  onChange={(e) => handleInputChange("reviewCount", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="originalPrice">Original Price (₹) - Optional</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ""}
                  onChange={(e) => handleInputChange("originalPrice", e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Leave empty if no discount"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange("featured", checked)}
                />
                <Label htmlFor="featured">Featured Course</Label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) => handleInputChange("popular", checked)}
              />
              <Label htmlFor="popular">Popular Course</Label>
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
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* What You Will Learn */}
        <Card>
          <CardHeader>
            <CardTitle>What You Will Learn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.whatYouLearn.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange("whatYouLearn", index, e.target.value)}
                  placeholder="Learning objective"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("whatYouLearn", index)}
                  disabled={formData.whatYouLearn.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("whatYouLearn")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Learning Objective
            </Button>
          </CardContent>
        </Card>

        {/* Curriculum */}
        <Card>
          <CardHeader>
            <CardTitle>Curriculum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.curriculum.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Module {moduleIndex + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("curriculum", moduleIndex)}
                    disabled={formData.curriculum.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <Label>Module Name</Label>
                  <Input
                    value={module.module}
                    onChange={(e) => {
                      const newCurriculum = [...formData.curriculum];
                      newCurriculum[moduleIndex].module = e.target.value;
                      handleInputChange("curriculum", newCurriculum);
                    }}
                    placeholder="Module title"
                  />
                </div>

                <Label>Topics</Label>
                {module.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex gap-2 mt-2">
                    <Input
                      value={topic}
                      onChange={(e) => {
                        const newCurriculum = [...formData.curriculum];
                        newCurriculum[moduleIndex].topics[topicIndex] = e.target.value;
                        handleInputChange("curriculum", newCurriculum);
                      }}
                      placeholder="Topic name"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newCurriculum = [...formData.curriculum];
                        newCurriculum[moduleIndex].topics = newCurriculum[moduleIndex].topics.filter((_, i) => i !== topicIndex);
                        handleInputChange("curriculum", newCurriculum);
                      }}
                      disabled={module.topics.length === 1}
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
                    const newCurriculum = [...formData.curriculum];
                    newCurriculum[moduleIndex].topics.push("");
                    handleInputChange("curriculum", newCurriculum);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Topic
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("curriculum", { module: "", topics: [""] })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle>Who Is This Course For</CardTitle>
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

        {/* Faculty */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="faculty.name">Name</Label>
                <Input
                  id="faculty.name"
                  value={formData.faculty.name}
                  onChange={(e) => handleNestedChange("faculty", "name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="faculty.title">Title</Label>
                <Input
                  id="faculty.title"
                  value={formData.faculty.title}
                  onChange={(e) => handleNestedChange("faculty", "title", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Faculty Image</Label>
              <div className="space-y-4">
                {formData.faculty.image && (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={formData.faculty.image}
                      alt="Faculty image"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Current faculty image</p>
                      <p className="text-xs text-gray-400 break-all">{formData.faculty.image}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleNestedChange("faculty", "image", "")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <UploadButton
                    endpoint="Image"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        handleNestedChange("faculty", "image", res[0].url);
                        toast.success("Faculty image uploaded successfully!");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    className="ut-button:bg-primary ut-button:hover:bg-primary/90 ut-button:text-primary-foreground ut-button:px-4 ut-button:py-2 ut-button:rounded-md ut-button:text-sm ut-button:font-medium"
                  />
                  {!formData.faculty.image && (
                    <span className="text-sm text-gray-500">
                      <Upload className="inline h-4 w-4 mr-1" />
                      Upload faculty image
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="faculty.bio">Bio</Label>
              <Textarea
                id="faculty.bio"
                value={formData.faculty.bio}
                onChange={(e) => handleNestedChange("faculty", "bio", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">FAQ {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("faqs", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => {
                        const newFaqs = [...formData.faqs];
                        newFaqs[index].question = e.target.value;
                        handleInputChange("faqs", newFaqs);
                      }}
                      placeholder="Question"
                    />
                  </div>

                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => {
                        const newFaqs = [...formData.faqs];
                        newFaqs[index].answer = e.target.value;
                        handleInputChange("faqs", newFaqs);
                      }}
                      rows={3}
                      placeholder="Answer"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("faqs", { question: "", answer: "" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin-dashboard/courses">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEditing ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CourseFormPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center">Loading...</div></div>}>
      <CourseFormContent />
    </Suspense>
  );
}
