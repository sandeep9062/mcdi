"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  GraduationCap, 
  BarChart3, 
  Calendar, 
  Clock, 
  Award, 
  ArrowUpRight,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { Exam } from "@/types/types"; 

// Extended Exam type - Added 'title' and 'id' explicitly to satisfy the compiler
interface StudentExam extends Exam {
  id: string;
  title: string; 
  enrolledDate: string;
  nextMockTest: string;
  overallScore: number;
  completedMocks: number;
  totalMocks: number;
  status: "active" | "completed" | "expired";
}

export default function StudentExamsDashboard() {
  const [exams, setExams] = useState<StudentExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyExams = async () => {
      try {
        const response = await fetch("/api/student/my-exams");
        if (!response.ok) throw new Error("Could not fetch your exam prep data");
        const data = await response.json();
        setExams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMyExams();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>
  );

  if (error) return (
    <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg m-4 border border-red-100">
      <p>Error: {error}</p>
      <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-12">
      <div className="bg-white border-b border-gray-200 pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">Exam Prep Hub</h1>
              <p className="text-gray-500">Track your mock tests and licensing exam readiness.</p>
            </div>
            
            <div className="flex gap-4 mb-1">
              <div className="px-4 py-2 bg-teal-50 rounded-lg border border-teal-100 text-center">
                <p className="text-xs text-teal-600 font-bold uppercase tracking-wider">Avg. Score</p>
                <p className="text-xl font-black text-teal-800">78%</p>
              </div>
              <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 text-center">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Tests Done</p>
                <p className="text-xl font-black text-blue-800">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <Tabs defaultValue="active" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="active">Active Preps</TabsTrigger>
              <TabsTrigger value="completed">Passed/Completed</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" asChild>
              <Link href="/exams">Purchase New Prep Module</Link>
            </Button>
          </div>

          <TabsContent value="active" className="mt-0">
            {exams.filter(e => e.status === "active").length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {exams.filter(e => e.status === "active").map((exam) => (
                  <ActiveExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <NoExamsState />
            )}
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.filter(e => e.status === "completed").map((exam) => (
                <CompletedExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ActiveExamCard({ exam }: { exam: StudentExam }) {
  const completionPercentage = exam.totalMocks > 0 
    ? Math.round((exam.completedMocks / exam.totalMocks) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
              <GraduationCap size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
              <p className="text-sm text-gray-500 italic">Enrolled on {new Date(exam.enrolledDate).toLocaleDateString()}</p>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none px-3 py-1">
            Exam Prep Mode
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <ScoreWidget label="Mock Score" value={`${exam.overallScore}%`} icon={<BarChart3 size={14}/>} />
          <ScoreWidget label="Completion" value={`${exam.completedMocks}/${exam.totalMocks}`} icon={<FileText size={14}/>} />
          <ScoreWidget label="Success Prob." value="High" icon={<Award size={14}/>} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Preparation Readiness</span>
            <span className="text-teal-600 font-bold">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-teal-600 hover:bg-teal-700" asChild>
             <Link href={`/dashboard/exams/${exam.id}/mock`}>Take Mock Test</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
             <Link href={`/dashboard/exams/${exam.id}/materials`}>Study Material</Link>
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1"><Clock size={12} /> Next Mock: {exam.nextMockTest}</span>
        <Link href={`/dashboard/exams/${exam.id}`} className="text-teal-600 font-bold flex items-center gap-1 hover:underline">
          Full Analytics <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

function CompletedExamCard({ exam }: { exam: StudentExam }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          <Award size={20} />
        </div>
        <h4 className="font-bold text-gray-900 truncate">{exam.title}</h4>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Final Score: <b className="text-gray-900">{exam.overallScore}%</b></span>
        <Badge variant="outline" className="text-teal-600 border-teal-200 bg-teal-50">Passed</Badge>
      </div>
    </div>
  );
}

function ScoreWidget({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg font-black text-gray-800">{value}</p>
    </div>
  );
}

function NoExamsState() {
  return (
    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-900">No Active Exam Modules</h3>
      <p className="text-gray-500 mb-6">Start your licensing journey by choosing an exam.</p>
      <Button asChild>
        <Link href="/exams">Browse Exams</Link>
      </Button>
    </div>
  );
}