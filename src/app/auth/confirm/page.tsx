"use client";

import React, { useEffect, useState, Suspense } from "react"; // Add Suspense import
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const ConfirmEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Confirming Email...');
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");
      const next = searchParams.get("next") ?? "/";

      if (token_hash && type) {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.verifyOtp({
          type: "email",
          token_hash,
        });

        if (!error) {
          setStatus("Email confirmed! Logining you in...");
          setEmail(data?.user?.user_metadata?.email || "User");
          setTimeout(() => router.push(next), 3000);
        } else {
          setStatus("Error confirming email. Please try again.");
        }
      } else {
        setStatus("Error confirming email. Please try again.");
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-8 mt-11 py-12 md:mb-48">
      <div className=""></div>
      <h1 className="text-3xl font-semibold mt-4 sm:mt-6">{status}</h1>
      {email && (
        <p className="mt-2 text-2xl">
          <strong className="text-[#0BBF64]">{email} </strong>
          your email has been successfully confirmed!
        </p>
      )}
    </div>
  );
};

// Wrap ConfirmEmailPage with Suspense
export default function SuspendedConfirmEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailPage />
    </Suspense>
  );
}
