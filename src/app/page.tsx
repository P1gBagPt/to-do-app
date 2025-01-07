"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/auth/logout";

// import Todos from "@/components/todos/todos";
// import ClearActions from "@/components/todos/clear-actions";
// import SignOutButton from "@/components/auth/signout-button";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  console.log("2 data", data);
  if (error || !data?.user) {
    console.log("2");
    redirect("/login");
  }
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col max-w-2xl border rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-4 pb-4">
          {/* <CheckCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" /> */}
          <h1 className="font-semibold text-2xl">Todos</h1>
        </div>
        {/* <Todos /> */}
        {/* <ClearActions /> */}
      </div>
      <SignOutButton />
    </main>
  );
}
