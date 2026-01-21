import React from 'react'
import { motion } from 'framer-motion'

import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import FAQAccordion from '../FAQAccordion'



import { faqs } from "@/data/faqs";
const FAQ = () => {


  const homeFaqs = faqs.slice(0, 5);

  return (
   <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our programs
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={homeFaqs} />
          </div>

          <div className="text-center mt-8">
            <Link href="/qa">
              <Button variant="link" className="text-teal-600">
                Browse Test Series <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default FAQ
