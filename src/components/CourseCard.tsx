'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/types';
import { Star, ShoppingCart, Eye, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-swipe functionality
  useEffect(() => {
    if (course.thumbnails.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % course.thumbnails.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [course.thumbnails.length]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(course);
    toast.success(`${course.title} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
    >
      <Link href={`/courses/${course.slug}`}>
        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
            }}
            className="w-full h-full"
          >
            <CarouselContent>
              {course.thumbnails.map((thumbnail, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative w-full h-48 md:h-56">
                    <Image
                      src={thumbnail}
                      alt={`${course.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Slide indicators */}
          {course.thumbnails.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {course.thumbnails.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSlide(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {course.featured && (
            <Badge className="absolute top-3 left-3 bg-(--color-1)">Featured</Badge>
          )}
          {course.popular && (
            <Badge className="absolute top-3 right-3 bg-(--color-4)">Popular</Badge>
          )}
        </div>
      </Link>

      <div className="p-5 h-[320px] flex flex-col">
        <Link href={`/courses/${course.slug}`}>
          <div className="mb-3">
            <Badge variant="outline" className="mb-2">
              {course.mode}
            </Badge>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-(--color-1) transition-colors">
              {course.title}
            </h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
            {course.shortDescription}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{course.rating}</span>
              <span>({course.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{course.enrollmentCount} enrolled</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</div>
            {course.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ₹{course.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToCart}
              className="hover:bg-teal-50 hover:text-(--color-2) hover:border-(--color-1)"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Link href={`/courses/${course.slug}`}>
              <Button size="sm" className="bg-(--color-1) hover:bg-(--color-2)">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
