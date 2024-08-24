"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db";

export const checkEmailExists = async (checkEmail: string) => {
  const user = await db.user.findUnique({
    where: {
      email: checkEmail,
    },
  });

  return user ? true : false;
};

export const validateLoginData = async (
  validateEmail: string,
  password: string
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: validateEmail,
      },
    });

    if (!user) {
      console.log("Invalid login credentials.");
      return false;
    }

    const passwordMatch = await bcrypt.compare(password, user?.password!);

    if (!passwordMatch) {
      console.log("Invalid login credentials.");
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
