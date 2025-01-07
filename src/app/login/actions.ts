"use client";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { SignInFormData } from "@/types/auth";

export async function loginAction(formData: SignInFormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  console.log("login nice", data);

  if (error) {
    redirect("/error");
  }

  redirect("/");
}
