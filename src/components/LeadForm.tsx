"use client";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createLead } from "@/lib/actions/leads-actions";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; 

export default function LeadForm() {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    college: "",
    passingYear: "",
    programme: "",
    mode: "",
    courseInterest: "",
    query: "",
    // New Fields
    presentAddress: "",
    preferredDemoDate: "",
    preferredDemoTime: "",
    targetCourseStartDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    startTransition(async () => {
      const result = await createLead(formData);

      if (result.success) {
        toast.success("Demo request submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          college: "",
          passingYear: "",
          programme: "",
          mode: "",
          courseInterest: "",
          query: "",
          presentAddress: "",
          preferredDemoDate: "",
          preferredDemoTime: "",
          targetCourseStartDate: "",
        });
      } else {
        toast.error(result.error || "Something went wrong");
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Enter your first name" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Enter your last name" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">Phone Number <span className="text-destructive">*</span></Label>
          <PhoneInput
            international
            defaultCountry="IN"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2"
          />
        </div>
      </div>

      {/* Address Field */}
      <div>
        <Label htmlFor="presentAddress">Present Address</Label>
        <Input
          id="presentAddress"
          name="presentAddress"
          value={formData.presentAddress}
          onChange={handleChange}
          placeholder="Enter your current city or full address"
        />
      </div>

      {/* Education Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="college">Graduation College</Label>
          <Input id="college" name="college" value={formData.college} onChange={handleChange} placeholder="Name of your college" />
        </div>
        <div>
          <Label htmlFor="passingYear">Graduation Passing Year</Label>
          <Input id="passingYear" name="passingYear" value={formData.passingYear} onChange={handleChange} placeholder="e.g., 2023" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="programme">Graduation Programme</Label>
          <Input id="programme" name="programme" value={formData.programme} onChange={handleChange} placeholder="e.g., BDS, MDS" />
        </div>
        <div>
          <Label htmlFor="mode">Preferred Mode</Label>
          <select
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>

      {/* Demo Class Scheduling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
        <div>
          <Label htmlFor="preferredDemoDate">Preferred Demo Date</Label>
          <Input
            id="preferredDemoDate"
            name="preferredDemoDate"
            type="date"
            value={formData.preferredDemoDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="preferredDemoTime">Preferred Demo Time</Label>
          <Input
            id="preferredDemoTime"
            name="preferredDemoTime"
            type="time"
            value={formData.preferredDemoTime}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Course Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="courseInterest">Course Interested In</Label>
          <Input id="courseInterest" name="courseInterest" value={formData.courseInterest} onChange={handleChange} placeholder="e.g., Dental Implants" />
        </div>
        <div>
          <Label htmlFor="targetCourseStartDate">Expected Start Date</Label>
          <Input
            id="targetCourseStartDate"
            name="targetCourseStartDate"
            type="date"
            value={formData.targetCourseStartDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="query">Any Query or Message</Label>
        <Textarea id="query" name="query" value={formData.query} onChange={handleChange} placeholder="Tell us about your requirements..." rows={3} />
      </div>

      <Button type="submit" disabled={isPending} className="w-full bg-(--color-1) hover:bg-(--color-2)">
        {isPending ? "Submitting..." : "Request Free Demo Class"}
      </Button>
    </form>
  );
}