'use client';

import React from 'react';
import Link from 'next/link';
import { Note } from '@/types/types';
import { ArrowRight, BookOpen, User, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow p-6 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-teal-600" />
            <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{note.title}</h3>
          </div>
          <Badge variant="outline" className="text-xs mb-2">
            {note.category}
          </Badge>
          <p className="text-sm text-gray-600 line-clamp-2">{note.subject}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 flex-1">{note.shortDescription}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{note.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(note.dateCreated).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {note.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {note.tags.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{note.tags.length - 3}
          </Badge>
        )}
      </div>

      <div className="mt-auto">
        <Link href={`/notes/${note.slug}`}>
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Read Notes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}