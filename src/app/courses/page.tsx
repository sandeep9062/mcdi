"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/types";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

// Utility function to convert duration string to days
const getDurationInDays = (duration: string): number => {
  const match = duration.match(/(\d+)\s*(month|months)/i);
  if (match) {
    const months = parseInt(match[1]);
    return months * 30; // Approximate months to days
  }
  return 0;
};
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesMode =
        selectedMode === "all" ||
        course.mode === selectedMode ||
        course.mode === "Hybrid";
      const matchesDuration = (() => {
        if (selectedDuration === "all") return true;
        const durationDays = getDurationInDays(course.duration);
        switch (selectedDuration) {
          case "1-2-months":
            return durationDays >= 30 && durationDays <= 60;
          case "3-4-months":
            return durationDays >= 90 && durationDays <= 120;
          case "5-6-months":
            return durationDays >= 150 && durationDays <= 180;
          case "6-plus-months":
            return durationDays > 180;
          default:
            return true;
        }
      })();
      return matchesSearch && matchesCategory && matchesMode && matchesDuration;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case "newest":
          return b.id.localeCompare(a.id);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "duration-short":
          return getDurationInDays(a.duration) - getDurationInDays(b.duration);
        case "duration-long":
          return getDurationInDays(b.duration) - getDurationInDays(a.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, searchQuery, selectedCategory, selectedMode, selectedDuration, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dental Courses
            </h1>
            <p className="text-lg text-teal-50 mb-8">
              Browse our comprehensive collection of clinical dentistry courses
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search courses by title or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg text-black bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedMode("all");
                      setSelectedDuration("all");
                      setSearchQuery("");
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === "all"
                            ? "bg-teal-50 text-teal-700 font-medium"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.name
                              ? "bg-teal-50 text-teal-700 font-medium"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Mode
                    </label>
                    <div className="space-y-2">
                      {["all", "Online", "Offline", "Hybrid"].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setSelectedMode(mode)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedMode === mode
                              ? "bg-teal-50 text-teal-700 font-medium"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {mode === "all" ? "All Modes" : mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Durations" },
                        { value: "1-2-months", label: "1-2 Months" },
                        { value: "3-4-months", label: "3-4 Months" },
                        { value: "5-6-months", label: "5-6 Months" },
                        { value: "6-plus-months", label: "6+ Months" },
                      ].map((duration) => (
                        <button
                          key={duration.value}
                          onClick={() => setSelectedDuration(duration.value)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedDuration === duration.value
                              ? "bg-teal-50 text-teal-700 font-medium"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {duration.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Spinner className="h-8 w-8" />
                  <span className="ml-2 text-gray-600">Loading courses...</span>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="text-red-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Failed to load courses
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
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
                          setError(err instanceof Error ? err.message : "An error occurred");
                        } finally {
                          setLoading(false);
                        }
                      };
                      fetchCourses();
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">
                          {filteredAndSortedCourses.length}
                        </span>{" "}
                        courses found
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-600">Sort by:</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="duration-short">
                            Duration: Short to Long
                          </SelectItem>
                          <SelectItem value="duration-long">
                            Duration: Long to Short
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {filteredAndSortedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredAndSortedCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <CourseCard course={course} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="text-gray-400 mb-4">
                        <Search className="h-16 w-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No courses found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your filters or search query
                      </p>
                      <Button
                        onClick={() => {
                          setSelectedCategory("all");
                          setSelectedMode("all");
                          setSelectedDuration("all");
                          setSearchQuery("");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
