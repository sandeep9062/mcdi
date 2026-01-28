import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'About Us | Master Clinical Dentistry Institute',
  description: '11+ years of excellence in dental education with one-on-one mentoring and clinical integration',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-(--color-1) to-(--color-2) text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg md:text-xl text-teal-50 leading-relaxed">
              Empowering dental professionals with world-class education and practical training
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Master Clinical Dentistry Institute was founded with a vision to bridge the gap between theoretical dental education and practical clinical excellence. With over 11 years of experience, we have established ourselves as a leading institution for dental education and international licensing exam preparation.
                </p>
                <p className="mb-4">
                  Our journey began with a simple yet powerful mission: to provide personalized, high-quality dental education that transforms careers and improves patient care. Today, we have trained hundreds of dental professionals who practice successfully across the globe.
                </p>
                <p>
                  We combine expert faculty, comprehensive curriculum, flexible learning options, and real patient clinical integration to create an unparalleled learning experience. Our commitment to excellence and student success remains unwavering.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: Award,
                  title: '11+ Years of Excellence',
                  description: 'Proven track record in dental education and training',
                },
                {
                  icon: Users,
                  title: 'One-on-One Mentoring',
                  description: 'Personalized guidance from experienced faculty',
                },
                {
                  icon: Globe,
                  title: 'Global Recognition',
                  description: 'Preparing dentists for international licensing exams',
                },
                {
                  icon: Heart,
                  title: 'Patient-Centered Learning',
                  description: 'Real clinical experience with supervised patient care',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <item.icon className="h-12 w-12 text-(--color-1) mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Excellence',
                    description: 'We maintain the highest standards in education, faculty, and training methodologies.',
                  },
                  {
                    title: 'Integrity',
                    description: 'We operate with honesty, transparency, and ethical practices in all our interactions.',
                  },
                  {
                    title: 'Innovation',
                    description: 'We continuously evolve our curriculum and teaching methods to stay ahead of industry trends.',
                  },
                  {
                    title: 'Student Success',
                    description: 'Your success is our success. We are committed to helping every student achieve their career goals.',
                  },
                ].map((value, index) => (
                  <div key={index} className="border-l-4 border-(--color-1) pl-6 py-2">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
