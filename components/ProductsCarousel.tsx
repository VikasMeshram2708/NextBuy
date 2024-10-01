"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCarouselProductsQuery } from "@/app/store/product/productSlice";

export default function ProductsCarousel() {
  const { data, isLoading } = useGetCarouselProductsQuery([]);
  if (isLoading) {
    return (
      <Carousel className="dark container max-w-7xl mx-auto">
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
          {data?.map((item) => (
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
