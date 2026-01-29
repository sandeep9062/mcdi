'use client';

import React, { useState, useMemo } from 'react';
import { Search, Star, BookOpen, Clock, CheckCircle, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { testSeries } from '@/data/testSeries';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function TestSeriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('all');
  const { addToCart } = useCart();

  const examTypes = Array.from(new Set(testSeries.map((ts) => ts.examType)));

  const filteredTestSeries = useMemo(() => {
    return testSeries.filter((ts) => {
      const matchesSearch =
        ts.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ts.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ts.examType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesExamType = selectedExamType === 'all' || ts.examType === selectedExamType;
      return matchesSearch && matchesExamType;
    });
  }, [searchQuery, selectedExamType]);

  const handleAddToCart = (series: any) => {
    const courseFormat = {
      id: series.id,
      slug: series.slug,
      title: series.title,
      shortDescription: series.shortDescription,
      fullDescription: series.fullDescription,
      price: series.price,
      originalPrice: series.originalPrice,
      thumbnail: series.thumbnail,
      category: series.category,
      mode: 'Online' as const,
      duration: series.duration,
      rating: series.rating,
      reviewCount: series.reviewCount,
      featured: series.featured,
      popular: false,
      whatYouLearn: series.whatIncluded,
      curriculum: [],
      whoIsThisFor: [],
      faculty: {
        name: 'Expert Faculty',
        title: 'Specialist Team',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
        bio: 'Our expert team of dental professionals'
      },
      faqs: []
    };
    addToCart(courseFormat);
    toast.success(`${series.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Test Series & Question Banks</h1>
            <p className="text-lg text-teal-50 mb-8">
              Practice with thousands of questions to ace your dental exams
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search test series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h3 className="font-semibold text-gray-900 mb-3">Filter by Exam Type</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedExamType === 'all' ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    selectedExamType === 'all' ? 'bg-teal-600' : ''
                  }`}
                  onClick={() => setSelectedExamType('all')}
                >
                  All
                </Badge>
                {examTypes.map((examType) => (
                  <Badge
                    key={examType}
                    variant={selectedExamType === examType ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      selectedExamType === examType ? 'bg-teal-600' : ''
                    }`}
                    onClick={() => setSelectedExamType(examType)}
                  >
                    {examType}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {filteredTestSeries.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredTestSeries.map((series, index) => (
                  <motion.div
                    key={series.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={series.thumbnail}
                        alt={series.title}
                        className="w-full h-full object-cover"
                      />
                      {series.featured && (
                        <Badge className="absolute top-3 left-3 bg-teal-600">Featured</Badge>
                      )}
                      <Badge className="absolute top-3 right-3 bg-orange-500">{series.examType}</Badge>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{series.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{series.shortDescription}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{series.questionsCount} Questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{series.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900">{series.rating}</span>
                          <span>({series.reviewCount})</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">What's Included:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {series.whatIncluded.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="mb-4">
                        <AccordionItem value="samples" className="border-t border-gray-200">
                          <AccordionTrigger className="text-sm font-medium">
                            View Sample Questions ({series.sampleQuestions.length})
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              {series.sampleQuestions.map((q, qIdx) => (
                                <div key={qIdx} className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-3">{q.question}</p>
                                  <div className="space-y-2 mb-3">
                                    {q.options.map((option, oIdx) => (
                                      <div
                                        key={oIdx}
                                        className={`p-2 rounded text-sm ${
                                          oIdx === q.correctAnswer
                                            ? 'bg-green-100 text-green-900 font-medium'
                                            : 'bg-white text-gray-700'
                                        }`}
                                      >
                                        {String.fromCharCode(65 + oIdx)}. {option}
                                        {oIdx === q.correctAnswer && ' ✓'}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded">
                                    <span className="font-semibold text-blue-900">Explanation: </span>
                                    {q.explanation}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{series.price.toLocaleString()}
                          </div>
                          {series.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              ₹{series.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => handleAddToCart(series)}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No test series found</h3>
                <p className="text-gray-600">Try adjusting your search or exam type filter</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
