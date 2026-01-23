"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Search, GraduationCap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface UserData {
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname(); // it highlights active link
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/users/role");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    if (session) {
      fetchUserRole();
    }
  },[session]);

  const handleLogin = () => {
    router.push("/login");
    toast.success("Enter your details to login !");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/exam-prep", label: "Exam Prep" },
    { href: "/notes", label: "Notes" },
       { href: "/test-series", label: "Test Series" },
    { href: "/reviews", label: "Reviews" },
    { href: "/videos", label: "Videos" },
 
    { href: "/contact", label: "Contact" },

    { href: "/about", label: "About" },
  ];



  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <GraduationCap className="h-8 w-8 text-teal-600" />
            <span className="font-bold text-lg hidden lg:block">
              Master Clinical Dentistry
            </span>
            <span className="font-bold text-lg lg:hidden">MCDI</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>

            {session ? (
              userData?.role === "admin" ? (
                <Button
                  onClick={() => router.push("/admin-dashboard")}
                  className="bg-teal-600 hover:bg-teal-700 px-4"
                >
                  Admin Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-teal-600 hover:bg-teal-700 px-4"
                >
                  Dashboard
                </Button>
              )
            ) : (
              <Button
                className="bg-teal-600 hover:bg-teal-700 px-4"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}

            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
