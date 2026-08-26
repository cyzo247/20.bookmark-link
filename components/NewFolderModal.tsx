"use client";

import { useState } from "react";

export default function NewFolderModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    onSave(name);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="panel flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6"
      >
        <h2 className="text-[20px] font-bold text-[var(--text)]">새 폴더</h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="folder-name"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
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
