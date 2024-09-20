import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

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
  title: "SecureCheckoutDeals: Safe Online Shopping & Best Deals in India",
  description:
    "Shop securely on SecureCheckoutDeals.com. Find the best deals in India with safe and fast checkout. Wide product range, amazing discounts, and reliable delivery.",
  keywords: [
    "secure checkout",
    "online deals",
    "safe shopping",
    "e-commerce",
    "India",
    "discounts",
    "fast delivery",
    "best prices",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://securecheckoutdeals.com",
  },
  openGraph: {
    title: "SecureCheckoutDeals - Safe Shopping & Best Deals in India",
    description:
      "Experience secure online shopping with the best deals in India. Wide selection, great discounts, and safe checkout process.",
    url: "https://securecheckoutdeals.com",
    siteName: "SecureCheckoutDeals",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureCheckoutDeals - Safe Shopping & Best Discounts in India",
    description:
      "Shop with confidence on SecureCheckoutDeals. Best prices, secure checkout, and amazing deals across India!",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
