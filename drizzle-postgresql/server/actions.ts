"use server";

import { db } from "@/server";
import { todos } from "./schema";
import { revalidatePath } from "next/cache";

export const readData = async () => {
  const todos = await db.query.todos.findMany();
  if (!todos) {
    return { error: "No todos found" };
  }
  return { success: todos };
};

export const createData = async (formData: FormData) => {
  const todoTitle = formData.get("todoTitle")?.toString();
  if (!todoTitle) {
    return { error: "No todo title found." };
  }
  await db.insert(todos).values({ title: todoTitle });
  revalidatePath("/");
  return { success: "Todo created." };
};
