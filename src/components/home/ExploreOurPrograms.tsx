"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, GraduationCap, HeartPulse, ArrowRight, 
  MonitorPlay, Microscope, ClipboardList, PenTool, 
  BookOpen, Globe 
} from "lucide-react";
import Link from "next/link";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ExploreOurPrograms = () => {
  const allCategories = [
    { id: 1, name: "Clinical Dentistry", slug: "clinical-dentistry", description: "Master hands-on clinical procedures with expert-led training sessions.", icon: <Stethoscope className="h-8 w-8" /> },
    { id: 2, name: "Exam Prep", slug: "exam-prep", description: "Targeted coaching for NEET MDS, INI-CET, and international licensing exams.", icon: <GraduationCap className="h-8 w-8" /> },
    { id: 3, name: "Support & Mentorship", slug: "support-dentistry", description: "Get 24/7 Q&A support and career guidance from industry veterans.", icon: <HeartPulse className="h-8 w-8" /> },
    { id: 4, name: "Online Courses", slug: "online-courses", description: "Access high-definition clinical video modules anytime, anywhere.", icon: <MonitorPlay className="h-8 w-8" /> },
    { id: 5, name: "Hybrid Courses", slug: "hybrid-courses", description: "Combine flexible online theory with intensive offline clinical workshops.", icon: <Microscope className="h-8 w-8" /> },
    { id: 6, name: "Test Series", slug: "test-series", description: "Structured assessments to track your progress and identify weak areas.", icon: <ClipboardList className="h-8 w-8" /> },
    { id: 7, name: "Mock Tests", slug: "mock-tests", description: "Full-length simulations to build confidence for competitive exams.", icon: <PenTool className="h-8 w-8" /> },
    { id: 8, name: "Dental Notes", slug: "notes", description: "Concise, high-yield PDF notes for quick revision and chairside reference.", icon: <BookOpen className="h-8 w-8" /> },
    { id: 9, name: "Dentist Registration", slug: "registration", description: "Step-by-step assistance for DCI and international board registrations.", icon: <Globe className="h-8 w-8" /> },
  ];

  const getLink = (slug: string) => {
    const routes: Record<string, string> = {
      "clinical-dentistry": "/courses",
      "exam-prep": "/exam-prep",
      "support-dentistry": "/qa",
      "online-courses": "/courses?mode=online",
      "hybrid-courses": "/courses?mode=hybrid",
      "test-series": "/test-series",
      "mock-tests": "/test-series/mocks",
      "notes": "/notes",
      "registration": "/registration",
    };
    return routes[slug] || "/";
  };

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Explore Our Dental Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A complete suite of resources for the modern dental professional.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              // mobile
              320: { slidesPerView: 1, spaceBetween: 20 },
              // tablet
              768: { slidesPerView: 2, spaceBetween: 30 },
              // desktop
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="pb-16 px-4" // Padding for pagination bullets
          >
            {allCategories.map((category) => (
              <SwiperSlide key={category.id} className="h-auto">
                <div className="group bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full mb-2">
                  {/* Icon Section */}
                  <div className="h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-500">
                    {category.icon}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-brand transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {category.description}
                  </p>

                  {/* Action */}
                  <Link 
                    href={getLink(category.slug)}
                    className="inline-flex items-center gap-2 font-bold text-brand group/link mt-auto"
                  >
                    <span>Know More</span>
                    <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center group-hover/link:bg-brand group-hover/link:text-brand-foreground transition-all duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom styles for Swiper navigation and pagination to match brand */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: var(--brand) !important;
          background: white;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: scale(0.7);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: var(--brand) !important;
        }
      `}</style>
    </section>
  );
};

export default ExploreOurPrograms;