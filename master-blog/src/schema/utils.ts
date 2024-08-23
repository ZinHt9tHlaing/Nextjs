"use server";

import { db } from "@/db";

export const checkEmailExists = async (checkEmail: string) => {
  const user = await db.user.findUnique({
    where: {
      email: checkEmail,
    },
  });

  return user ? true : false;
};
