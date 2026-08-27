"use client";

import { useState } from "react";
import type { Folder } from "@/app/_lib/mock-data";
import EditFolderModal from "@/components/EditFolderModal";
import { useFolders } from "@/components/FolderProvider";

export default function FolderEditButton({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { renameFolder } = useFolders();

  async function handleSave(name: string) {
    // 저장이 진행 중이면 중복 클릭을 무시한다.
    if (isSaving) return;

    setIsSaving(true);
    try {
      await renameFolder(folder.id, name);
      setIsOpen(false);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "폴더 이름을 수정하지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 이름 수정`}
        onClick={() => setIsOpen(true)}
        className="folder-action-btn flex h-7 w-7 items-center justify-center rounded-lg"
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
        <EditFolderModal
          initialName={folder.name}
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
