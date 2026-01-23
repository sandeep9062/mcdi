"use client";

import React, { useState, useEffect } from "react";
// import { useAnalytics } from "../contexts/AnalyticsContext";

interface SocialLinks {
  whatsapp: string;
  facebook: string;
  youtube: string;
  instagram: string;
}

const FloatingSocialButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const { trackSocialClick } = useAnalytics();

  // Show buttons after short delay when page loads
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Social media links - replace with your actual URLs
  const socialLinks: SocialLinks = {
    whatsapp: "https://wa.me/919876543210", // Replace with your WhatsApp number
    youtube: "https://www.youtube.com/@dentaltourismclinicsindia",
    instagram: "https://www.instagram.com/dentaltourismclinicsindia",
    facebook: "https://www.facebook.com/dentaltourismclinicsindia",
  };

  const handleSocialClick = (platform: string, action: string) => {
    // if (trackSocialClick) trackSocialClick(platform, action);
    console.log(`Social click: ${platform} - ${action}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 flex flex-row items-center justify-center w-full bottom-4 md:w-auto md:flex-col md:items-end md:right-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto">
      <div className="flex flex-row p-2 space-x-3 bg-white bg-opacity-75 rounded-full md:flex-col md:space-y-3 md:space-x-0 md:bg-transparent md:p-0 animate-slideUp">
        {/* WhatsApp Button */}
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick("WhatsApp", "chat_click")}
          className="relative p-2 text-white transition-all duration-300 transform bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 animate-bounceIn"
          style={{ animationDelay: "0.1s" }}
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
        </a>

        {/* YouTube Button */}
        <a
          href={socialLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick("YouTube", "subscribe_click")}
          className="relative p-2 text-white transition-all duration-300 transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 animate-bounceIn"
          style={{ animationDelay: "0.2s" }}
          aria-label="Subscribe on YouTube"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>

        {/* Instagram Button */}
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick("Instagram", "follow_click")}
          className="relative p-2 text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 hover:scale-110 animate-bounceIn"
          style={{ animationDelay: "0.3s" }}
          aria-label="Follow on Instagram"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>

        {/* Facebook Button */}
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick("Facebook", "follow_click")}
          className="relative p-2 text-white transition-all duration-300 transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 animate-bounceIn"
          style={{ animationDelay: "0.4s" }}
          aria-label="Follow on Facebook"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingSocialButtons;
