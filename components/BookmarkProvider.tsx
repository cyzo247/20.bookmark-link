"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Bookmark } from "@/app/_lib/mock-data";
import { useFolders } from "@/components/FolderProvider";

type NewBookmarkInput = Omit<Bookmark, "id">;

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
  removeBookmark: (id: string) => void;
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

  function removeBookmark(id: string) {
    const target = bookmarks.find((bookmark) => bookmark.id === id);
    setBookmarks((current) => current.filter((bookmark) => bookmark.id !== id));

    if (target) {
      updateFolderCount(target.folderId, -1);
    }
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
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
