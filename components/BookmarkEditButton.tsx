"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/mock-data";
import EditBookmarkModal from "@/components/EditBookmarkModal";
import { useBookmarks } from "@/components/BookmarkProvider";

type BookmarkUpdateInput = {
  folderId: string;
  title: string;
  description: string;
};

export default function BookmarkEditButton({
  bookmark,
}: {
  bookmark: Bookmark;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { updateBookmark } = useBookmarks();

  async function handleSave(updates: BookmarkUpdateInput) {
    // 저장이 진행 중이면 중복 클릭을 무시한다.
    if (isSaving) return;

    setIsSaving(true);
    try {
      await updateBookmark(bookmark.id, updates);
      setIsOpen(false);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "링크를 수정하지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmark.title} 링크 수정`}
        onClick={() => setIsOpen(true)}
        className="bookmark-action-btn flex h-8 w-8 items-center justify-center rounded-full"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9.5 1.5 12.5 4.5 4.5 12.5H1.5v-3L9.5 1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <EditBookmarkModal
          bookmark={bookmark}
          isSaving={isSaving}
          onClose={() => {
            if (!isSaving) setIsOpen(false);
          }}
          onSave={handleSave}
        />
      )}
    </>
  );
}
