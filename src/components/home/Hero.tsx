import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const scrollToLeadForm = () => {
  const leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Advance Your Dental Career With Expert-Led Training
            </h1>
            <p className="text-lg md:text-xl  text-teal-50 leading-relaxed max-w-2xl mx-auto">
              Learn from 32+ Expert Faculty with 18+ Years of Excellence
            </p>
             <p className="text-lg md:text-xl mb-8 text-teal-50 leading-relaxed max-w-2xl mx-auto">
              — Flexible Online & Classroom Clinical Dentistry Training. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-white text-(--color-1) hover:bg-teal-50 text-lg px-8"
                >
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-(--color-2) text-lg px-8"
                onClick={scrollToLeadForm}
              >
                Request Demo Class
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
