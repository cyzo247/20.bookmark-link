"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const href = `/folder/${folder.id}`;
        const isActive = pathname === href;

        return (
          <li key={folder.id}>
            <Link
              href={href}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "bg-black/[.06] font-medium text-foreground dark:bg-white/[.08]"
                  : "text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.08]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 3.5A1 1 0 0 1 2.5 2.5h3l1.2 1.6h5.8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                {folder.name}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {folder.count}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
