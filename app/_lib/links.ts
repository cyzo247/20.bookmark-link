import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Bookmark } from "@/app/_lib/mock-data";

// Supabase links 테이블에서 로그인한 사용자의 링크 목록을 불러온다. (최신순)
export async function getLinks(userId: string): Promise<Bookmark[]> {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("links")
    .select("id, url, title, description, thumbnail_url, folder_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("링크 목록을 불러오지 못했습니다:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    folderId: row.folder_id != null ? String(row.folder_id) : "",
    thumbnail: row.thumbnail_url ?? undefined,
  }));
}
