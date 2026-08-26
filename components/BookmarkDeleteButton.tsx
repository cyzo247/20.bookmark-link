"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/mock-data";
import DeleteBookmarkModal from "@/components/DeleteBookmarkModal";
import { useBookmarks } from "@/components/BookmarkProvider";

export default function BookmarkDeleteButton({
  bookmark,
}: {
  bookmark: Bookmark;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeBookmark } = useBookmarks();

  function handleConfirm() {
    removeBookmark(bookmark.id);
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmark.title} 링크 삭제`}
        onClick={() => setIsOpen(true)}
        className="bookmark-delete-btn absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 3.5h9M5.5 3.5V2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4 3.5l.5 8a1 1 0 0 0 1 .9h3a1 1 0 0 0 1-.9l.5-8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <DeleteBookmarkModal
          bookmarkTitle={bookmark.title}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
