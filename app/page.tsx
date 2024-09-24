/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import ProductsCarousel from "@/components/ProductsCarousel";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "./store/productSlice";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const dispatch = useDispatch();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        throw new Error("Failed to Fetch Products...");
      }
      const result = await res.json();
      return result?.products;
    },
  });

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto mt-10 px-4 py-10 space-y-10">
        <ProductsCarousel />
        {isLoading ? (
          <span className="myCusomLoader"></span>
        ) : error ? (
          <p>Error fetching products: {error.message}</p>
        ) : (
          <ProductCard products={data} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}
