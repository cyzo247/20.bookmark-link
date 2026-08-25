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
      className="flex max-w-md flex-col gap-5 rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-foreground">
          링크
        </label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="h-10 rounded-md border border-black/[.08] bg-transparent px-3 text-sm text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-foreground/20 dark:border-white/[.145]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-foreground"
        >
          폴더
        </label>
        <select
          id="folder"
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
          className="h-10 rounded-md border border-black/[.08] bg-transparent px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 dark:border-white/[.145]"
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
        className="flex h-10 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        저장
      </button>
    </form>
  );
}
