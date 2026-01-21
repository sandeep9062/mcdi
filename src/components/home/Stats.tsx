import React from 'react'
import { motion } from 'framer-motion'

import { GraduationCap, Award, Users, Globe } from 'lucide-react'   
const Stats = () => {
  return (
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "25+ Programs", icon: GraduationCap },
              { label: "11+ Years", icon: Award },
              { label: "1-on-1 Mentoring", icon: Users },
              { label: "Global Exam Prep", icon: Globe },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-3 text-teal-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  )
}

export default Stats
