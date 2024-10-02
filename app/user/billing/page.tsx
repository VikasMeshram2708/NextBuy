"use client";

import { useFetchCartProductsQuery } from "@/app/store/product/productSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function BillingPage() {
  const { data, isLoading } = useFetchCartProductsQuery();
  if (isLoading) {
    return (
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <Skeleton className="w-36 h-10" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="min-h-screen container mx-auto">
      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center py-10">
        Billing Page
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((product) => (
          <Card className="dark" key={product?._id}>
            <CardHeader>
              <div className="relative aspect-video">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  layout="fill"
                  className="bg-cover object-contain"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="line-clamp-2">{product?.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product?.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <span>
                <Button variant={"destructive"}>Remove</Button>
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
