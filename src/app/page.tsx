"use client";

import { createClient } from "@/utils/supabase/client";
import SignOutButton from "@/components/auth/logout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation instead of next/router

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Ensuring the component is mounted on the client
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
      <div className="flex flex-col max-w-2xl border rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-4 pb-4">
          <h1 className="font-semibold text-2xl">Todos</h1>
        </div>
      </div>
      <SignOutButton />
    </main>
  );
}
