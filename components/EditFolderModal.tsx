"use client";

import { useState } from "react";

export default function EditFolderModal({
  initialName,
  isSaving = false,
  onClose,
  onSave,
}: {
  initialName: string;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState(initialName);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 저장 중에는 추가 제출을 막는다.
    if (isSaving) return;
    if (!name.trim()) return;
    onSave(name);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="panel flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6"
      >
        <h2 className="text-[20px] font-bold text-[var(--text)]">
          폴더 이름 수정
        </h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-folder-name"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="edit-folder-name"
            type="text"
            autoFocus
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="btn-secondary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold disabled:opacity-50"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
