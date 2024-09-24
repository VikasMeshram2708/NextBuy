"use client";

import React, { useEffect, useState } from "react";
import { LogOut, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { links } from "@/app/seed/NavLInks";

export const Navbar = () => {
  const { status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    }

    if (status === "unauthenticated") {
      setIsAuthenticated(false);
    }
  }, [status]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between gap-3 items-center">
        <Link href="/" className="text-xl font-bold">
          <Avatar>
            <AvatarImage src="/nav-logo.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        <div className="hidden md:flex w-full md:max-w-4xl lg:max-w-5xl mx-auto items-center space-x-4">
          <Input placeholder="Search" />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              className="hover:text-gray-300"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="relative" asChild>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {products?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {products?.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Cart</DropdownMenuLabel>
              <DropdownMenuItem>View Cart</DropdownMenuItem>
              <DropdownMenuItem>Checkout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {status === "loading" ? (
            <span className="myLoader"></span>
          ) : isAuthenticated ? (
            <Button onClick={handleLogout} variant="destructive" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button variant="secondary" size="sm">
              Login
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-800 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  className="text-lg hover:text-gray-300"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button variant="secondary">Login</Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
