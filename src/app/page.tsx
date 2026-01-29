"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Award,
  Globe,
  Stethoscope,
  HeartPulse,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import ExamCard from "@/components/ExamCard";
import ReviewCard from "@/components/ReviewCard";
import FAQAccordion from "@/components/FAQAccordion";
import LeadForm from "@/components/LeadForm";
import { courses } from "@/data/courses";
import { exams } from "@/data/exams";
import { reviews } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { categories } from "@/data/categories";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ExploreOurPrograms from "@/components/home/ExploreOurPrograms";
import InternationalExamPreparation from "@/components/home/InternationalExamPreparation";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhatOurStudentSays from "@/components/home/WhatOurStudentSays";
import WhyChooseMCDI from "@/components/home/WhyChooseMCDI";

import FAQ from "@/components/home/FAQ";
import RequestFreeDemo from "@/components/home/RequestFreeDemo";
import ReadyToTransform from "@/components/home/ReadyToTransform";
export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);
  const homeFaqs = faqs.slice(0, 5);

  const scrollToLeadForm = () => {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">
      <Hero />

      

      <ExploreOurPrograms />

      {/* <InternationalExamPreparation /> */}

      <FeaturedCourses />

      <WhatOurStudentSays />

      <FAQ />

      <RequestFreeDemo />

      <ReadyToTransform />
    </div>
  );
}
