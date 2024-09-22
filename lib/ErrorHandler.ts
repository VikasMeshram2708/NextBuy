import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export default function ErrorHandler(request: NextRequest, error: Error) {
  if (error instanceof PrismaClientKnownRequestError) {
    let message;
    switch (error.code) {
      case "P2002":
        const uniqueMeta = error.meta as { target?: unknown };
        const target = Array.isArray(uniqueMeta.target)
          ? uniqueMeta.target
          : [uniqueMeta.target];
        message = `Unique constraint failed on ${target.join(", ")}`;
        break;
      case "P2003": // Foreign key constraint failed
        const foreignKeyMeta = error.meta as { field_name?: string };
        message = `Foreign key constraint failed: ${
          foreignKeyMeta.field_name || "unknown field"
        }`;
        break;
      case "P2025": // Record not found
        const notFoundMeta = error.meta as { model?: string };
        message = `Record not found for ${
          notFoundMeta.model || "unknown model"
        }`;
        break;
      default:
        message = error.message;
    }

    return NextResponse.json(
      {
        message,
      },
      {
        status: 422,
      }
    );
  }

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json(
      {
        errors: formattedErrors,
      },
      {
        status: 422,
      }
    );
  }

  return NextResponse.json(
    {
      message: error.message || "An unexpected error occurred.",
    },
    {
      status: 500,
    }
  );
}
