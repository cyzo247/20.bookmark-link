"use client";

import { useState } from "react";
import NewFolderModal from "@/components/NewFolderModal";
import { useFolders } from "@/components/FolderProvider";

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { addFolder } = useFolders();

  async function handleSave(name: string) {
    // 저장이 진행 중이면 중복 클릭을 무시한다.
    if (isSaving) return;

    setIsSaving(true);
    try {
      await addFolder(name);
      setIsOpen(false);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "폴더를 추가하지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-secondary flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 1v12M1 7h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        새 폴더
      </button>

      {isOpen && (
        <NewFolderModal
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
