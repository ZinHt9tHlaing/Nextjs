import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(4, {
    message: "Please must be at least 4 characters.",
  }),
  token: z.string().optional().nullable(),
});
