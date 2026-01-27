import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/button'
const ReadyToTransform = () => {
  return (
      <section className="py-20 bg-(--color-3) text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Dental Career?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful dental professionals who have
              advanced their careers with Master Clinical Dentistry Institute
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-(--color-1) hover:bg-(--color-2) text-lg px-8"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

  )
}

export default ReadyToTransform
