"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation instead of next/router
import ToDoList from "@/components/todolist/page";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push("/login");
      }
    };

    if (isClient) {
      checkUser();
    }
  }, [router, isClient]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <div>
        <h1 className="font-semibold text-2xl">Todos</h1>
      </div>
      <ToDoList />
    </main>
  );
}
