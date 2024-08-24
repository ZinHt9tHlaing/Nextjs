import { z } from "zod";
import { checkEmailExists, validateLoginData } from "./utils";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your name first.",
    }),
    email: z
      .string()
      .email({
        message: "Please enter a valid email address.",
      })
      .refine(
        async (email) => {
          const emailExists = await checkEmailExists(email);

          if (emailExists) {
            return false;
          }
          return true;
        },
        {
          message: "Email already exists in record.",
        }
      ),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Please enter a valid email address.",
      })
      .refine(
        async (email) => {
          const emailExists = await checkEmailExists(email);

          if (emailExists) {
            return true;
          }
          return false;
        },
        {
          message: "Email doesn't exist in record.",
        }
      ),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  })
  .refine(
    async (data) => {
      const isMatch = await validateLoginData(data.email, data.password);
      if (isMatch) {
        return true;
      }
      return false;
    },
    {
      message: "Invalid login credentials.",
      path: ["password"],
    }
  );
