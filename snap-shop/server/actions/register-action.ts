"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmail } from "./email";

export const registerAction = actionClient
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
        // array ပုံစံနဲ့လာတာ
        const verificationToken = await generateEmailVerificationToken(email);
        // send verification email
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          name.slice(0, 5)
        );

        return { success: "Email verification resent." };
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
    //Todo: Account အသစ်ဖွင့်လည်း userကို verification tokenကို ပို့ပေးရမယ်
    const verificationToken = await generateEmailVerificationToken(email);
    await sendEmail(
      verificationToken[0].email,
      verificationToken[0].token,
      name.slice(0, 5)
    );

    // send verification email
    return { success: "Email verification sent to your email" };
  });
