import { LogOut, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "./ui/input";
import { links } from "@/app/seed/NavLInks";

export const Navbar = () => {
  return (
    <nav className="shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-2">
        <Link href="/" className="flex items-center" aria-label="Home">
          <video
            className="w-12 bg-cover h-12 rounded-full"
            style={{
              placeSelf: "center",
              boxSizing: "border-box",
            }}
            autoPlay
            loop
            muted
          >
            <source src="./logo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Link>

        <div className="hidden lg:block max-w-5xl w-full">
          <Input placeholder="Search" className="rounded" />
        </div>

        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ShoppingCart />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> */}
              <div>
                {links?.map((i) => (
                  <DropdownMenuItem key={i?.label}>
                    <Link href={i.url}>
                      <span>{i.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuItem>
                <Button variant={"destructive"}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu color="white" />
              {/* <Button variant={"secondary"}>
              </Button> */}
            </SheetTrigger>
            <SheetContent className="dark">
              <SheetHeader>
                <SheetTitle className="">
                  <Link
                    href="/"
                    className="flex items-center"
                    aria-label="Home"
                  >
                    <video
                      className="w-10 h-10 rounded-full"
                      style={{
                        placeSelf: "center",
                        boxSizing: "border-box",
                      }}
                      autoPlay
                      loop
                      muted
                    >
                      <source src="./logo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Link>

                  {/* Desktop Navigation */}
                  <ul className="grid w-full items-center space-y-4 mt-10">
                    {links.map((item) => (
                      <Link
                        key={item.label}
                        href={item.url}
                        className="text-white text-sm hover:underline transition"
                      >
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </ul>
                </SheetTitle>
                <SheetDescription className="mt-10 py-5">
                  <span className="space-x-4">
                    <Button variant={"secondary"}>Login</Button>
                    <Button variant={"outline"}>Sign Up</Button>
                  </span>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
