import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Policies | Master Clinical Dentistry Institute',
  description: 'Terms, conditions, and policies for Master Clinical Dentistry Institute courses',
};

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Policies</h1>
            <p className="text-lg text-teal-50">
              Terms, conditions, and policies for our courses and services
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund and Cancellation Policy</h2>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-orange-900">
                    <p className="font-semibold mb-2">Important Notice</p>
                    <p>Please read our refund policy carefully before enrolling in any course.</p>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  No refunds will be given once a student has enrolled in any course. All fees paid are final and non-refundable, regardless of course completion status or circumstances.
                </p>
                <p className="mb-4">
                  Money is non-refundable and non-adjustable under any circumstances. This policy applies to all courses, programs, and services offered by Master Clinical Dentistry Institute.
                </p>
                <p>
                  We strongly encourage prospective students to carefully review course details, request a demo class, and ask any questions before making a payment decision.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrollment and Access</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Upon successful enrollment and payment confirmation, students will receive course access credentials within 24-48 hours. Our team will contact you with batch details and onboarding information.
                </p>
                <p className="mb-4">
                  Students are responsible for maintaining the confidentiality of their login credentials. Sharing of course materials or access credentials with unauthorized individuals is strictly prohibited and may result in immediate termination of access without refund.
                </p>
                <p>
                  Course access duration and terms are specified for each individual course. Lifetime access, where mentioned, refers to the period during which the course content is actively maintained by the institute.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Code of Conduct</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Students are expected to maintain professional conduct during all interactions with faculty, staff, and fellow students. Disruptive behavior, harassment, or any form of misconduct will not be tolerated.
                </p>
                <p className="mb-4">
                  For clinical training programs, students must adhere to all safety protocols, maintain patient confidentiality, and follow ethical guidelines as per dental practice standards.
                </p>
                <p>
                  Violation of the code of conduct may result in suspension or termination of enrollment without refund.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  All course materials, including but not limited to videos, documents, presentations, and study materials, are the intellectual property of Master Clinical Dentistry Institute and are protected by copyright laws.
                </p>
                <p className="mb-4">
                  Students are granted a limited, non-exclusive, non-transferable license to access and use course materials solely for personal educational purposes. Recording, reproduction, or distribution of course materials is strictly prohibited.
                </p>
                <p>
                  Any unauthorized use or distribution of course materials may result in legal action.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  While we strive to provide high-quality education and training, Master Clinical Dentistry Institute makes no guarantees regarding exam success, job placement, or specific career outcomes.
                </p>
                <p className="mb-4">
                  The institute shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our courses or services.
                </p>
                <p>
                  Students are responsible for their own learning outcomes and professional development.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Jurisdiction and Disputes</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  All disputes are subjected to Mohali jurisdiction only. Any legal matters arising from enrollment, course participation, or related services will be governed by the laws of India and subject to the jurisdiction of courts in Mohali, Punjab.
                </p>
                <p>
                  In case of any disputes, students are encouraged to first attempt resolution through direct communication with the institute administration before pursuing legal action.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Policies</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Master Clinical Dentistry Institute reserves the right to modify these policies at any time. Students will be notified of significant changes via email or through the student portal.
                </p>
                <p>
                  Continued enrollment and participation in courses following policy changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <h3 className="font-semibold text-teal-900 mb-3">Questions About Our Policies?</h3>
              <p className="text-teal-800 mb-4">
                If you have any questions or need clarification about our policies, please contact us:
              </p>
              <div className="space-y-2 text-teal-900">
                <p>Phone: <a href="tel:+917889093147" className="font-medium hover:underline">+91-7889093147</a></p>
                <p>Email: <a href="mailto:masterclinicaldentistry@gmail.com" className="font-medium hover:underline break-all">masterclinicaldentistry@gmail.com</a></p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Last Updated: January 2025</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
