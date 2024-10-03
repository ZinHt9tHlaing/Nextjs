"use server";

import { db } from "@/server";
import { todo } from "./schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const readData = async () => {
  const todos = await db.query.todo.findMany();

  if (!todos) {
    return { error: "No todos found." };
  }
  return { success: todos };
};

export const createData = async (formData: FormData) => {
  const todoTitle = formData.get("todoTitle") as string;
  if (!todoTitle) {
    throw new Error("No todo title found.");
  }
  await db.insert(todo).values({ title: todoTitle });
  revalidatePath("/");
};

export const deleteData = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  if (!id) {
    throw new Error("No id found.");
  }
  await db.delete(todo).where(eq(todo.id, id));
  revalidatePath("/");
};

export const updateData = async (formData: FormData) => {
  const todoTitle = formData.get("title") as string;
  const todoID = Number(formData.get("id"));

  if (!todoTitle) {
    throw new Error("No todo title found.");
  }
  await db.update(todo).set({ title: todoTitle }).where(eq(todo.id, todoID));
  redirect("/");
};
