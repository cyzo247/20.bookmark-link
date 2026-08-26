"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";
import FolderEditButton from "@/components/FolderEditButton";
import FolderDeleteButton from "@/components/FolderDeleteButton";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const href = `/folder/${folder.id}`;
        const isActive = pathname === href;

        return (
          <li key={folder.id} className="group relative">
            <Link
              href={href}
              className={`nav-link flex w-full items-center justify-between rounded-xl px-3 py-2.5 pr-16 text-left text-sm ${
                isActive ? "nav-link-active font-medium" : ""
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
              <span className="folder-count text-xs text-[var(--text-sub)]">
                {folder.count}
              </span>
            </Link>
            <div className="folder-actions absolute inset-y-0 right-2 flex items-center gap-0.5">
              <FolderEditButton folder={folder} />
              <FolderDeleteButton folder={folder} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
