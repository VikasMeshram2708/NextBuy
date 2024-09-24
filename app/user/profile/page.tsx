/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchUser } from "@/app/store/userSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Settings, LogOut } from "lucide-react";
import { fetchProduct } from "@/app/store/productSlice";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const productCount = useSelector(
    (state: RootState) => state.product.products
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    // @ts-ignore
    dispatch(fetchUser());
    // @ts-ignore
    dispatch(fetchProduct());
  }, [dispatch]);

  const profileActions = [
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card className="dark w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/user.png" alt={user?.username} />
            <AvatarFallback>
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <span className="text-lg font-semibold">
              Total Items: {productCount.length}
            </span>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4">
            {profileActions.map((action) => (
              <span key={action.label}>
                <Button
                  onClick={() => alert("Coming Soon")}
                  variant="outline"
                  className="w-full"
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
