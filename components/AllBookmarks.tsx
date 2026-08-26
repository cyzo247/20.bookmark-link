"use client";

import BookmarkGrid from "@/components/BookmarkGrid";
import { useBookmarks } from "@/components/BookmarkProvider";

export default function AllBookmarks() {
  const { bookmarks } = useBookmarks();
  return <BookmarkGrid bookmarks={bookmarks} />;
}
