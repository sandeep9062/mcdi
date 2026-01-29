"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Star,
  Clock,
  Users,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  BookOpen,
  Search,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import FAQAccordion from "@/components/FAQAccordion";
import { SocialProofStrip } from "@/components/SocialProofStrip";
import { motion } from "framer-motion";
import { Course } from "@/types/types";
export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/dentist-registration");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const router = useRouter();
  const { addToCart } = useCart();

  const { slug } = use(params);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="h-8 w-8 mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to load dentist registration
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <Button
              onClick={() => {
                setLoading(true);
                setError(null);
                const fetchCourses = async () => {
                  try {
                    const response = await fetch("/api/courses");
                    if (!response.ok) {
                      throw new Error("Failed to fetch courses");
                    }
                    const data = await response.json();
                    setCourses(data);
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : "An error occurred",
                    );
                  } finally {
                    setLoading(false);
                  }
                };
                fetchCourses();
              }}
            >
              Try Again
            </Button>
            <Link href="/courses">
              <Button variant="outline">Browse All Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Course not found
          </h1>
          <Link href="/courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(course);
    toast.success(`${course.title} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(course);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Link href="/courses" className="hover:underline">
                  Courses
                </Link>
                <span>/</span>
                <span>{course.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-teal-50 mb-6">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-teal-100">
                    ({course.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <Badge className="bg-white text-teal-700">{course.mode}</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SocialProofStrip />

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
                    Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {course.fullDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    What You Will Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
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
                    Curriculum
                  </h2>
                  <div className="space-y-4">
                    {course.curriculum.map((module, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg"
                      >
                        <div className="bg-gray-50 px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-teal-600" />
                          {module.module}
                        </div>
                        <div className="px-6 py-4">
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className="flex items-start gap-2 text-gray-700"
                              >
                                <span className="text-teal-600 mt-1">•</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Who This Course Is For
                  </h2>
                  <ul className="space-y-3">
                    {course.whoIsThisFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Meet Your Instructor
                  </h2>
                  <div className="flex items-start gap-6">
                    <Image
                      src={course.faculty.image}
                      alt={course.faculty.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {course.faculty.name}
                      </h3>
                      <p className="text-teal-600 font-medium mb-3">
                        {course.faculty.title}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {course.faculty.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <FAQAccordion
                    faqs={course.faqs.map((faq, idx) => ({
                      id: `faq-${idx}`,
                      question: faq.question,
                      answer: faq.answer,
                      category: "Course",
                    }))}
                  />
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
                      src={course.thumbnail}
                      alt={course.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{course.price.toLocaleString()}
                      </span>
                      {course.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ₹
                        {(course.originalPrice - course.price).toLocaleString()}{" "}
                        (
                        {Math.round(
                          ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100,
                        )}
                        % off)
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button
                      size="lg"
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={handleBuyNow}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Buy Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      This course includes:
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>{course.duration} of content</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>One-on-one mentoring sessions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>Lifetime access to course materials</span>
                      </li>
                      {course.mode === "Hybrid" && (
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-teal-600" />
                          <span>Hands-on clinical training</span>
                        </li>
                      )}
                    </ul>
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
