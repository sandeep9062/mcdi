"use client";

import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReviewCard from "@/components/ReviewCard";
import { Spinner } from "@/components/ui/spinner";
import { Review } from "@/types/types";


const WhatOurStudentSays = () => {

 const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);







  
  const featuredReviews = reviews.slice(0, 3);
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
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Success stories from dental professionals who transformed their
            careers
          </p>
        </motion.div>




        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner className="h-8 w-8" />
            <span className="ml-2 text-gray-600">
              Loading reviews...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">
              Failed to load reviews: {error}
            </p>
            <Button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetch("/api/reviews")
                  .then((response) => {
                    if (!response.ok) throw new Error("Failed to fetch reviews");
                    return response.json();
                  })
                  .then((data) => setReviews(data))
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/reviews">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-(--color-1) text-(--color-2) hover:bg-(--color-1) hover:text-white"
                >
                  Read More Reviews
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WhatOurStudentSays;
