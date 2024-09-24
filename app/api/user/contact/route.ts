import { ContactSchema } from "@/app/models/ContactSchema";
import { ConnectDB } from "@/lib/DBConfig";
import ErrorHandler from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { subject, email, message } = reqBody;

    const contactResult = ContactSchema.safeParse({ subject, email, message });

    if (!contactResult.success) {
      throw new Error(contactResult?.error?.message || "Invalid Data");
    }

    const validatedData = contactResult.data;

    await ConnectDB();

    await prismaInstance.contact.create({
      data: {
        subject: validatedData.subject,
        email: validatedData.email,
        message: validatedData.message,
      },
    });

    return NextResponse.json(
      {
        message: "Form Submitted.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
