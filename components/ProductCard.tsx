"use client";

import { useQuery } from "@tanstack/react-query";
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

export default function ProductCard() {
  const { data = [], isLoading } = useQuery<dProduct[] | []>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products");
      const result = await res.json();
      return result?.products;
    },
  });
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between py-10">
        <h2 className="text-sm md:text-lg font-bold">Explore Hot Products</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By : " />
          </SelectTrigger>
          <SelectContent className="dark">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading && (
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
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          data?.map((item) => (
            <Card className="dark" key={item?.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{item?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video">
                  <Image
                    src={item?.thumbnail}
                    layout="fill"
                    alt={item?.title}
                  />
                </div>
                <CardDescription className="line-clamp-2">
                  {item?.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span>${item?.price}</span>
                <Button variant={"ghost"}>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
