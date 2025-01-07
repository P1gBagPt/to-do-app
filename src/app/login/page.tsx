'use client';

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        router.push("/");
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
