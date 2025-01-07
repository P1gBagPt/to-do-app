"use client";

import { SignupForm } from "@/components/signup-form";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
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
        <SignupForm />
      </div>
    </div>
  );
}
