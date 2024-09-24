import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
  });

  // console.log("session-mid", session);

  const { pathname } = req.nextUrl;

  const publicPaths = new Set(["/login", "/signup"]);

  const isPublicPath = publicPaths.has(pathname);

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/user/profile"],
};
