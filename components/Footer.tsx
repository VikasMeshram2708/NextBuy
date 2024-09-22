import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full container px-4 py-2 mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            width={500}
            height={500}
            src="/nav-logo.png"
            alt="NextBuy: Secure Online Shopping & Best Deals in India"
            className="w-12 bg-cover h-12 rounded-full"
          />
        </Link>
        <address className="text-sm">
          <h2>Nagpur, Maharashtra, India</h2>
          <p>+91 1234567898</p>
        </address>
      </div>

      <div className="flex justify-center px-4 py-2">
        <p className="text-sm">
          CopyRight &copy; @SecureCheckoutDeals - Safe Shopping & Best Deals in
          India
        </p>
      </div>
    </footer>
  );
}
