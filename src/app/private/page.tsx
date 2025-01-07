import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
