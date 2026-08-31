"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// 로그인 계정이 바뀌면(다른 탭에서의 로그인/로그아웃 등) 서버 데이터를 다시 불러온다.
export default function AuthSync({ userId }: { userId: string }) {
  const router = useRouter();
  const userIdRef = useRef(userId);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if ((session?.user.id ?? null) !== userIdRef.current) {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
