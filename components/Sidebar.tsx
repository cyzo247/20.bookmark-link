"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";
import FolderList from "@/components/FolderList";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();
  const isAllActive = pathname === "/";

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4 border-r border-black/[.08] p-4 dark:border-white/[.145]">
      <Link
        href="/"
        className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
          isAllActive
            ? "bg-black/[.06] text-foreground dark:bg-white/[.08]"
            : "text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.08]"
        }`}
      >
        All
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {folders.reduce((total, folder) => total + folder.count, 0)}
        </span>
      </Link>

      <FolderList folders={folders} />
    </aside>
  );
}
