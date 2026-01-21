"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ExamCard from "@/components/ExamCard";
import { Spinner } from "@/components/ui/spinner";
import { Exam } from "@/types/types";

const InternationalExamPreparation = () => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            International Exam Preparation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive preparation for dental licensing exams worldwide
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner className="h-8 w-8" />
            <span className="ml-2 text-gray-600">
              Loading exam preparation programs...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">
              Failed to load exam preparation programs: {error}
            </p>
            <Button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetch("/api/exams")
                  .then((response) => {
                    if (!response.ok) throw new Error("Failed to fetch exams");
                    return response.json();
                  })
                  .then((data) => setExams(data))
                  .catch((err) =>
                    setError(
                      err instanceof Error ? err.message : "An error occurred",
                    ),
                  )
                  .finally(() => setLoading(false));
              }}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {exams.slice(0, 7).map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ExamCard exam={exam} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/exam-prep">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              View All Exam Prep Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InternationalExamPreparation;
