'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DentistRegistration } from '@/types/types';
import { Star, ShoppingCart, Eye, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface DentistRegistrationCardProps {
  registration: DentistRegistration;
}

export default function DentistRegistrationCard({ registration }: DentistRegistrationCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(registration);
    toast.success(`${registration.title} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
    >
      <Link href={`/dentist-registration/${registration.slug}`}>
        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
          <Image
            src={registration.thumbnails?.[0] || '/placeholder-image.jpg'}
            alt={registration.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {registration.featured && (
            <Badge className="absolute top-3 left-3 bg-teal-600">Featured</Badge>
          )}
          {registration.popular && (
            <Badge className="absolute top-3 right-3 bg-orange-500">Popular</Badge>
          )}
        </div>
      </Link>

      <div className="p-5 h-[320px] flex flex-col">
        <Link href={`/dentist-registration/${registration.slug}`}>
          <div className="mb-3">
            <Badge variant="outline" className="mb-2">
              {registration.mode}
            </Badge>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-teal-600 transition-colors">
              {registration.title}
            </h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
            {registration.shortDescription}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{registration.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{registration.rating}</span>
              <span>({registration.reviewCount})</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">₹{registration.price.toLocaleString()}</div>
            {registration.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ₹{registration.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToCart}
              className="hover:bg-teal-50 hover:text-teal-600 hover:border-teal-600"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Link href={`/dentist-registration/${registration.slug}`}>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}