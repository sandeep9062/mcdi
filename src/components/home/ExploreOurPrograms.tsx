import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, GraduationCap, HeartPulse, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import Link from "next/link";

const ExploreOurPrograms = () => {
  const getLink = (slug: string) => {
    if (slug === "clinical-dentistry") {
      return "/courses";
    } else if (slug === "exam-prep") {
      return "/exam-prep";
    } else if (slug === "support-dentistry") {
      return "/qa";
    }
    return "/"; // Default fallback
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Dental Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive training across multiple specialties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center"
            >
              <div className="h-20 w-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-(--color-2) transition-colors duration-300">
                {category.icon === "Stethoscope" && (
                  <Stethoscope className="h-10 w-10 text-(--color-1) group-hover:text-white transition-colors" />
                )}
                {category.icon === "GraduationCap" && (
                  <GraduationCap className="h-10 w-10 text-(--color-1) group-hover:text-white transition-colors" />
                )}
                {category.icon === "HeartPulse" && (
                  <HeartPulse className="h-10 w-10 text-(--color-1) group-hover:text-white transition-colors" />
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {category.name}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                {category.description}
              </p>

              <Link 
                href={getLink(category.slug)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-(--color-1) text-(--color-1) font-bold rounded-xl hover:bg-(--color-2) hover:text-white transition-all duration-300 group/btn"
              >
                Know More
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOurPrograms;