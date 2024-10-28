"use server";

import { settingsSchema, twoFactorSchema } from "@/types/settings-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { revalidatePath } from "next/cache";

export const updateDisplayNameAction = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    if (!name) {
      return { error: "Invalid name." };
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "User not found" };
    }

    await db.update(users).set({ name }).where(eq(users.email, email));
    revalidatePath("/dashboard/settings");
    return { success: "Display name updated" };
  });

export const twoFactorToggler = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: { isTwoFactorEnabled, email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Something went wrong" };
    }

    await db
      .update(users)
      .set({ isTwoFactorEnabled })
      .where(eq(users.email, email));

    revalidatePath("/dashboard/settings");
    return { success: "2FA Setting Saved" };
  });
