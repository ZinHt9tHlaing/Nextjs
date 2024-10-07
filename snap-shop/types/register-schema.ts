import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(4, {
    message: "Please enter a valid username",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Please enter a valid password",
  }),
});
