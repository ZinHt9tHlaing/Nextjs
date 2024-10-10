"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { username, email, password } }) => {
    // console.log("I am server action => ", username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // check user exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        return { success: "Email verification sent." };
      }
      return { error: "Email is already exists." };
    }
    return { success: "Email verification sent to your email" };
  });
