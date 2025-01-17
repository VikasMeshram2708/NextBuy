import * as z from "zod";

export const addProductSchema = z.object({
  productId: z.number().optional(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.number(),
});

export type addProductSchema = z.infer<typeof addProductSchema>;

export const deleteProductSchema = z.object({
  productId: z.string().uuid(),
});

export type deleteProductSchema = z.infer<typeof deleteProductSchema>;
