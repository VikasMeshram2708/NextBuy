import * as z from "zod";

export const ContactSchema = z.object({
  subject: z
    .string()
    .min(1, {
      message: "Subject is required",
    })
    .max(120, {
      message: "Subject must be less than 20 characters",
    }),
  email: z.string().email(),
  message: z
    .string()
    .min(1, {
      message: "Message is required",
    })
    .max(150, {
      message: "Message must be less than 150 characters",
    }),
});

export type ContactSchema = z.infer<typeof ContactSchema>;
