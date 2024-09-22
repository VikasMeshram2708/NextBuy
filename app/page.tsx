"use client";

import ProductsCarousel from "@/components/ProductsCarousel";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

const ProductCard = lazy(() => import("@/components/ProductCard"));

export default function Home() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();

        if (!res.ok) {
          throw new Error("Failed to Fetch Products...");
        }
        return result?.products;
      } catch (error: unknown) {
        throw new Error(`Failed to Fetch Products : ${error}`);
      }
    },
  });
  return (
    <div className="min-h-screen">
      <main className="container mx-auto mt-10 px-4 py-10 space-y-10">
        <Suspense fallback={<p className="text-sm">Loading...</p>}>
          <ProductsCarousel />
          <ProductCard products={data} isLoading={isLoading} />
        </Suspense>
      </main>
    </div>
  );
}
