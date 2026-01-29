"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Note } from '@/types/types';
import { ShoppingCart, FileText, Star, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { addToCart } = useCart();

  // We cast to 'any' here to prevent the build error if originalPrice 
  // is missing from the global 'Note' type definition.
  const noteData = note as any;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!noteData) return;
    
    addToCart(noteData); 
    toast.success(`${noteData.title} added to cart!`);
  };

  // Safe variables: explicitly handle the potential missing fields
  const currentPrice = noteData?.price ?? 0;
  const originalPrice = noteData?.originalPrice;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-xl transition-all flex flex-col h-full group"
    >
      {/* Thumbnail with Lock Overlay */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={noteData?.thumbnail || '/placeholder-note.jpg'}
          alt={noteData?.title || "Dental Notes"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Lock className="text-white h-8 w-8" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight group-hover:text-(--color-1) transition-colors">
            {noteData?.title || "Untitled Note"}
          </h3>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {noteData?.shortDescription || "No description available."}
        </p>

        <div className="flex items-center gap-3 mb-4">
             <div className="flex items-center gap-1 text-xs font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded">
                <FileText className="h-3 w-3" /> PDF format
             </div>
             <div className="flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                <Star className="h-3 w-3 fill-blue-700 text-blue-700" /> 4.8
             </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ₹{Number(currentPrice).toLocaleString()}
            </span>
            {originalPrice && (
                <span className="ml-2 text-xs text-gray-400 line-through">
                  ₹{Number(originalPrice).toLocaleString()}
                </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToCart}
              className="rounded-full hover:bg-(--color-1) hover:text-white transition-colors h-9 w-9"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Link href={`/notes/${noteData?.slug}`}>
              <Button size="sm" className="bg-(--color-1) hover:bg-(--color-2) rounded-full px-4 h-9">
                Preview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}