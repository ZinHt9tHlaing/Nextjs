"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "./auth";
import { DiscussSchema, LoginSchema, PostSchema, RegisterSchema, TopicSchema } from "@/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "./path";
import { Post, Topic } from "@prisma/client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

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

  redirect(DEFAULT_LOGIN_REDIRECT);
};

export const loginHandler = async (data: z.infer<typeof LoginSchema>) => {
  await signIn("credentials", data);
};

export const createTopicHandler = async (
  formData: z.infer<typeof TopicSchema>
) => {
  const session = await auth();
  const validateData = await TopicSchema.parseAsync(formData);
  // console.log(validateData);

  const { name, image, description } = validateData;

  if (!session?.user) {
    throw new Error("You must be logged in to create a topic");
  }

  let topic: Topic;

  try {
    topic = await db.topic.create({
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
  redirect(paths.SingleTopic(topic.id));
};

export const createPostHandler = async (data: z.infer<typeof PostSchema>) => {
  const session = await auth();

  const validateData = await PostSchema.parseAsync(data);
  // console.log(validateData);

  const { title, content, topicId } = validateData;

  if (!session?.user) {
    throw new Error("You must be logged in to create a topic");
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title,
        content,
        topicId,
        userId: session.user.id as string,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong.");
  }
  redirect(paths.SinglePost(topicId, post.id));
};

export const createCommentHandler = async (
  data: z.infer<typeof DiscussSchema>
) => {
  const session = await auth();
}