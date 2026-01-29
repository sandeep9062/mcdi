"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Star,
  BookOpen,
  Clock,
  CheckCircle,
  ShoppingCart,
  Filter,
  Calendar,
  Target,
  Users // Added for enrollment visibility
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TestSeries } from "@/types/types";
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

// Extended interface to handle potential enrollment data from API
interface TestSeriesWithEnrollment extends TestSeries {
  enrolledCount?: number;
}

export default function TestSeriesPage() {
  const [testSeries, setTestSeries] = useState<TestSeriesWithEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [weeklyFrequency, setWeeklyFrequency] = useState("all");
  const [dailyGoal, setDailyGoal] = useState("all");
  const [studyDays, setStudyDays] = useState("all");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const response = await fetch("/api/testSeries");
        if (!response.ok) throw new Error("Failed to fetch test series");
        const data = await response.json();
        setTestSeries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchTestSeries();
  }, []);

  const filteredTestSeries = useMemo(() => {
    return testSeries.filter((ts) => {
      const matchesSearch =
        ts.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ts.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || ts.category === selectedCategory;

      const matchesWeekly = 
        weeklyFrequency === "all" || ts.shortDescription.includes(`${weeklyFrequency} test`);

      const matchesDaily = 
        dailyGoal === "all" || ts.questionsCount >= parseInt(dailyGoal);

      return matchesSearch && matchesCategory && matchesWeekly && matchesDaily;
    });
  }, [searchQuery, selectedCategory, weeklyFrequency, dailyGoal, testSeries]);

  const handleAddToCart = (series: TestSeries) => {
    const cartItem = {
      ...series,
      mode: "Online" as const,
      whatYouLearn: series.whatIncluded,
      faculty: {
        name: "Expert Faculty",
        title: "Specialist Team",
        image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
        bio: "Expert dental professional team",
      },
    };
    addToCart(cartItem as any);
    toast.success(`${series.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Enroll in Test Series</h1>
            <p className="text-lg text-teal-50 mb-8">
              Join thousands of students practicing for success.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by series name or exam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-white text-gray-900 border-none shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center gap-2 font-bold text-gray-900 mb-6 border-b pb-4">
                  <Filter className="h-5 w-5 text-teal-600" />
                  Filter Options
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Program Category</label>
                  <div className="space-y-2">
                    {["all", "Clinical Dentistry", "Support Dentistry", "International Exam Prep"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat 
                          ? "bg-teal-50 text-(--color-1) font-bold" 
                          : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {cat === "all" ? "All Programs" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weekly Frequency */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Tests Weekly</label>
                  <Select onValueChange={setWeeklyFrequency} defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any frequency</SelectItem>
                      <SelectItem value="1">1 Test per week</SelectItem>
                      <SelectItem value="2">2 Tests per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Daily Questions */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Daily Question Goal</label>
                  <Select onValueChange={setDailyGoal} defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Target Qs/day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any target</SelectItem>
                      <SelectItem value="50">50+ Questions</SelectItem>
                      <SelectItem value="100">100+ Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Test Days */}
                <div className="mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Study Days Per Week</label>
                  <Select onValueChange={setStudyDays} defaultValue="all">
                    <SelectTrigger className="w-full">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Flexible Schedule</SelectItem>
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <SelectItem key={day} value={day.toString()}>{day} {day === 1 ? 'Day' : 'Days'} / Week</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* Test Series List */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center py-20"><Spinner /></div>
              ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">{error}</div>
              ) : filteredTestSeries.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredTestSeries.map((series, index) => (
                    <motion.div
                      key={series.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="relative h-44">
                        <Image src={series.thumbnails?.[0] || ""} alt={series.title} fill className="object-cover" />
                        <Badge className="absolute top-4 right-4 bg-(--color-1) border-none">{series.examType}</Badge>
                        
                        {/* ENROLLMENT OVERLAY BADGE */}
                        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                          {series.enrolledCount?.toLocaleString() || "1,250+"} Students Enrolled
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                           <Users className="h-4 w-4 text-(--color-1)" />
                           <span className="text-xs font-bold text-(--color-1) uppercase tracking-tighter">Popular Choice</span>
                        </div>
                        
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{series.title}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{series.shortDescription}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                          <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                            <Target className="h-4 w-4 text-(--color-1)" />
                            <span>{series.questionsCount} Qs</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                            <Clock className="h-4 w-4 text-(--color-1)" />
                            <span>{series.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900">{series.rating}</span>
                          </div>
                        </div>

                        {/* Accordion for Samples */}
                        <Accordion type="single" collapsible className="mb-6">
                          <AccordionItem value="samples" className="border-none">
                            <AccordionTrigger className="bg-gray-50 hover:no-underline rounded-xl px-4 py-2 text-sm text-(--color-1)">
                              Preview Sample Questions
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                              {series.sampleQuestions.map((q, idx) => (
                                <div key={idx} className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                                  <p className="font-semibold text-gray-900 mb-3">{q.question}</p>
                                  <div className="grid grid-cols-1 gap-2">
                                    {q.options.map((opt, oIdx) => (
                                      <div key={oIdx} className={`text-xs p-2 rounded border ${oIdx === q.correctAnswer ? 'bg-green-100 border-green-200 text-green-800' : 'bg-white border-gray-200 text-gray-600'}`}>
                                        {opt} {oIdx === q.correctAnswer && "✓"}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        {/* Price and Cart Action */}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-black text-gray-900">₹{series.price.toLocaleString()}</span>
                            {series.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">₹{series.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <Button 
                            onClick={() => handleAddToCart(series)} 
                            className="bg-(--color-1) hover:bg-(--color-2) rounded-xl px-6"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No matching results</h3>
                  <p className="text-gray-500">Try changing your filters or searching for something else.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}