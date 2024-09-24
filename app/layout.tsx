import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Wrapper from "./Wrapper";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextBuy: Secure Online Shopping & Best Deals in India",
  description:
    "Discover unbeatable prices and secure shopping at NextBuy. Shop a wide range of products with fast delivery and exclusive discounts. Your trusted source for online shopping in India.",
  keywords: [
    "secure online shopping",
    "best deals in India",
    "discounts on products",
    "fast delivery e-commerce",
    "buy online safely",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nextbuy.com",
  },
  openGraph: {
    title: "NextBuy - Your Trusted Source for Secure Online Shopping",
    description:
      "Shop at NextBuy for the best deals and a secure checkout experience. Enjoy fast delivery and exclusive offers across India.",
    url: "https://nextbuy.com",
    siteName: "NextBuy",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextBuy - Secure Shopping & Amazing Deals in India",
    description:
      "Join NextBuy for safe online shopping with unbeatable deals and fast delivery. Shop now and save big!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} min-h-screen ${geistMono.variable} antialiased`}
      >
        <Wrapper>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </Wrapper>
      </body>
    </html>
  );
}
