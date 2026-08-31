import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import FolderView from "@/components/FolderView";

export async function generateMetadata({
  params,
}: PageProps<"/folder/[folderId]">): Promise<Metadata> {
  const { folderId } = await params;
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { title: "폴더" };
  }

  const { data: folder } = await supabase
    .from("folders")
    .select("name")
    .eq("id", folderId)
    .eq("user_id", user.id)
    .single();

  return { title: folder?.name ?? "폴더" };
}

export default async function FolderPage({
  params,
}: PageProps<"/folder/[folderId]">) {
  const { folderId } = await params;

  return <FolderView folderId={folderId} />;
}
