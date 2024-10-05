/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React from "react";
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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingCart, CreditCard, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function BillingPage() {
  const { data, isLoading } = useFetchCartProductsQuery();
  const [deleteProduct, { isError, error }] = useDeleteProductMutation();

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

  // Calculate total
  const total =
    data?.reduce((acc, product) => acc + (product.price || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card className="dark" key={i}>
              <CardHeader>
                <Skeleton className="aspect-video" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card className="dark sticky top-4">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 py-5">
        <ShoppingCart className="h-6 w-6" /> Shopping Cart
      </h1>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {!data || data.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <p className="text-center">
                  Your cart is empty.{" "}
                  <Link href="/" className="text-blue-500 hover:underline">
                    Continue shopping
                  </Link>
                </p>
              </CardContent>
            </Card>
          ) : (
            data?.map((product, i) => (
              <Card className="dark" key={i}>
                <CardHeader>
                  <div className="relative aspect-video">
                    {product?.image && (
                      <Image
                        src={product.image}
                        alt={product.title || "Product Image"}
                        layout="fill"
                        className="object-cover rounded-md"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="line-clamp-1 text-lg mb-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mb-4">
                    {product.description}
                  </CardDescription>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">
                      ${product.price?.toFixed(2) || "0.00"}
                    </span>
                    <Button
                      onClick={() => handleDelete(product?.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="font-bold h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({data?.length || 0} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
