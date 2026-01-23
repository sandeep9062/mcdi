"use client";
import React, { useState, useEffect } from "react";
import { Users, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SocialProofStrip() {
  const [studentCount, setStudentCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Generate a number 
    const randomCount =
      Math.floor(Math.random() * 2 * (6000 - 3000 + 11)) + 300;
    setStudentCount(randomCount);

    // Optional: Hide after some time or keep it persistent
    const timer = setTimeout(() => {
      // setIsVisible(false); // Uncomment if you want it to disappear
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-amber-50 border-b border-amber-100 py-2 sticky top-0 z-50 shadow-sm"
        >
          <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-amber-800 text-sm md:text-base font-medium">
            <div className="flex -space-x-2 mr-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?u=${i + 10}`}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <TrendingUp className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>
              Join{" "}
              <span className="font-bold text-amber-900">{studentCount}</span>{" "}
              students who recently enrolled in this course!
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
