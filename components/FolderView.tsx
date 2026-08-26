"use client";

import { useFolders } from "@/components/FolderProvider";
import FolderBookmarks from "@/components/FolderBookmarks";

export default function FolderView({ folderId }: { folderId: string }) {
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    return (
      <div className="flex flex-col items-center gap-1 py-20 text-center">
        <p className="text-[17px] font-semibold text-[var(--text)]">
          폴더를 찾을 수 없습니다.
        </p>
        <p className="text-sm text-[var(--text-sub)]">
          삭제되었거나 존재하지 않는 폴더예요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[26px] font-bold text-[var(--text)]">
        {folder.name}
      </h1>
      <FolderBookmarks folderId={folderId} />
    </div>
  );
}
