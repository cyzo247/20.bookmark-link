"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/mock-data";
import { useFolders } from "@/components/FolderProvider";

type BookmarkUpdateInput = {
  folderId: string;
  title: string;
  description: string;
};

export default function EditBookmarkModal({
  bookmark,
  onClose,
  onSave,
}: {
  bookmark: Bookmark;
  onClose: () => void;
  onSave: (updates: BookmarkUpdateInput) => void;
}) {
  const { folders } = useFolders();
  const [folderId, setFolderId] = useState(bookmark.folderId);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    onSave({ folderId, title, description });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="panel flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6"
      >
        <h2 className="text-[20px] font-bold text-[var(--text)]">
          링크 수정
        </h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-bookmark-folder"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더
          </label>
          <select
            id="edit-bookmark-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-bookmark-title"
            className="text-sm font-medium text-[var(--text)]"
          >
            제목
          </label>
          <input
            id="edit-bookmark-title"
            type="text"
            autoFocus
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-bookmark-description"
            className="text-sm font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-bookmark-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="input-field resize-none rounded-xl px-4 py-3 text-[15px]"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold"
          >
            취소
          </button>
          <button
            type="submit"
            className="btn-primary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
