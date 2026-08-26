"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import { useFolders } from "@/components/FolderProvider";

export default function FolderDeleteButton({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeFolder } = useFolders();
  const router = useRouter();
  const pathname = usePathname();

  function handleConfirm() {
    removeFolder(folder.id);
    setIsOpen(false);

    if (pathname === `/folder/${folder.id}`) {
      router.push("/");
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 삭제`}
        onClick={() => setIsOpen(true)}
        className="folder-delete-btn absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg"
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
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
