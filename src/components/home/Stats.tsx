"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Award, Users, Globe, 
  BookOpen, Stethoscope, Briefcase, 
  ShieldCheck, Zap 
} from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const highlights = [
  { title: "25+ Career-Focused Dental Programs", desc: "Comprehensive training covering clinical dentistry and industry-ready skills.", icon: GraduationCap },
  { title: "12+ Years of Teaching Excellence", desc: "Trusted dental education provider with a proven clinical training track record.", icon: Award },
  { title: "Global Dental Exam Prep", desc: "Structured coaching for international dental licensing and qualifying exams.", icon: Globe },
  { title: "Overseas License Preparation", desc: "Dedicated programs for dentists preparing for overseas practice.", icon: ShieldCheck },
  { title: "Clinical Industry-Oriented", desc: "Hands-on, practical training aligned with real-world clinic workflows.", icon: Stethoscope },
  { title: "Support Dentistry Courses", desc: "Skill-enhancement programs designed for fresh graduates.", icon: BookOpen },
  { title: "Expert Clinical Mentors", desc: "Training led by expert clinicians with extensive clinical exposure.", icon: Users },
  { title: "Hands-On Clinical Exposure", desc: "Case-based learning with live demonstrations and practical sessions.", icon: Zap },
  { title: "Career & Practice Support", desc: "Guidance for career planning and international pathways.", icon: Briefcase }
];

const Stats = () => {
  return (
    <div className="bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          
          <div className="max-w-4xl mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-(--color-1) font-bold uppercase tracking-widest text-sm"
            >
              Why MCDI?
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-6"
            >
              Empowering Dentists with <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-1) to-(--color-1)">Practical Excellence</span>
            </motion.h2>
            <div className="h-1.5 w-20 bg-(--color-1) rounded-full" />
          </div>
          
          {/* Swiper Container */}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }, // Shows 4 cards in a row on large screens
            }}
            className="pb-16 !px-2" // Space for pagination dots
          >
            {highlights.map((item, idx) => (
              <SwiperSlide key={idx}>
                <HighlightCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Custom Styles for Swiper Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #0d9488 !important; /* teal-600 */
        }
        .swiper-slide {
          height: auto; /* Ensures cards match height */
        }
      `}</style>
    </div>
  )
}

const HighlightCard = ({ item }: { item: any }) => {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col items-start h-full">
      <div className="mb-4 relative">
        <div className="absolute inset-0 bg-teal-200 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
        <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-300">
          <item.icon size={24} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="font-extrabold text-gray-900 mb-2 text-md leading-tight group-hover:text-teal-700 transition-colors">
        {item.title}
      </h3>
      
      <p className="text-sm text-gray-500 leading-relaxed">
        {item.desc}
      </p>
    </div>
  )
}

export default Stats;