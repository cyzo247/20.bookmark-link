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
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeBookmark } = useBookmarks();

  async function handleConfirm() {
    // 삭제가 진행 중이면 중복 클릭을 무시한다.
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await removeBookmark(bookmark.id);
      setIsOpen(false);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "링크를 삭제하지 못했습니다.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmark.title} 링크 삭제`}
        onClick={() => setIsOpen(true)}
        className="bookmark-action-btn bookmark-delete-btn flex h-8 w-8 items-center justify-center rounded-full"
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
          isDeleting={isDeleting}
          onClose={() => {
            if (!isDeleting) setIsOpen(false);
          }}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
