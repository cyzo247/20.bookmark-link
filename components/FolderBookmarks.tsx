"use client";

import BookmarkGrid from "@/components/BookmarkGrid";
import { useBookmarks } from "@/components/BookmarkProvider";

export default function FolderBookmarks({ folderId }: { folderId: string }) {
  const { bookmarks } = useBookmarks();
  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId,
  );

  return <BookmarkGrid bookmarks={folderBookmarks} />;
}
