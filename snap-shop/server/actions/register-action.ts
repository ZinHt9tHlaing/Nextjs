"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { username, email, password } }) => {
    console.log("I am server action => ", username, email, password);
    return {
      success: "Successfully logged in",
    };
  });
