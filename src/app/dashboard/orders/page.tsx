"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Receipt, 
  Download, 
  Search, 
  CreditCard, 
  ExternalLink,
  Filter,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Order Type Definition
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: {
    name: string;
    type: "Course" | "Exam" | "Test Series";
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: "Completed" | "Pending" | "Failed";
  invoiceUrl: string;
}

export default function StudentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/student/orders");
        const data = await response.json();
        // Ensure data is always an array
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading billing history", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, orders]);

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Receipt className="h-8 w-8 text-teal-600" />
                Purchase History
              </h1>
              <p className="text-gray-500 mt-1">Manage your enrollments, invoices, and billing details.</p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Order ID or item..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Summary Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-teal-700 text-white border-none overflow-hidden relative">
                <div className="absolute right-[-20px] top-[-20px] opacity-10">
                    <CreditCard size={120} />
                </div>
                <CardHeader>
                    <CardDescription className="text-teal-100 uppercase text-[10px] font-bold tracking-widest">Lifetime Investment</CardDescription>
                    <CardTitle className="text-3xl font-black">
                        ₹{orders.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString()}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-teal-50">Total spent across {orders.length} successful enrollments.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold">Billing Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xs text-gray-500 italic">Need a GST invoice or refund assistance?</p>
                    <Button variant="secondary" className="w-full text-xs h-9">Contact Billing</Button>
                </CardContent>
            </Card>
          </div>

          {/* Main Table Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[150px]">Order ID</TableHead>
                    <TableHead>Purchased Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium text-gray-900">
                          <div className="flex flex-col">
                            <span>#{order.orderNumber}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[9px] h-4 px-1 py-0 uppercase bg-gray-50">
                                    {item.type}
                                </Badge>
                                <span className="text-sm text-gray-700 line-clamp-1">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-gray-900">
                          ₹{order.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50" asChild>
                            <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                Invoice
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-64">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Package className="h-12 w-12 mb-4 opacity-20" />
                          <p>No orders found matching your search.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function StatusBadge({ status }: { status: Order["status"] }) {
  const styles = {
    Completed: "bg-green-50 text-green-700 border-green-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Failed: "bg-red-50 text-red-700 border-red-100",
  };

  const icons = {
    Completed: <CheckCircle2 className="h-3 w-3 mr-1" />,
    Pending: <Clock className="h-3 w-3 mr-1" />,
    Failed: <AlertCircle className="h-3 w-3 mr-1" />,
  };

  return (
    <Badge className={`${styles[status]} border flex items-center w-fit font-medium`}>
      {icons[status]}
      {status}
    </Badge>
  );
}