"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    // console.log("I am server action => ", ိ, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    // check user exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        // send verification email

        return { success: "Email verification resent to your email." };
      }
      return { error: "Email is already exists." };
    }

    // create user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    // generate verification token for email expires in 30 minutes
    const verificationToken = await generateEmailVerificationToken(email);
    console.log(verificationToken);

    // send verification email
    return { success: "Email verification sent to your email" };
  });
