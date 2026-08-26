"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Bookmark } from "@/app/_lib/mock-data";
import { useFolders } from "@/components/FolderProvider";

type NewBookmarkInput = Omit<Bookmark, "id">;

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

export default function BookmarkProvider({
  initialBookmarks,
  children,
}: {
  initialBookmarks: Bookmark[];
  children: ReactNode;
}) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const { updateFolderCount } = useFolders();

  function addBookmark(input: NewBookmarkInput) {
    setBookmarks((current) => [
      { id: crypto.randomUUID(), ...input },
      ...current,
    ]);
    updateFolderCount(input.folderId, 1);
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
