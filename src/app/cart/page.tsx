'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Explore our courses and add them to your cart to get started on your dental education journey.
          </p>
          <Link href="/courses">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md p-6"
                  >
                    <div className="flex gap-6">
                      <Link href={`/courses/${item.course.slug}`} className="flex-shrink-0">
                        <img
                          src={item.course.thumbnails?.[0] || '/placeholder-image.jpg'}
                          alt={item.course.title}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1">
                        <Link href={`/courses/${item.course.slug}`}>
                          <h3 className="font-semibold text-lg text-gray-900 hover:text-teal-600 transition-colors mb-2">
                            {item.course.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-3">{item.course.category}</p>

                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => {
                                updateQuantity(item.course.id, item.quantity - 1);
                                toast.success('Quantity updated');
                              }}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => {
                                updateQuantity(item.course.id, item.quantity + 1);
                                toast.success('Quantity updated');
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ₹{(item.course.price * item.quantity).toLocaleString()}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-gray-600">
                                  ₹{item.course.price.toLocaleString()} each
                                </div>
                              )}
                            </div>

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                removeFromCart(item.course.id);
                                toast.success(`${item.course.title} removed from cart`);
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Link href="/courses">
                  <Button variant="outline" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-20"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900 text-2xl">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">We Accept:</h3>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded">QR Pay</span>
                    <span className="px-3 py-1 bg-gray-100 rounded">PayPal</span>
                    <span className="px-3 py-1 bg-gray-100 rounded">Razorpay</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
