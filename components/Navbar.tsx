import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            width={300}
            height={300}
            className="w-24 h-20"
            src="./navbar-logo.svg"
            alt="SecureCheckoutDeals: Safe Online Shopping & Best Deals in India"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {["Home", "About", "Services", "Privacy", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm hover:underline transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
              <Button variant="outline" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="dark" side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/"
                  className="flex items-center mb-4"
                  aria-label="Home"
                >
                  <Image
                    width={300}
                    height={300}
                    className="w-full h-20"
                    src="./navbar-logo.svg"
                    alt="SecureCheckoutDeals: Safe Online Shopping & Best Deals in India"
                  />
                </Link>
                {["Home", "About", "Services", "Privacy", "Contact"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="text-sm hover:underline transition"
                    >
                      {item}
                    </Link>
                  )
                )}
                <div className="space-x-4 pt-5">
                  <Button variant={"secondary"} className="font-bold">
                    Login
                  </Button>
                  <Button variant={"outline"}>Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Buttons */}
        <div className="space-x-4 hidden lg:flex">
          <Button variant="secondary" className="font-bold">
            Login
          </Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};
