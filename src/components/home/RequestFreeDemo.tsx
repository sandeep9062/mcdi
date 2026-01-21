import React from 'react'
import { motion } from 'framer-motion'

import LeadForm from '../LeadForm'  
const RequestFreeDemo = () => {
  return (
     <section
        id="lead-form"
        className="py-20 bg-gradient-to-br from-teal-600 to-teal-800"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Request a Free Demo Class
              </h2>
              <p className="text-lg text-teal-50">
                Experience our teaching methodology and meet our expert faculty
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default RequestFreeDemo
