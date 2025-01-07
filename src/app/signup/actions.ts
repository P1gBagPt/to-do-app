"use client";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { SignupFormData } from "@/types/auth";

export async function signup(formData: SignupFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    redirect("/error");
  }

  redirect("/");
}
