import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GetDataFromToken(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
  });
  console.log('sed', session)
  if (!session) return undefined;
  return session;
}
