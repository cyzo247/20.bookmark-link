"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel flex max-w-md flex-col gap-5 rounded-2xl p-6"
    >
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

      <button
        type="submit"
        className="btn-primary flex h-12 items-center justify-center rounded-xl text-[15px] font-bold"
      >
        저장
      </button>
    </form>
  );
}
