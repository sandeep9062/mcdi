"use client";

import { motion } from "framer-motion";
import ExamCard from "@/components/ExamCard";
import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Exam } from "@/types/types";
import WhyChooseExamPrep from "@/components/WhyChooseExamPrep";
import Image from "next/image";
export default function ExamPrepHubPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/api/exams");
        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }
        const data = await response.json();
        setExams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              International Dental Licensing Exam Preparation
            </h1>
            <p className="text-lg md:text-xl text-teal-50 leading-relaxed max-w-3xl mx-auto">
              Comprehensive preparation programs for dental licensing
              examinations worldwide. Expert guidance, practice materials, and
              proven success strategies.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Exam
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the licensing examination you're preparing for
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner className="h-8 w-8" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {exams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ExamCard exam={exam} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <WhyChooseExamPrep />
    </div>
  );
}
