"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FolderList from "@/components/FolderList";
import LogoutButton from "@/components/LogoutButton";
import { useFolders } from "@/components/FolderProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();
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

      <LogoutButton />
    </aside>
  );
}
