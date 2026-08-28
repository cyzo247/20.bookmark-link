"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="nav-link mt-auto flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium disabled:opacity-50"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M10.5 11 14 7.5 10.5 4M14 7.5H6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
