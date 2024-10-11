"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailVerificationToken } from "../schema";

const checkEmailVerificationToken = async (email: string) => {
  try {
    const token = await db.query.emailVerificationToken.findFirst({
      where: eq(emailVerificationToken.email, email),
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  // type: Date
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000);

  const existingToken = await checkEmailVerificationToken(email);
  console.log("existingToken => " + existingToken);

  if (existingToken) {
    await db
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken.id, existingToken.id));
  }

  const verificationToken = await db.insert(emailVerificationToken).values({
    email,
    token,
    expires,
  });
  return verificationToken;
};
