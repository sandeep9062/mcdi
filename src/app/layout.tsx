'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { Toaster } from '@/components/ui/sonner';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Note: Metadata export removed as it's not supported in client components

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin-dashboard')|| pathname.startsWith('/dashboard')|| pathname.startsWith('/logins');

  return (
    <CartProvider>
      {!isAdmin && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppWidget />}
      <Toaster />
    </CartProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
