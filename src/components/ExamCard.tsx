'use client';

import React from 'react';
import Link from 'next/link';
import { Exam } from '@/types/types';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow p-6 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{exam.countryFlag}</span>
            <h3 className="font-bold text-2xl text-gray-900 line-clamp-1">{exam.name}</h3>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{exam.fullName}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs">{exam.countryFlag}</span>
            <p className="text-xs text-teal-600 font-medium line-clamp-1">{exam.country}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 flex-1">{exam.shortDescription}</p>

      <div className="mt-auto">
        <Link href={`/exam-prep/${exam.slug}`}>
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
