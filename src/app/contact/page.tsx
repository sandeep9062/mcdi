'use client';

import React,{useTransition} from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Clock, Send, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createContact } from "@/lib/actions/contact-actions";


const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {

  const [isPending, startTransition] = useTransition();



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    startTransition(async () => {
      try {
        await createContact(data);
        toast.success('Message sent successfully! We will get back to you soon.');
        reset();
      } catch (error) {
        console.error('Error submitting contact form:', error);
        toast.error('Failed to send message. Please try again.');
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-800/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <MessageSquare className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Get In Touch</h1>
            <p className="text-lg md:text-xl text-teal-50 leading-relaxed max-w-3xl mx-auto">
              Ready to advance your dental career? Connect with our expert team for personalized guidance and support
            </p>
          </motion.div>
        </div>

      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about our courses, need career guidance, or want to learn more about our programs?
                We're here to help you every step of the way.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                variants={itemVariants}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-teal-100 rounded-xl">
                      <Send className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
                      <p className="text-gray-600">We'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Enter your full name"
                          className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors.name.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="your@email.com"
                          className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors.email.message}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+91-XXXXXXXXXX"
                        className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="What can we help you with?"
                        className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us more about your inquiry, goals, or any specific questions you have..."
                        rows={5}
                        className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-200 resize-none"
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.message.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isPending}
                        className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="lg:col-span-1 space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-teal-100 rounded-xl">
                      <Users className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Get In Touch</h3>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 group"
                    >
                      <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-white transition-colors duration-200">
                        <Phone className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Phone</div>
                        <a
                          href="tel:+917889093147"
                          className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                        >
                          +91-7889093147
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 group"
                    >
                      <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-white transition-colors duration-200">
                        <Mail className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Email</div>
                        <a
                          href="mailto:masterclinicaldentistry@gmail.com"
                          className="text-gray-700 hover:text-teal-600 transition-colors duration-200 break-words md:whitespace-nowrap font-medium"
                        >
                          masterclinicaldentistry@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 group"
                    >
                      <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-white transition-colors duration-200">
                        <MapPin className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Location</div>
                        <p className="text-gray-700 font-medium">
                          Mohali, Punjab, India
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-teal-100 rounded-xl">
                      <Clock className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', status: 'open' },
                      { days: 'Saturday', hours: '10:00 AM - 4:00 PM', status: 'open' },
                      { days: 'Sunday', hours: 'Closed', status: 'closed' },
                    ].map((schedule, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex justify-between items-center py-2"
                      >
                        <span className="text-gray-700 font-medium">{schedule.days}</span>
                        <span className={`font-semibold ${schedule.status === 'open' ? 'text-teal-600' : 'text-red-500'}`}>
                          {schedule.hours}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                    <div className="flex gap-3">
                      {[
                        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                        { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-600 hover:from-teal-600 hover:to-teal-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                          aria-label={social.label}
                        >
                          <social.icon className="h-6 w-6" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
