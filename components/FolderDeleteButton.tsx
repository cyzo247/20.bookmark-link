"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import { useFolders } from "@/components/FolderProvider";

export default function FolderDeleteButton({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeFolder } = useFolders();
  const router = useRouter();
  const pathname = usePathname();

  async function handleConfirm() {
    // 삭제가 진행 중이면 중복 클릭을 무시한다.
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await removeFolder(folder.id);
      setIsOpen(false);

      if (pathname === `/folder/${folder.id}`) {
        router.push("/");
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "폴더를 삭제하지 못했습니다.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 삭제`}
        onClick={() => setIsOpen(true)}
        className="folder-action-btn folder-delete-btn flex h-7 w-7 items-center justify-center rounded-lg"
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
        <DeleteFolderModal
          folderName={folder.name}
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
