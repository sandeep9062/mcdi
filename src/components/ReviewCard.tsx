import React from 'react';
import { Review } from '@/types/types';
import { Star, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-full">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-900">{review.name}</h4>
            {review.verified && (
              <CheckCircle className="h-4 w-4 text-teal-600" />
            )}
          </div>
          <p className="text-sm text-gray-600">{review.course}</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{review.text}</p>
    </div>
  );
}
