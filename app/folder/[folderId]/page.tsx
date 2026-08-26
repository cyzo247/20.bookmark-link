import { notFound } from "next/navigation";
import FolderBookmarks from "@/components/FolderBookmarks";
import { folders } from "@/app/_lib/mock-data";

export default async function FolderPage({
  params,
}: PageProps<"/folder/[folderId]">) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[26px] font-bold text-[var(--text)]">
        {folder.name}
      </h1>
      <FolderBookmarks folderId={folderId} />
    </div>
  );
}
