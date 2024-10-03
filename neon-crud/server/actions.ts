"use server";

import { db } from "@/server";
import { posts, todo } from "./schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getPosts = async () => {
  const posts = await db.query.posts.findMany();

  if (!posts) {
    return { error: "No posts found." };
  }
  return { success: posts };
};

export const getDetailPost = async (id: number) => {
  const post = await db.query.posts.findFirst({ where: eq(posts.id, id) });
  if (!post) {
    redirect("/");
  }
  return post;
};

export const createPost = async (formData: FormData) => {
  const postTitle = formData.get("title") as string;
  const postDescription = formData.get("description") as string;
  if (!postTitle || !postDescription) {
    throw new Error("Invalid data format.");
  }
  await db
    .insert(posts)
    .values({ title: postTitle, description: postDescription });
  revalidatePath("/");
  redirect("/");
};

export const deletePost = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  if (!id) {
    throw new Error("No id found.");
  }
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/");
  redirect("/");
};

export const updatePost = async (formData: FormData) => {
  const postTitle = formData.get("title") as string;
  const postDescription = formData.get("description") as string;
  const postID = Number(formData.get("id"));

  if (!postTitle || !postDescription || !postID) {
    throw new Error("Invalid Post data.");
  }
  await db
    .update(posts)
    .set({ title: postTitle, description: postDescription })
    .where(eq(posts.id, postID));
  revalidatePath("/");
  redirect("/");
};
