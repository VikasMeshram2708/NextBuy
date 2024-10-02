import { deleteProductSchema } from "@/app/models/ProductSchema";
import { ConnectDB } from "@/lib/DBConfig";
import ErrorHandler from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = deleteProductSchema.safeParse(reqBody);

    if (!parsedRes.success) {
      return NextResponse.json(
        { message: parsedRes.error.errors },
        { status: 400 }
      );
    }

    const parsedData = parsedRes.data;

    await ConnectDB();
    
    await prismaInstance.product.delete({
      where: {
        id: String(parsedData?.productId),
      },
    });

    return NextResponse.json(
      {
        message: "Product Deleted",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
