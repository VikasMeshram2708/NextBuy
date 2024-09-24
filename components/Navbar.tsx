import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
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

export default function Navbar() {
  return (
    <header className="px-4 py-2 w-full">
      <nav className="container mx-auto flex items-center justify-between gap-3">
        <div>
          <Link href="/">
            <Avatar>
              <AvatarImage src="./nav-logo.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="hidden lg:block w-full max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <Input type="text" placeholder="Search" />
        </div>
        <div className="hidden lg:flex gap-3">
          <Button variant={"secondary"}>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant={"outline"}>
            <Link href="/signup">Sign Up</Link>
          </Button>
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
                <span className="space-x-3 py-5">
                  <Button variant={"secondary"}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant={"outline"}>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </span>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
