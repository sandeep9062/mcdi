"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DentistRegistrationTable from "./dentist-registration-table";
import { DentistRegistration } from "@/types/types";

interface ApiResponse {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  thumbnails: unknown; // Will be cast to string[]
  category: string;
  mode: "Online" | "Offline" | "Hybrid";
  duration: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
  whatYouLearn: string[];
  curriculum: { module: string; topics: string[]; }[];
  whoIsThisFor: string[];
  faculty: { name: string; title: string; image: string; bio: string; };
  faqs: { question: string; answer: string; }[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminDentistRegistrationPage() {
  const [data, setData] = useState<DentistRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDentistRegistrations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dentist-registrations');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dentist registrations');
        }

        const rawDentistRegistrations: ApiResponse[] = await response.json();
        const allDentistRegistrations = rawDentistRegistrations.map((registration) => ({
          ...registration,
          originalPrice: registration.originalPrice ?? undefined,
          mode: registration.mode as "Online" | "Offline" | "Hybrid",
          thumbnails: registration.thumbnails as string[],
          whatYouLearn: registration.whatYouLearn as string[],
          curriculum: registration.curriculum as { module: string; topics: string[]; }[],
          whoIsThisFor: registration.whoIsThisFor as string[],
          faculty: [registration.faculty] as { name: string; title: string; image: string; bio: string; }[],
          faqs: registration.faqs as { question: string; answer: string; }[],
          // Legacy dentist registration fields (set to defaults for new format)
          name: "",
          email: "",
          phone: "",
          qualification: "",
          experience: 0,
          clinicName: "",
          clinicAddress: "",
          registrationNumber: "",
          specializations: [],
          availability: {
            monday: { available: false },
            tuesday: { available: false },
            wednesday: { available: false },
            thursday: { available: false },
            friday: { available: false },
            saturday: { available: false },
            sunday: { available: false },
          },
          consultationFee: 0,
          emergencyFee: 0,
          languages: [],
          about: "",
          education: [],
          certifications: [],
          awards: [],
          photo: "",
          verified: false,
          active: false,
        })) as DentistRegistration[];

        setData(allDentistRegistrations);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch dentist registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchDentistRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dentist Registration Management</h1>
          <Link href="/admin-dashboard/dentist-registration/dentist-registration-form">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Dentist Registration
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading dentist registrations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dentist Registration Management</h1>
        <Link href="/admin-dashboard/dentist-registration/dentist-registration-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Dentist Registration
          </Button>
        </Link>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dentist Registration Management</h1>
        <Link href="/admin-dashboard/dentist-registration/dentist-registration-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Dentist Registration
          </Button>
        </Link>
      </div>
      <DentistRegistrationTable data={data} />
    </div>
  );
}