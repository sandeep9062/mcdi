import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#67B2D8] text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative bg-black rounded-full w-28 h-28 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="MCDI Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-(--color-1) text-xl">
                  Master Clinical
                </span>
                <span className="text-(--color-3) font-semibold text-lg">
                  Dentistry Institute
                </span>
              </div>
            </div>
            <p className="text-sm mb-4">
              Master Clinical Dentistry Institute - Advancing dental education
              with 18+ years of excellence.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--color-1) transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--color-1)  transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--color-1)  transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                <li>
                <Link
                  href="/about"
                  className="hover:text-(--color-1)  transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-(--color-1)  transition-colors"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/exam-prep"
                  className="hover:text-(--color-1)  transition-colors"
                >
                  Exam Preparation
                </Link>
              </li>
            
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-(--color-1) transition-colors"
                >
                  Student Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="hover:text-(--color-1)  transition-colors"
                >
                  Videos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              
              <li>
                <Link
                  href="/contact"
                  className="hover:text-(--color-1)  transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="hover:text-(--color-1)  transition-colors"
                >
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-(--color-1)  flex-shrink-0" />
                <a
                  href="tel:+917889093147"
                  className="hover:text-(--color-1) transition-colors"
                >
                  +91-7889093147
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-(--color-1) flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:masterclinicaldentistry@gmail.com"
                  className="hover:text-(--color-1) transition-colors break-all"
                >
                  info@masterclinicaldentistry.com
                </a>
              </li>
              <li className="text-sm">Mohali, Punjab, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; 2025 by Master Clinical Dentistry Institute. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
