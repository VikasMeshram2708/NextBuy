"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsCarousel() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const result = await res.json();
        if (!res.ok) {
          throw new Error("Failed to Fetch Products");
        }
        return result;
      } catch (error: unknown) {
        console.log(
          `Something went wrong. Failed to fetch products ; ${error}`
        );
        throw new Error("Failed to Fetch Products");
      }
    },
  });

  if (isLoading) {
    return (
      <Carousel className="dark container mx-auto">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent>
                  <Skeleton className="h-[15rem] w-full" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <div>
      <Carousel className="container mx-auto">
        <CarouselContent>
          {data.map((item: Product) => (
            <CarouselItem key={item.id}>
              <Card>
                <CardContent>
                  <div className="relative aspect-video h-80 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="bg-cover object-contain"
                      layout="fill"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
