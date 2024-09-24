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
import { Heart, List, LogOut, LucideOctagon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data } = useSession();
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
          <span>Total Items : <Link href="/user/billing" className="hover:underline text-blue-500 font-semibold">10 Vist Billing</Link></span>
        </CardContent>
        <Separator />
        <CardFooter className="py-5 space-x-4">
          <Button>
            <span>
              <User />
            </span>
            <span className="ml-3 font-bold">Edit Profile</span>
          </Button>
          <Button variant={"secondary"}>
            <span>
              <Heart />
            </span>
            <span className="ml-3 font-bold">View WishList</span>
          </Button>
          <Button variant={"destructive"}>
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
