/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  useDeleteProductMutation,
  useFetchCartProductsQuery,
} from "@/app/store/product/productSlice";
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
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function BillingPage() {
  const { data, isLoading } = useFetchCartProductsQuery();

  const [deleteProduct, { isError, error }] =
    useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProduct(id).unwrap();
      // @ts-ignore
      toast.success(result?.message || "Product Removed");
    } catch (error) {
      console.error(`Something went wrong. Failed to delete: ${error}`);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("e", error);
      // @ts-ignore
      toast.error(error);
    }
  }, [isError, error]);

  // Loading state
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
      <div className="py-10">
        {data && data?.length === 0 ? (
          <p className="text-sm text-center font-bold">
            No Products{" "}
            <span>
              <Link
                href="/"
                className="hover:underline underline-offset-2 hover:text-blue-500"
              >
                Add Products
              </Link>
            </span>
          </p>
        ) : (
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center py-10">
            Your Saved Products
          </h2>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((product, i) => (
          <Card className="dark" key={i}>
            <CardHeader>
              <div className="relative aspect-video">
                {/* Ensure product.image is a valid URL */}
                {product?.image && (
                  <Image
                    src={product.image}
                    alt={product.title || "Product Image"}
                    layout="fill"
                    className="bg-cover object-contain"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Ensure title and description are strings */}
              <CardTitle className="line-clamp-2">{product.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <span>
                <Button
                  onClick={() => handleDelete(product?.id)}
                  // onClick={() => handleDelete(String(product?.id))}
                  variant={"destructive"}
                >
                  Remove
                </Button>
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
