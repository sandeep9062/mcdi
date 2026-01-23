"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  Clock,
  Tag,
  Share2,
} from "lucide-react";
import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { Note } from "@/types/types";

export default function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = use(params);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes?slug=${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Note not found");
          } else {
            throw new Error("Failed to fetch note");
          }
          return;
        }
        const data = await response.json();
        setNote(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="h-8 w-8 mb-4" />
          <p className="text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Note not found"}
          </h1>
          <Link href="/notes">
            <Button>Browse All Notes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4 text-teal-100">
                <Link href="/notes" className="hover:underline">
                  Notes
                </Link>
                <span>/</span>
                <span>{note.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {note.title}
              </h1>
              <Badge className="bg-white text-teal-700 text-base px-4 py-1 mb-4">
                {note.category}
              </Badge>
              <p className="text-lg text-teal-50 leading-relaxed">
                {note.shortDescription}
              </p>

              <div className="flex items-center gap-6 mt-6 text-teal-100">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{note.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(note.dateCreated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {new Date(note.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-8"
                >
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: note.content.replace(/\n/g, '<br>') }} />
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 sticky top-20 space-y-6"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={note.thumbnail}
                      alt={note.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Note Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Note Details
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <strong>Subject:</strong> {note.subject}
                      </div>
                      <div>
                        <strong>Category:</strong> {note.category}
                      </div>
                      <div>
                        <strong>Author:</strong> {note.author}
                      </div>
                      <div>
                        <strong>Created:</strong> {new Date(note.dateCreated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigator.share?.({
                        title: note.title,
                        text: note.shortDescription,
                        url: window.location.href,
                      })}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Related Notes */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Related Notes
                    </h4>
                    <Link href="/notes">
                      <Button size="sm" variant="outline" className="w-full">
                        Browse All Notes
                      </Button>
                    </Link>
                  </div>

                  {/* Quick Contact */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Need Help?
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        Phone:{" "}
                        <a
                          href="tel:+917889093147"
                          className="text-teal-600 hover:underline"
                        >
                          +91-7889093147
                        </a>
                      </p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:masterclinicaldentistry@gmail.com"
                          className="text-teal-600 hover:underline break-all"
                        >
                          masterclinicaldentistry@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
