"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "./auth";
import { LoginSchema, RegisterSchema, TopicSchema } from "@/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "./path";

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
  await signIn("credentials", data);
};

export const createTopicHandler = async (
  formData: z.infer<typeof TopicSchema>
) => {
  const session = await auth();
  const validateData = await TopicSchema.parseAsync(formData);
  console.log(validateData);

  const { name, image, description } = validateData;

  if (!session?.user) {
    throw new Error("You must be logged in to create a topic");
  }

  try {
    await db.topic.create({
      data: {
        name,
        image,
        description,
        creator: session.user.name as string,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong.");
  }
  redirect(paths.SingleTopic(name));
};
