import { newUserSchema } from "@/app/models/UserSchema";
import { ConnectDB } from "@/lib/DBConfig";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import ErrorHandler from "@/lib/ErrorHandler";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    // Sanitize the incoming data
    const parsedRes = newUserSchema.safeParse(reqBody);

    if (!parsedRes.success) {
      throw new Error(parsedRes?.error?.message || "Invalid Data");
    }

    const parsedData = parsedRes.data;

    // connect db
    await ConnectDB();

    // validate email
    const user = await prismaInstance.user.findFirst({
      where: {
        email: parsedData?.email,
      },
    });

    if (user) {
      throw new Error("User Already Registered");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);
    await prismaInstance.user.create({
      data: {
        username: parsedData?.username,
        email: parsedData?.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        message: "User Registered",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
