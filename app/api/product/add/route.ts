import { addProductSchema } from "@/app/models/ProductSchema";
import { ConnectDB } from "@/lib/DBConfig";
import ErrorHandler from "@/lib/ErrorHandler";
import { GetDataFromToken } from "@/lib/GetDataFromToken";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const session = await GetDataFromToken(request);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // console.log("uds", session);

    const reqBody = await request.json();
    // console.log("rd", reqBody);

    const parsedRes = addProductSchema.safeParse(reqBody);

    if (!parsedRes.success) {
      return NextResponse.json(
        { message: parsedRes.error.errors },
        { status: 400 }
      );
    }

    const parsedData = parsedRes.data;
    // console.log("parsedData", parsedData);

    await ConnectDB();

    await prismaInstance.product.create({
      data: {
        title: parsedData.title,
        price: +parsedData.price,
        description: parsedData.description,
        category: parsedData.category,
        image: parsedData.image,
        rating: +parsedData.rating,
        User: {
          connect: {
            id: String(session?.id),
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Product Added",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
