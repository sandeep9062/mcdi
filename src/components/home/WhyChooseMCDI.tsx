import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'  
const WhyChooseMCDI = () => {
  return (
     <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Master Clinical Dentistry Institute?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              We provide comprehensive dental education with proven results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "One-on-One Mentoring",
                description:
                  "Personalized guidance from experienced faculty to address your specific learning needs and goals",
              },
              {
                title: "Clinical Integration",
                description:
                  "Real patient experience and hands-on training to build practical skills and confidence",
              },
              {
                title: "Flexible Learning",
                description:
                  "Choose between online, offline, or hybrid modes to fit your schedule and preferences",
              },
              {
                title: "11+ Years of Excellence",
                description:
                  "Proven track record of training successful dental professionals across the globe",
              },
              {
                title: "International Exam Prep",
                description:
                  "Comprehensive preparation for INBDE, DHA, ADC, ORE, and other global licensing exams",
              },
              {
                title: "Expert Faculty",
                description:
                  "Learn from highly qualified specialists with extensive clinical and teaching experience",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <CheckCircle className="h-10 w-10 text-teal-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default WhyChooseMCDI
