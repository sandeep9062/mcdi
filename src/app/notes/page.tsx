"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  Filter, 
  X, 
  FileText, 
  Users, 
  Tags,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import NoteCard from "@/components/NoteCard";
import { Note } from "@/types/types";

export default function NotesHubPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const categories = useMemo(() => ["all", ...Array.from(new Set(notes.map(n => n.category)))], [notes]);

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    });
  }, [notes, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-teal-500/20 text-white border-teal-500/30 mb-4 px-4 py-1">Premium Study Material</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Dental Notes Hub</h1>
            <p className="text-white mb-8 max-w-2xl mx-auto text-lg">
              Unlock high-yield, expert-curated PDF notes. Master complex dental topics with visual summaries.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5" />
              <Input
                placeholder="Search by topic, e.g., Endodontics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white focus:bg-white focus:text-black transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </h3>
                  {(selectedCategory !== "all" || searchQuery) && (
                    <Button variant="ghost" size="sm" onClick={() => {setSelectedCategory("all"); setSearchQuery("");}} className="h-7 text-xs text-red-600">
                      Clear
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Subject Category</label>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <Checkbox 
                            id={cat} 
                            checked={selectedCategory === cat}
                            onCheckedChange={() => setSelectedCategory(cat)}
                          />
                          <label htmlFor={cat} className="text-sm text-gray-600 capitalize cursor-pointer">{cat}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="bg-gray-50 p-4 rounded-xl border border-white">
                    <h4 className="text-sm font-bold text-(--color-1) mb-2">Note Access</h4>
                    <p className="text-xs text-(--color-1)">Once purchased, notes are available in your dashboard for lifetime reading.</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <main className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500 font-medium">
                  Showing {filteredAndSortedNotes.length} Premium Notes
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="flex justify-center py-20"><Spinner className="h-10 w-10 text-teal-600" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}