"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At NextBuy, we are committed to protecting your privacy. This Privacy
        Policy outlines how we collect, use, and safeguard your information when
        you visit our website or use our services.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information from you when you visit our site,
        register on our site, place an order, subscribe to our newsletter, or
        interact with other activities on our site. The types of information we
        may collect include:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Shipping address</li>
        <li>Payment information</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To process and fulfill your orders.</li>
        <li>To improve our website and services.</li>
        <li>To communicate with you about your order or inquiries.</li>
        <li>
          To send periodic emails regarding your order or other products and
          services.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
      <p className="mb-4">
        We implement a variety of security measures to maintain the safety of
        your personal information. However, no method of transmission over the
        Internet or method of electronic storage is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to request access to the personal information we hold
        about you and to ask that your personal information be corrected or
        deleted.
      </p>

      <h2 className="text-2xl font-semibold mb-2">
        Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      <Button>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
