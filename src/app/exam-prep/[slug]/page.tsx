"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  BookOpen,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { Exam } from "@/types/types";

export default function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = use(params);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`/api/exams?slug=${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Exam not found");
          } else {
            throw new Error("Failed to fetch exam");
          }
          return;
        }
        const data = await response.json();
        setExam(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="h-8 w-8 mb-4" />
          <p className="text-gray-600">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Exam not found"}
          </h1>
          <Link href="/exam-prep">
            <Button>Browse All Exams</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4 text-teal-100">
                <Link href="/exam-prep" className="hover:underline">
                  Exam Prep
                </Link>
                <span>/</span>
                <span>{exam.name}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {exam.name}
              </h1>
              <p className="text-xl text-teal-50 mb-2">{exam.fullName}</p>
              <Badge className="bg-white text-(--color-3) text-base px-4 py-1">
                {exam.country}
              </Badge>
              <p className="text-lg text-teal-50 mt-6 leading-relaxed">
                {exam.shortDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Exam
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {exam.fullDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Who Is This For?
                  </h2>
                  <div className="space-y-3">
                    {exam.whoIsThisFor.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-(--color-1) flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exam.whatIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-(--color-1) flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Study Plan
                  </h2>
                  <div className="space-y-6">
                    {exam.studyPlan.map((phase, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-(--color-1) pl-6"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-5 w-5 text-(--color-1)" />
                          <h3 className="font-semibold text-lg text-gray-900">
                            {phase.phase}
                          </h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <ul className="space-y-2 mt-3">
                          {phase.focus.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <span className="text-(--color-1) mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Student Success Stories
                  </h2>
                  <div className="space-y-6">
                    {exam.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-teal-100 pl-6 py-2"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {review.name}
                          </h4>
                          <div className="flex">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 sticky top-20"
                >
                  <div className="aspect-video bg-gray-200 rounded-lg mb-6 overflow-hidden">
                    <Image
                      src={exam.thumbnails?.[0] || '/placeholder-image.jpg'}
                      alt={exam.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Ready to Start Your Preparation?
                  </h3>

                  <p className="text-gray-700 mb-6">
                    Contact us to learn more about our {exam.name} preparation
                    program and get started on your journey to success.
                  </p>

                  <div className="space-y-3">
                    <Link href="/courses">
                      <Button
                        size="lg"
                        className="w-full text-(--color-1) hover:bg-(--color-2)"
                      >
                        Explore Related Courses
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="w-full">
                        Contact Us
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Quick Contact
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        Phone:{" "}
                        <a
                          href="tel:+917889093147"
                          className="text-teal-600 hover:underline"
                        >
                          +91-7889093147
                        </a>
                      </p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:masterclinicaldentistry@gmail.com"
                          className="text-teal-600 hover:underline break-all"
                        >
                          masterclinicaldentistry@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
