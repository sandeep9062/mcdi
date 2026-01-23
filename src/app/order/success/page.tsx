'use client';

import React, { useEffect } from 'react';
import { use, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-UNKNOWN';

  useEffect(() => {
    toast.success('Order completed successfully! 🎉');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-teal-100 rounded-full mb-6"
          >
            <CheckCircle2 className="h-16 w-16 text-teal-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            Thank you for enrolling in our courses. Your order has been confirmed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <div className="text-sm text-gray-600 mb-2">Order ID</div>
            <div className="text-2xl font-bold text-gray-900">{orderId}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8"
          >
            <h3 className="font-semibold text-teal-900 mb-2">What happens next?</h3>
            <p className="text-teal-800 leading-relaxed">
              Our team will contact you soon with batch details and onboarding information. You will receive course access credentials via email within 24-48 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Link href="/courses">
              <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
                Browse More Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-600 mt-8"
          >
            Need help? Contact us at{' '}
            <a href="tel:+917889093147" className="text-teal-600 hover:underline">
              +91-7889093147
            </a>{' '}
            or{' '}
            <a
              href="mailto:masterclinicaldentistry@gmail.com"
              className="text-teal-600 hover:underline"
            >
              masterclinicaldentistry@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div>Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
