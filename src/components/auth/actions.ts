"use client";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}
