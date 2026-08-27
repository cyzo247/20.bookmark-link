"use client";

import { useState } from "react";
import { useFolders } from "@/components/FolderProvider";
import { useBookmarks } from "@/components/BookmarkProvider";
import type { OgResult } from "@/app/_lib/og";

export default function NewLinkModal({ onClose }: { onClose: () => void }) {
  const { folders } = useFolders();
  const { addBookmark } = useBookmarks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim() || !folderId || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/og?url=${encodeURIComponent(url.trim())}`,
      );

      if (!response.ok) {
        throw new Error("failed to fetch og data");
      }

      const og: OgResult = await response.json();

      await addBookmark({
        title: og.title,
        url: og.url,
        description: og.description,
        thumbnail: og.thumbnail ?? undefined,
        folderId,
      });

      onClose();
    } catch {
      setError("링크를 추가하지 못했습니다. 주소를 다시 확인해 주세요.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="panel flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6"
      >
        <h2 className="text-[20px] font-bold text-[var(--text)]">새 링크</h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="url"
            className="text-sm font-medium text-[var(--text)]"
          >
            링크
          </label>
          <input
            id="url"
            type="url"
            autoFocus
            required
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="folder"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더
          </label>
          <select
            id="folder"
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

        {error && <p className="text-sm text-[var(--error)]">{error}</p>}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="btn-secondary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold disabled:opacity-60"
          >
            {isSubmitting ? "가져오는 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
