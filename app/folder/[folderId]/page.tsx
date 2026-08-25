import { notFound } from "next/navigation";
import BookmarkGrid from "@/components/BookmarkGrid";
import { bookmarks, folders } from "@/app/_lib/mock-data";

export default async function FolderPage({
  params,
}: PageProps<"/folder/[folderId]">) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId,
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-foreground">{folder.name}</h1>
      <BookmarkGrid bookmarks={folderBookmarks} />
    </div>
  );
}
