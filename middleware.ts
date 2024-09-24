import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log('ses', session)

  const path = req.nextUrl.pathname;
  const publicPaths = new Set(["/login", "/signup"]);
  const isPublicPath = publicPaths.has(path);

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
