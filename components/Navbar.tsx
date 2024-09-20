import { Menu,ShoppingCart } from "lucide-react";
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
import { Input } from "./ui/input";

export const Navbar = () => {
  return (
    <nav className="shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Home">
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

        <div className="hidden lg:block max-w-5xl w-full">
          <Input placeholder="Search" className="rounded" />
        </div>

        <div className="hidden lg:block">
          <Button>
            <ShoppingCart />
          </Button>
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
                    {["Home", "About", "Services", "Privacy", "Contact"].map(
                      (item) => (
                        <Link
                          key={item}
                          href={`/${item.toLowerCase()}`}
                          className="text-white text-sm hover:underline transition"
                        >
                          {item}
                        </Link>
                      )
                    )}
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
