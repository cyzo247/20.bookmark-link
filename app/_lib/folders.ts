import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Folder } from "@/app/_lib/mock-data";

// Supabase folders 테이블에서 로그인한 사용자의 폴더 목록을 불러온다.
export async function getFolders(userId: string): Promise<Folder[]> {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("폴더 목록을 불러오지 못했습니다:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: String(row.id),
    name: row.name,
    count: 0,
  }));
}
