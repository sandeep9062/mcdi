'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('qr');

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: formData,
      items: items.map(item => ({
        id: item.course.id,
        title: item.course.title,
        price: item.course.price,
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
      paymentMethod,
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    router.push('/order/success?orderId=' + order.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91-XXXXXXXXXX"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 transition-colors">
                        <RadioGroupItem value="qr" id="qr" />
                        <div className="flex-1">
                          <Label htmlFor="qr" className="font-medium cursor-pointer">
                            QR Pay
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            Scan QR code with any UPI app to complete payment
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div className="flex-1">
                          <Label htmlFor="paypal" className="font-medium cursor-pointer">
                            PayPal
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay securely with your PayPal account
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 transition-colors">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <div className="flex-1">
                          <Label htmlFor="razorpay" className="font-medium cursor-pointer">
                            Razorpay
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay with credit/debit card or net banking
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 sticky top-20"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.course.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.course.title}</div>
                          <div className="text-gray-600">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-semibold text-gray-900">
                          ₹{(item.course.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax</span>
                      <span className="font-semibold">₹0</span>
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

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    Place Order
                  </Button>

                  <p className="text-xs text-gray-600 text-center mt-4">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
