"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Calendar,
  CreditCard,
  User as UserIcon,
  ShoppingBag
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

interface Order {
  id: string;
  orderId: string;
  userName: string;
  userEmail: string;
  itemName: string;
  category: "Course" | "Exam" | "Test Series";
  amount: number;
  status: "success" | "pending" | "failed";
  createdAt: string;
  transactionId: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch("/api/admin/orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load admin orders");
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, orders]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Spinner /></div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Admin Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Revenue" value={`₹${orders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`} icon={<CreditCard className="text-teal-600" />} />
        <MetricCard title="Active Enrollments" value={orders.filter(o => o.status === 'success').length} icon={<ShoppingBag className="text-blue-600" />} />
        <MetricCard title="Pending Payments" value={orders.filter(o => o.status === 'pending').length} icon={<Calendar className="text-orange-600" />} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by Order ID, Name or Email..." 
            className="pl-10 border-none bg-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-700">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Order Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
                      {order.userName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{order.userName}</span>
                      <span className="text-xs text-gray-400">{order.userEmail}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{order.itemName}</span>
                    <span className="text-[10px] text-teal-600 uppercase font-bold tracking-wider">{order.category}</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold">₹{order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" /> View Transaction
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 cursor-pointer">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Support Components
function MetricCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles = {
    success: "bg-green-100 text-green-700",
    pending: "bg-orange-100 text-orange-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <Badge className={`${styles[status]} border-none font-bold capitalize`}>
      {status}
    </Badge>
  );
}