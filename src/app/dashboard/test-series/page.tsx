"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  FileText, 
  BarChart2, 
  Zap, 
  History, 
  ChevronRight, 
  Clock,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Link from "next/link";

/** * FIX 1: Import the base TestSeries interface. 
 * Adjust this path to match your project structure.
 */
import { TestSeries } from "@/types/types"; 

// Type definition for Student Test Series
// FIX 2: Added missing properties used in JSX to the interface
interface MyTestSeries extends TestSeries {
  id: string;
  title: string;
  examType: string;
  questionsCount: number;
  totalTests: number;
  completedTests: number;
  averagePercentile: number;
  lastAttemptScore: number;
  expiryDate: string;
}

export default function StudentTestSeriesDashboard() {
  const [mySeries, setMySeries] = useState<MyTestSeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySeries = async () => {
      try {
        const response = await fetch("/api/student/my-test-series");
        if (!response.ok) throw new Error("Failed to load");
        const data = await response.json();
        setMySeries(data);
      } catch (err) {
        console.error("Failed to load your test series");
      } finally {
        setLoading(false);
      }
    };
    fetchMySeries();
  }, []);

  const summary = useMemo(() => {
    return {
      activeSeries: mySeries.length,
      totalQuestionsSolved: mySeries.reduce((acc, curr) => acc + (curr.completedTests * 100), 0),
      overallAccuracy: 74, 
    };
  }, [mySeries]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Practice Hub</h1>
              <p className="text-gray-500 mt-1">Master your dental exams through targeted question banks.</p>
            </div>
            
            <div className="flex gap-4">
              <SummaryMetric icon={<Target className="text-teal-600" />} label="Accuracy" value={`${summary.overallAccuracy}%`} />
              <SummaryMetric icon={<Zap className="text-orange-600" />} label="Solved" value={summary.totalQuestionsSolved} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Enrolled Series
            </h2>
            
            {mySeries.length > 0 ? (
              mySeries.map((series) => (
                <SeriesActionCard key={series.id} series={series} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>

          <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <History className="h-5 w-5 text-teal-600" />
                        Recent Attempts
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RecentActivityItem title="Endodontics Mock 1" score="82%" date="2 hours ago" />
                    <RecentActivityItem title="Oral Surgery Quiz" score="65%" date="Yesterday" />
                    <RecentActivityItem title="Periodontics Part A" score="91%" date="3 days ago" />
                    <Button variant="ghost" className="w-full text-teal-600 text-sm">View Full History</Button>
                </CardContent>
             </Card>

             <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">Need more practice?</h3>
                <p className="text-teal-100 text-sm mb-4">Explore our new AI-driven question banks for INBDE 2026.</p>
                <Button className="w-full bg-white text-teal-900 hover:bg-teal-50" asChild>
                    <Link href="/test-series">Explore More</Link>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeriesActionCard({ series }: { series: MyTestSeries }) {
  const progressPercent = series.totalTests > 0 
    ? Math.round((series.completedTests / series.totalTests) * 100) 
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden border-l-4 border-l-teal-600">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge variant="outline" className="text-teal-600 border-teal-200 mb-2">
                  {series.examType}
                </Badge>
                <h3 className="text-xl font-bold text-gray-900">{series.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Last Score</p>
                <p className="text-xl font-black text-teal-600">{series.lastAttemptScore}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
               <div className="text-sm">
                  <span className="text-gray-500 block">Tests</span>
                  <span className="font-bold">{series.completedTests}/{series.totalTests}</span>
               </div>
               <div className="text-sm">
                  <span className="text-gray-500 block">Questions</span>
                  <span className="font-bold">{series.questionsCount}</span>
               </div>
               <div className="text-sm">
                  <span className="text-gray-500 block">Percentile</span>
                  <span className="font-bold text-orange-600">{series.averagePercentile}th</span>
               </div>
               <div className="text-sm">
                  <span className="text-gray-500 block">Valid Till</span>
                  <span className="font-bold">{new Date(series.expiryDate).toLocaleDateString()}</span>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600">Overall Progress</span>
                  <span>{progressPercent}%</span>
               </div>
               <Progress value={progressPercent} className="h-2 bg-teal-50" />
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 w-full md:w-56">
             <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                <Link href={`/dashboard/test-series/${series.id}`}>
                  Continue Test
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
             </Button>
             <Button variant="outline" className="w-full text-gray-600" asChild>
                <Link href={`/dashboard/test-series/${series.id}/performance`}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Performance
                </Link>
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 min-w-[120px]">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</p>
        <p className="text-lg font-bold text-gray-900 leading-none mt-1">{value}</p>
      </div>
    </div>
  );
}

function RecentActivityItem({ title, score, date }: { title: string, score: string, date: string }) {
    return (
        <div className="flex justify-between items-center group cursor-pointer">
            <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">{title}</p>
                <p className="text-xs text-gray-400">{date}</p>
            </div>
            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">{score}</Badge>
        </div>
    )
}

function EmptyState() {
    return (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-900">No active test series</h3>
            <p className="text-gray-500 mb-6 max-w-xs mx-auto text-sm">You haven't enrolled in any question banks yet. Start your practice now.</p>
            <Button asChild>
                <Link href="/test-series">Browse Test Series</Link>
            </Button>
        </div>
    )
}