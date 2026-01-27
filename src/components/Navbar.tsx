"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface UserData {
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();
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
    if (session) fetchUserRole();
  }, [session]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/exam-prep", label: "Exam Prep" },
    { href: "/notes", label: "Notes" },
    { href: "/test-series", label: "Test Series" },
    { href: "/reviews", label: "Reviews" },
    { href: "/dentist-registration", label: "Dentist Registration" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-20 h-18 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="MCDI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-(--color-1) leading-none text-lg tracking-tight">
                  Master Clinical
                </span>
                <span className="text-(--color-3) font-semibold text-xs uppercase tracking-widest">
                  Dentistry Institute
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-gray-50/50 rounded-full px-2 py-1 border border-gray-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-(--color-1)"
                      : "text-gray-600 hover:text-(--color-2)"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-(--color-3) hover:text-(--color-1) transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center animate-in zoom-in">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>

            <div className="hidden md:block h-6 w-[1px] bg-gray-200 mx-2" />

            {session ? (
              <Button
                onClick={() =>
                  router.push(
                    userData?.role === "admin"
                      ? "/admin-dashboard"
                      : "/dashboard",
                  )
                }
                variant="default"
                className="bg-(--color-1) hover:bg-(--color-2) text-white shadow-md shadow-teal-100 transition-all active:scale-95 flex items-center gap-2 rounded-lg"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  router.push("/login");
                  toast.info("Welcome back!");
                }}
                className="bg-(--color-1) hover:bg-(--color-2) text-white rounded-lg px-6"
              >
                Login
              </Button>
            )}

            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    pathname === link.href
                      ? "bg-(--color-3) text-(--color-1)"
                      : "text-gray-600 hover:bg-gray-50"
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
