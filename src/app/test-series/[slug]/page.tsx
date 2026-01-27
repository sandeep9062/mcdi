"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import {
  Star,
  BookOpen,
  Clock,
  CheckCircle,
  ShoppingCart,
  ArrowLeft,
  Download,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { TestSeries } from "@/types/types";

export default function TestSeriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [testSeries, setTestSeries] = useState<TestSeries | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  // Access slug from params (Next.js 15 params is a Promise that needs to be unwrapped)
  const { slug } = use(params);

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/testSeries?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch test series");
        }
        const data = await response.json();
        setTestSeries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeries();
  }, [slug]);

  const handleAddToCart = () => {
    if (!testSeries) return;

    const courseFormat = {
      id: testSeries.id,
      slug: testSeries.slug,
      title: testSeries.title,
      shortDescription: testSeries.shortDescription,
      fullDescription: testSeries.fullDescription,
      price: testSeries.price,
      originalPrice: testSeries.originalPrice,
      thumbnail: testSeries.thumbnail,
      category: testSeries.category,
      mode: "Online" as const,
      duration: testSeries.duration,
      rating: testSeries.rating,
      reviewCount: testSeries.reviewCount,
      featured: testSeries.featured,
      popular: false,
      whatYouLearn: testSeries.whatIncluded,
      curriculum: [],
      whoIsThisFor: [],
      faculty: {
        name: "Expert Faculty",
        title: "Specialist Team",
        image:
          "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
        bio: "Our expert team of dental professionals",
      },
      faqs: [],
    };
    addToCart(courseFormat);
    toast.success(`${testSeries.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !testSeries) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Test Series Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            {error || "The test series you're looking for doesn't exist."}
          </p>
          <Button onClick={() => router.push('/test-series')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Test Series
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <Button
              onClick={() => router.push('/test-series')}
              variant="ghost"
              className="mb-6 text-white hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Test Series
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {testSeries.title}
                </h1>
                <p className="text-lg text-white mb-6">
                  {testSeries.shortDescription}
                </p>

                <div className="flex items-center gap-4 text-sm text-white mb-6">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {testSeries.examType}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {testSeries.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {testSeries.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{testSeries.questionsCount} Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{testSeries.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{testSeries.rating}</span>
                    <span>({testSeries.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="relative h-48 bg-gray-200 rounded-lg mb-4">
                    <Image
                      src={testSeries.thumbnail}
                      alt={testSeries.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {testSeries.featured && (
                      <Badge className="absolute top-3 left-3 bg-(--color-1)">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl mb-2">
                        Price
                      </h3>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{testSeries.price.toLocaleString()}
                      </div>
                      {testSeries.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{testSeries.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-(--color-1) hover:bg-(--color-1)"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>

                    <div className="text-xs text-gray-600 text-center">
                      Instant access after purchase
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Test Series
                  </h2>
                  <div className="prose prose-lg text-gray-700">
                    <p>{testSeries.fullDescription}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    What's Included:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testSeries.whatIncluded.map((item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-(--color-1) flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Sample Questions
                  </h3>
                  <Accordion type="single" collapsible className="space-y-4">
                    {testSeries.sampleQuestions.map((q: { question: string; options: string[]; correctAnswer: number; explanation: string; }, qIdx: number) => (
                      <AccordionItem key={qIdx} value={`question-${qIdx}`}>
                        <AccordionTrigger className="text-left">
                          <span className="font-medium">Question {qIdx + 1}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="font-medium text-gray-900">
                              {q.question}
                            </p>
                            <div className="space-y-2">
                              {q.options.map((option: string, oIdx: number) => (
                                <div
                                  key={oIdx}
                                  className={`p-3 rounded-lg text-sm ${
                                    oIdx === q.correctAnswer
                                      ? "bg-green-100 text-green-900 border border-green-200"
                                      : "bg-gray-50 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                  <span className="font-semibold">
                                    {String.fromCharCode(65 + oIdx)}.
                                  </span>{" "}
                                  {option}
                                  {oIdx === q.correctAnswer && (
                                    <span className="ml-2 text-green-700 font-bold">
                                      ✓ Correct Answer
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">
                                Explanation:
                              </h4>
                              <p className="text-blue-800 text-sm">
                                {q.explanation}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    Test Series Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Exam Type:</span>
                      <span className="font-medium">{testSeries.examType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{testSeries.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium">{testSeries.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{testSeries.questionsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{testSeries.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{testSeries.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    Study Resources
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Syllabus
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Previous Papers
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Material
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    Support
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      Need help with this test series? Our expert team is here
                      to assist you.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="text-gray-900">support@mcdi.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="text-gray-900">+91 98765 43210</span>
                      </div>
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
