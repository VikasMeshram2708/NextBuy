"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/app/seed/NavLInks";
import { Input } from "./ui/input";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <header className="px-4 py-2 w-full">
      <nav className="container mx-auto flex items-center justify-between gap-3">
        <Link href="/">
          <Avatar>
            <AvatarImage src="./nav-logo.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div className="hidden lg:block w-full max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <Input type="text" placeholder="Search" />
        </div>
        <div className="hidden lg:flex gap-2">
          {links?.map((link) => (
            <Link href={link?.url} key={link?.url}>
              {link?.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          {status === "loading" ? (
            <span className="myLoader"></span>
          ) : status === "authenticated" ? (
            <Button onClick={handleLogout} variant={"destructive"}>
              <span className="mr-2 text-sm font-bold">Logout</span>
              <LogOut />
            </Button>
          ) : (
            <span className="hidden lg:flex gap-3">
              <Button variant={"secondary"}>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant={"outline"}>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </span>
          )}
        </div>
        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent className="dark">
            <SheetHeader>
              <SheetTitle>
                <Link href="/">
                  <Avatar>
                    <AvatarImage src="./nav-logo.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </SheetTitle>
              <SheetDescription className="grid gap-2">
                {links?.map((link) => (
                  <Link
                    key={link?.url}
                    href={link?.url}
                    className="capitalize font-bold hover:underline"
                  >
                    {link?.label}
                  </Link>
                ))}
                {status === "loading" ? (
                  <span className="myLoader"></span>
                ) : status === "authenticated" ? (
                  <Button onClick={handleLogout} variant={"destructive"}>
                    <span className="mr-2 text-sm font-bold">Logout</span>
                    <LogOut />
                  </Button>
                ) : (
                  <>
                    <Button variant={"secondary"}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button variant={"outline"}>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
