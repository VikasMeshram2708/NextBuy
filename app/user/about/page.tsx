"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About NextBuy</h1>
      <p className="mb-2">
        **NextBuy** is your premier destination for secure online shopping in
        India, dedicated to providing customers with the best deals on a vast
        array of products.
      </p>
      <p className="mb-4">
        Our platform is designed to ensure a seamless shopping experience,
        combining unbeatable prices with fast delivery and exclusive discounts.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
      <p className="mb-4">
        At NextBuy, our mission is to empower consumers by offering a
        trustworthy and efficient online shopping environment. We strive to
        connect customers with high-quality products at competitive prices while
        ensuring their safety and satisfaction throughout the purchasing
        process.
      </p>
      <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Wide Range of Products:</strong> Explore an extensive
          selection of categories, including electronics, fashion, home goods,
          and more.
        </li>
        <li>
          <strong>Secure Shopping Experience:</strong> We prioritize your
          security with advanced encryption technologies to protect your
          personal information.
        </li>
        <li>
          <strong>Fast Delivery:</strong> Enjoy quick shipping options that get
          your purchases to you in no time.
        </li>
        <li>
          <strong>Exclusive Discounts:</strong> Take advantage of our regular
          promotions and special offers to save even more on your favorite
          items.
        </li>
      </ul>
      <Button>
        <Link href="/">Shop Now</Link>
      </Button>
    </div>
  );
}
