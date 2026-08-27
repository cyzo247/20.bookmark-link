"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/app/_lib/mock-data";
import { createClient } from "@/utils/supabase/client";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;
  updateFolderCount: (id: string, delta: number) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export default function FolderProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: ReactNode;
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  async function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name: trimmed })
      .select("id, name")
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? "폴더를 추가하지 못했습니다.");
    }

    setFolders((current) => [
      ...current,
      { id: String(data.id), name: data.name, count: 0 },
    ]);
  }

  async function renameFolder(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id)
      .select("id, name")
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? "폴더 이름을 수정하지 못했습니다.");
    }

    setFolders((current) =>
      current.map((folder) =>
        folder.id === id ? { ...folder, name: data.name } : folder,
      ),
    );
  }

  async function removeFolder(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) {
      throw new Error(error.message ?? "폴더를 삭제하지 못했습니다.");
    }

    setFolders((current) => current.filter((folder) => folder.id !== id));
  }

  function updateFolderCount(id: string, delta: number) {
    setFolders((current) =>
      current.map((folder) =>
        folder.id === id ? { ...folder, count: folder.count + delta } : folder,
      ),
    );
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        renameFolder,
        removeFolder,
        updateFolderCount,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
