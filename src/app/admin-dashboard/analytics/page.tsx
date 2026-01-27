"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar,
  Layers
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    // Simulate fetching complex analytics data
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [timeRange]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Spinner /></div>;

  return (
    <div className="p-6 space-y-8 bg-[#FBFBFE] min-h-screen">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Business Analytics</h1>
          <p className="text-gray-500">Real-time insight into MCDI's growth and student engagement.</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] bg-white">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Download className="mr-2 h-4 w-4" /> Reports
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Revenue" 
          value="₹8,42,500" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<IndianRupee className="text-teal-600" />} 
        />
        <KPICard 
          title="New Students" 
          value="1,248" 
          trend="+18.2%" 
          isPositive={true} 
          icon={<Users className="text-blue-600" />} 
        />
        <KPICard 
          title="Course Sales" 
          value="452" 
          trend="-2.4%" 
          isPositive={false} 
          icon={<BookOpen className="text-purple-600" />} 
        />
        <KPICard 
          title="Active Sessions" 
          value="84" 
          trend="+5.1%" 
          isPositive={true} 
          icon={<TrendingUp className="text-orange-600" />} 
        />
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Chart Placeholder */}
        <Card className="lg:col-span-2 shadow-sm border-gray-100">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Daily earnings from courses and exam prep.</CardDescription>
              </div>
              <Layers className="text-gray-300 h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center bg-gray-50/50 rounded-b-xl border-t border-gray-50">
             {/* Integration Point: Insert <ResponsiveContainer> and <AreaChart> from Recharts here */}
             <div className="text-center text-gray-400">
                
                <p className="text-sm mt-4 italic text-gray-400 font-medium">Interactive Revenue Chart (Recharts Integration Area)</p>
             </div>
          </CardContent>
        </Card>

        {/* Content Performance Ranking */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>By enrollment volume this period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <TopContentItem title="MDS Mastery Course" sales={124} amount="₹1,24,000" />
            <TopContentItem title="Endodontics Mock Series" sales={98} amount="₹49,000" />
            <TopContentItem title="DCI Exam Test Bank" sales={86} amount="₹68,800" />
            <TopContentItem title="Clinical Radiography" sales={54} amount="₹27,000" />
            <Separator />
            <Button variant="ghost" className="w-full text-teal-600 hover:bg-teal-50">View Detailed Content Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Support Components
function KPICard({ title, value, trend, isPositive, icon }: any) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
            <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trend}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-black text-gray-900">{value}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TopContentItem({ title, sales, amount }: { title: string; sales: number; amount: string }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{title}</p>
        <p className="text-xs text-gray-400">{sales} Enrollments</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-black text-gray-900">{amount}</p>
      </div>
    </div>
  );
}

function Separator() {
    return <div className="h-[1px] w-full bg-gray-100" />;
}