"use client";

import { useState } from "react";
import NewFolderModal from "@/components/NewFolderModal";
import { useFolders } from "@/components/FolderProvider";

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { addFolder } = useFolders();

  function handleSave(name: string) {
    addFolder(name);
    setIsOpen(false);
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
        <NewFolderModal onClose={() => setIsOpen(false)} onSave={handleSave} />
      )}
    </>
  );
}
