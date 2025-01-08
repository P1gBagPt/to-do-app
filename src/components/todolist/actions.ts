"use client";

import { TodoListCreatePostModel } from "@/types/todolist";
import { createClient } from "@/utils/supabase/client";

export async function todoListAction(formData: TodoListCreatePostModel) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const { title, description, state } = formData;

  const { error } = await supabase
    .from("tasks")
    .insert([{ userId: user.data.user?.id, title, description, state }]);

  if (error) throw error;
}

export async function getAllTasks() {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("userId", user.data.user?.id);

  console.log(error);
  if (error) throw error;

  return data;
}
