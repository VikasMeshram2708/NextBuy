/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { useAddProductMutation } from "@/app/store/product/productSlice";
import { useEffect } from "react";

export default function ProductCard() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<cardProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://fakestoreapiserver.reactbd.com/products"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });

  const [addProduct, { isLoading: isAdding, isSuccess, data: msg }] =
    useAddProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg?.message || "Product Added");
    }
  }, [isSuccess, msg]);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card className="dark" key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-full h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video" />
              <Skeleton className="w-full h-4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="w-full h-4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between py-10">
        <h2 className="text-sm md:text-lg font-bold">Explore Hot Products</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By : " />
          </SelectTrigger>
          <SelectContent className="dark">
            <SelectItem value="highToLow">High to Low</SelectItem>
            <SelectItem value="lowToHigh">Low to High</SelectItem>
            <SelectItem value="ascending">Ascending</SelectItem>
            <SelectItem value="descending">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card className="dark" key={item._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                {/* Add rating */}
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>
                    {item.rating ? item.rating.toFixed(1) : "N/A"}
                  </span>{" "}
                  {/* Handle undefined ratings */}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video">
                <Image
                  src={item.image}
                  className="bg-cover object-contain"
                  layout="fill"
                  alt={item.title}
                />
              </div>
              <CardDescription className="line-clamp-2 py-5">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span>${item.price}</span>
              <Button
                disabled={isAdding}
                // onClick={() => mutate(item)}
                onClick={() => addProduct(item)}
                variant={"ghost"}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
