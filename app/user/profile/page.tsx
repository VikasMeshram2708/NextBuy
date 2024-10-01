/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen px-4 py-2 flex flex-col justify-center items-center">
        <Card className="dark w-full max-w-lg mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <span className="space-y-2">
                <Skeleton className="w-80 h-2" />
                <Skeleton className="w-80 h-2" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-10" />
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-8" />
            ))}
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen px-4 py-2 flex flex-col justify-center items-center">
      <Card className="dark w-full max-w-lg mx-auto">
        <CardHeader>
          <div className="flex gap-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <CardDescription>{data?.user?.email}</CardDescription>
              {/* @ts-ignore */}
              <CardTitle>{data?.user?.username}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <span>
            Total Items :{" "}
            <Link
              href="/user/billing"
              className="hover:underline text-blue-500 font-semibold"
            >
              10 Vist Billing
            </Link>
          </span>
        </CardContent>
        <Separator />
        <CardFooter className="py-5 space-x-4">
          <Button onClick={() => toast.error("Comming Soon")}>
            <span>
              <User />
            </span>
            <span className="ml-3 font-bold">Edit Profile</span>
          </Button>
          <Button variant={"secondary"} onClick={() => toast.error("Comming Soon")}>
            <span>
              <Heart />
            </span>
            <span className="ml-3 font-bold">View WishList</span>
          </Button>
          <Button onClick={() => signOut()} variant={"destructive"}>
            <span>
              <LogOut />
            </span>
            <span className="ml-3 font-bold">Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
