"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";
import FolderList from "@/components/FolderList";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();
  const isAllActive = pathname === "/";

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4 p-4">
      <Link
        href="/"
        className={`nav-link flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
          isAllActive ? "nav-link-active" : ""
        }`}
      >
        All
        <span className="text-xs text-[var(--text-sub)]">
          {folders.reduce((total, folder) => total + folder.count, 0)}
        </span>
      </Link>

      <FolderList folders={folders} />
    </aside>
  );
}
