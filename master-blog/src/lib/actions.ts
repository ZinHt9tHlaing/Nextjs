"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "./auth";
import { LoginSchema, RegisterSchema } from "@/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleGithubLogout = async () => {
  await signOut();
};

export const registerHandler = async (data: z.infer<typeof RegisterSchema>) => {
  const validateData = await RegisterSchema.parseAsync(data);

  const { name, email, password } = validateData;
  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  redirect("/");
};

export const loginHandler = async (data: z.infer<typeof LoginSchema>) => {
  await signIn("credentials", data)
}