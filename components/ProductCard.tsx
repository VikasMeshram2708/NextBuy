/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useDispatch} from "react-redux";
import { addProduct } from "@/app/store/productSlice";

type Props = {
  isLoading: boolean;
  products: dProduct[];
};

export default function ProductCard({ products, isLoading }: Props) {
  const dispatch = useDispatch();

  const handleAdd = async (productId: number) => {
    // @ts-ignore
    dispatch(addProduct({ productId }));
  };

  return (
    <section>
      <div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card className="dark" key={i}>
                <CardHeader>
                  <Skeleton className="w-full h-10" />
                </CardHeader>

                <CardContent>
                  <Skeleton className="w-full h-40" />

                  <span className="line-clamp-2">
                    <Skeleton className="w-full h-[40px]" />
                  </span>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Skeleton className="w-[100px] h-[30px]" />
                  <Skeleton className="w-[100px] h-[30px]" />
                </CardFooter>
              </Card>
            ))
          : products?.map((product) => (
              <Card className="dark" key={product?.id}>
                <CardHeader>
                  <CardTitle>{product?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative">
                    <Image
                      src={product?.thumbnail}
                      alt={product?.title}
                      layout="fill"
                    />
                  </div>
                  <span className="text-sm line-clamp-2">
                    {product?.description}
                  </span>
                </CardContent>
                <CardFooter className="flex justify-between flex-wrap gap-2">
                  <Button variant={"ghost"}>$ {product?.price}</Button>
                  {/* <Button variant={"destructive"}>Remove Item</Button> */}
                  <Button
                    onClick={() => handleAdd(+product?.id)}
                    variant={"outline"}
                  >
                    Add To Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </section>
  );
}
