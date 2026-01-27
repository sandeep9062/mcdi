"use client";


import React, { useState, useMemo, useEffect } from "react";
// All icons used in your JSX must be listed here
import { 
  Search, 
  PlayCircle, 
  LayoutDashboard, 
  Trophy, 
  BookOpen, 
  Clock 
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import Image from "next/image";

// Ensure this path is correct and the interface is exported in that file
import { Course } from "@/types/types"; 

// Extended Course type for Student Dashboard
interface StudentCourse extends Course {
  progress: number;
  lastAccessed: string;
  status: "In Progress" | "Completed" | "Not Started";
}

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await fetch("/api/student/my-courses");
        if (!response.ok) throw new Error("Failed to load your courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortBy === "recent") return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
      if (sortBy === "progress-high") return b.progress - a.progress;
      if (sortBy === "progress-low") return a.progress - b.progress;
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

    return filtered;
  }, [courses, searchQuery, selectedStatus, sortBy]);

  const stats = useMemo(() => {
    return {
      total: courses.length,
      completed: courses.filter(c => c.status === "Completed").length,
      inProgress: courses.filter(c => c.status === "In Progress").length,
      avgProgress: Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / (courses.length || 1))
    };
  }, [courses]);

  if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-teal-600" />
                My Learning Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">Track your progress and continue your dental education.</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" asChild>
                    <Link href="/courses">Browse More Courses</Link>
                </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard icon={<BookOpen className="text-blue-600" />} label="Total" value={stats.total} />
            <StatCard icon={<PlayCircle className="text-orange-600" />} label="In Progress" value={stats.inProgress} />
            <StatCard icon={<Trophy className="text-yellow-600" />} label="Completed" value={stats.completed} />
            <StatCard icon={<Clock className="text-teal-600" />} label="Avg. Progress" value={`${stats.avgProgress}%`} />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search my courses..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Accessed</SelectItem>
                  <SelectItem value="progress-high">Highest Progress</SelectItem>
                  <SelectItem value="progress-low">Lowest Progress</SelectItem>
                  <SelectItem value="alphabetical">A - Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20"><Spinner /></div>
          ) : filteredAndSortedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAndSortedCourses.map((course) => (
                <StudentCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <EmptyState onClear={() => setSearchQuery("")} />
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <div>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StudentCourseCard({ course }: { course: StudentCourse }) {
  return (
    <motion.div 
      layout
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex h-full">
        <div className="relative w-32 md:w-48 h-auto shrink-0">
          <Image 
            src={course.thumbnail || "/course-placeholder.jpg"} 
            alt={course.title} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-start mb-1">
              {/* FIXED: Changed variant="success" to a custom class logic */}
              <Badge 
                variant={course.status === "Completed" ? "default" : "secondary"} 
                className={`text-[10px] uppercase ${
                  course.status === "Completed" ? "bg-green-600 hover:bg-green-700" : ""
                }`}
              >
                {course.status}
              </Badge>
              <span className="text-[10px] text-gray-400">Last: {new Date(course.lastAccessed).toLocaleDateString()}</span>
            </div>
            <h3 className="font-bold text-gray-900 line-clamp-1">{course.title}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.shortDescription}</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">{course.progress}% Complete</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
            <Button 
              className="w-full mt-4 h-9 text-xs" 
              variant={course.status === "Completed" ? "outline" : "default"}
              asChild
            >
              <Link href={`/courses/${course.id}`}>
                {course.status === "Completed" ? "Review Course" : "Continue Learning"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
      <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900">No courses match your search</h3>
      <Button variant="link" onClick={onClear}>Clear all filters</Button>
    </div>
  );
}