import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, GraduationCap, HeartPulse } from "lucide-react";
import { categories } from "@/data/categories";
import Link from "next/link";
const ExploreOurPrograms = () => {


  const link = (slug: string) => {
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive training across multiple specialties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-200"
            >
              <Link href={`${link(category.slug)}`}>
                <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {category.icon === "Stethoscope" && (
                    <Stethoscope className="h-8 w-8 text-teal-600" />
                  )}
                  {category.icon === "GraduationCap" && (
                    <GraduationCap className="h-8 w-8 text-teal-600" />
                  )}
                  {category.icon === "HeartPulse" && (
                    <HeartPulse className="h-8 w-8 text-teal-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOurPrograms;
