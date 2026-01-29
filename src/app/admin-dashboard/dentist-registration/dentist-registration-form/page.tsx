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
import { DentistRegistration } from "@/types/types";
import { CloudinaryUpload } from "@/components/Upload";


function DentistRegistrationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditing = !!slug;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [formData, setFormData] = useState<DentistRegistration>({
    id: "",
    slug: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: 0,
    originalPrice: undefined,
    thumbnails: [],
    category: "",
    mode: "Online",
    duration: "",
    rating: 0,
    reviewCount: 0,
    featured: false,
    popular: false,
    whatYouLearn: [""],
    curriculum: [{ module: "", topics: [""] }],
    whoIsThisFor: [""],
    faculty: [{ name: "", title: "", image: "", bio: "" }],
    faqs: [{ question: "", answer: "" }],
    // Legacy dentist registration fields
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: 0,
    clinicName: "",
    clinicAddress: "",
    registrationNumber: "",
    specializations: [""],
    availability: {
      monday: { available: false },
      tuesday: { available: false },
      wednesday: { available: false },
      thursday: { available: false },
      friday: { available: false },
      saturday: { available: false },
      sunday: { available: false }
    },
    consultationFee: 0,
    emergencyFee: 0,
    languages: [""],
    about: "",
    education: [{ degree: "", institution: "", year: 0 }],
    certifications: [""],
    awards: [""],
    photo: "",
    verified: false,
    active: true,
    createdAt: "",
    updatedAt: ""
  });

  // Load dentist registration data for editing
  useEffect(() => {
    if (isEditing && slug) {
      const loadDentistRegistration = async () => {
        try {
          const response = await fetch(`/api/dentist-registrations?slug=${slug}`);
          if (response.ok) {
            const dentistRegistration = await response.json();
            setFormData(dentistRegistration);
          }
        } catch (error) {
          toast.error("Failed to load dentist registration data");
        } finally {
          setInitialLoading(false);
        }
      };
      loadDentistRegistration();
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
      [field]: { ...(prev as any)[field], [nestedField]: value }
    }));
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

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone is required");
    if (!formData.qualification.trim()) errors.push("Qualification is required");
    if (!formData.clinicName.trim()) errors.push("Clinic name is required");
    if (!formData.clinicAddress.trim()) errors.push("Clinic address is required");
    if (!formData.registrationNumber.trim()) errors.push("Registration number is required");
    if (formData.experience < 0) errors.push("Experience must be a valid number");
    if (formData.consultationFee < 0) errors.push("Consultation fee must be a valid number");
    if (formData.emergencyFee < 0) errors.push("Emergency fee must be a valid number");

    // Validate specializations array
    if (formData.specializations.length === 0 || formData.specializations.some(item => !item.trim())) {
      errors.push("At least one specialization is required");
    }

    // Validate languages array
    if (formData.languages.length === 0 || formData.languages.some(item => !item.trim())) {
      errors.push("At least one language is required");
    }

    // Validate education array
    if (formData.education.length === 0) {
      errors.push("At least one education entry is required");
    } else {
      formData.education.forEach((edu, index) => {
        if (!edu.degree.trim()) {
          errors.push(`Education ${index + 1} degree is required`);
        }
        if (!edu.institution.trim()) {
          errors.push(`Education ${index + 1} institution is required`);
        }
        if (edu.year <= 0) {
          errors.push(`Education ${index + 1} year must be valid`);
        }
      });
    }

    // Validate certifications array
    if (formData.certifications.length === 0 || formData.certifications.some(item => !item.trim())) {
      errors.push("At least one certification is required");
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
      const url = isEditing ? `/api/dentist-registrations?slug=${slug}` : "/api/dentist-registrations";

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
        toast.success(isEditing ? "Dentist registration updated successfully" : "Dentist registration created successfully");
        router.push("/admin-dashboard/dentist-registration");
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
        <div className="text-center">Loading dentist registration data...</div>
      </div>
    );
  }

  return (
    <div className="p-8  w-m-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin-dashboard/dentist-registration">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dentist Registrations
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Dentist Registration" : "Create New Dentist Registration"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Dentist's full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="dentist@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange("qualification", e.target.value)}
                  placeholder="e.g., BDS, MDS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  placeholder="Dental council registration number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                rows={4}
                placeholder="Brief description about the dentist"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clinic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Clinic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clinicName">Clinic Name</Label>
              <Input
                id="clinicName"
                value={formData.clinicName}
                onChange={(e) => handleInputChange("clinicName", e.target.value)}
                placeholder="Clinic name"
              />
            </div>

            <div>
              <Label htmlFor="clinicAddress">Clinic Address</Label>
              <Textarea
                id="clinicAddress"
                value={formData.clinicAddress}
                onChange={(e) => handleInputChange("clinicAddress", e.target.value)}
                rows={3}
                placeholder="Complete clinic address"
              />
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
                        handleInputChange("thumbnails", newThumbnails);
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
                      handleInputChange("thumbnails", newThumbnails);
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

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Specializations</Label>
              <div className="space-y-2">
                {formData.specializations.map((specialization, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={specialization}
                      onChange={(e) => handleArrayChange("specializations", index, e.target.value)}
                      placeholder="Specialization"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("specializations", index)}
                      disabled={formData.specializations.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("specializations")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Specialization
                </Button>
              </div>
            </div>

            <div>
              <Label>Languages</Label>
              <div className="space-y-2">
                {formData.languages.map((language, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={language}
                      onChange={(e) => handleArrayChange("languages", index, e.target.value)}
                      placeholder="Language"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("languages", index)}
                      disabled={formData.languages.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("languages")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Language
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
                <Input
                  id="consultationFee"
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) => handleInputChange("consultationFee", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="emergencyFee">Emergency Fee (₹)</Label>
                <Input
                  id="emergencyFee"
                  type="number"
                  value={formData.emergencyFee}
                  onChange={(e) => handleInputChange("emergencyFee", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("education", index)}
                    disabled={formData.education.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].degree = e.target.value;
                        handleInputChange("education", newEducation);
                      }}
                      placeholder="e.g., BDS, MDS"
                    />
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].institution = e.target.value;
                        handleInputChange("education", newEducation);
                      }}
                      placeholder="University/College name"
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      value={edu.year}
                      type="number"
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].year = parseInt(e.target.value) || 0;
                        handleInputChange("education", newEducation);
                      }}
                      placeholder="Year"
                      min="1900"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("education", { degree: "", institution: "", year: 0 })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </CardContent>
        </Card>

        {/* Certifications and Awards */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications and Awards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Certifications</Label>
              <div className="space-y-2">
                {formData.certifications.map((certification, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={certification}
                      onChange={(e) => handleArrayChange("certifications", index, e.target.value)}
                      placeholder="Certification"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("certifications", index)}
                      disabled={formData.certifications.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("certifications")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </div>
            </div>

            <div>
              <Label>Awards</Label>
              <div className="space-y-2">
                {formData.awards.map((award, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={award}
                      onChange={(e) => handleArrayChange("awards", index, e.target.value)}
                      placeholder="Award"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("awards", index)}
                      disabled={formData.awards.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("awards")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Award
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(formData.availability).map(([day, availability]) => (
              <div key={day} className="flex items-center justify-between">
                <Label className="capitalize">{day}</Label>
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={(availability as any).available || false}
                    onCheckedChange={(checked) => {
                      const newAvailability = { ...formData.availability };
                      newAvailability[day as keyof typeof formData.availability] = { available: checked as boolean };
                      handleInputChange("availability", newAvailability);
                    }}
                  />
                  {((availability as any).available || false) && (
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={(availability as any).start || ""}
                        onChange={(e) => {
                          const newAvailability = { ...formData.availability };
                          newAvailability[day as keyof typeof formData.availability] = {
                            start: e.target.value,
                            end: (availability as any).end || ""
                          };
                          handleInputChange("availability", newAvailability);
                        }}
                      />
                      <span>-</span>
                      <Input
                        type="time"
                        value={(availability as any).end || ""}
                        onChange={(e) => {
                          const newAvailability = { ...formData.availability };
                          newAvailability[day as keyof typeof formData.availability] = {
                            start: (availability as any).start || "",
                            end: e.target.value
                          };
                          handleInputChange("availability", newAvailability);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={formData.verified}
                onCheckedChange={(checked) => handleInputChange("verified", checked)}
              />
              <Label htmlFor="verified">Verified</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleInputChange("active", checked)}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin-dashboard/dentist-registration">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEditing ? "Update Dentist Registration" : "Create Dentist Registration"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function DentistRegistrationFormPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center">Loading...</div></div>}>
      <DentistRegistrationFormContent />
    </Suspense>
  );
}
