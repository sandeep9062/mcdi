import React from 'react';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/data/courses';

export default function TestCarouselPage() {
  // Get the first course with multiple thumbnails for testing
  const testCourse = courses[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">CourseCard Carousel Test</h1>
        <div className="max-w-md mx-auto">
          <CourseCard course={testCourse} />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            This course has {testCourse.thumbnails.length} thumbnails for testing the carousel.
          </p>
          <div className="mt-4 space-y-2">
            {testCourse.thumbnails.map((thumbnail, index) => (
              <div key={index} className="text-sm text-gray-500">
                Thumbnail {index + 1}: {thumbnail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}