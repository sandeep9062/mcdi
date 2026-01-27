import React from 'react';
import { motion } from "framer-motion";
import { 
  UserCheck, 
  Users, 
  GraduationCap, 
  Layout, 
  FileCheck, 
  Trophy, 
  BarChart, 
  LifeBuoy 
} from "lucide-react";

const WhyChooseExamPrep = () => {
  const features = [
    {
      title: "One-on-One Teaching Approach",
      description: "Personalized attention to help every student understand concepts clearly and confidently.",
      icon: UserCheck,
    },
    {
      title: "Individualized Mentoring & Guidance",
      description: "Each candidate receives tailored mentoring based on strengths, weaknesses, and exam goals.",
      icon: Users,
    },
    {
      title: "Highly Experienced Faculty Team",
      description: "Learn from 40+ years of combined teaching and clinical experience with 2+ dedicated faculty members.",
      icon: GraduationCap,
    },
    {
      title: "Structured Exam-Oriented Training",
      description: "Focused preparation aligned strictly with global and international exam patterns.",
      icon: Layout,
    },
    {
      title: "Regular Test Series & Mock Exams",
      description: "Real exam-like practice to improve accuracy, time management, and confidence.",
      icon: FileCheck,
    },
    {
      title: "High First-Attempt Success Rate",
      description: "Designed to help students pass the exam in one go with strong conceptual clarity.",
      icon: Trophy,
    },
    {
      title: "Result-Driven Teaching Methodology",
      description: "Proven methods that consistently improve performance and final results.",
      icon: BarChart,
    },
    {
      title: "Complete Exam Support",
      description: "From preparation to final exam readiness, we guide you at every step.",
      icon: LifeBuoy,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose Our Exam Preparation Programs?
            </h2>
            <div className="w-24 h-1 bg-(--color-1) mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group flex gap-5 bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-teal-100"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-(--color-3) text-(--color-1) flex items-center justify-center group-hover:bg-(--color-2) group-hover:text-white transition-colors duration-300">
                    <feature.icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseExamPrep;