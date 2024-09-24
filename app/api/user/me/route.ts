import { ConnectDB } from "@/lib/DBConfig";
import ErrorHandler from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const session = await GetDataFromToken(request);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ConnectDB();

    const user = await prismaInstance.user.findFirst({
      where: {
        id: String(session?.id),
      },
    });
    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
