import * as z from "zod";

export const addProductSchema = z.object({
  productId: z.number(),
});

export type addProductSchema = z.infer<typeof addProductSchema>;
