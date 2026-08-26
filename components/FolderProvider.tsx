"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/app/_lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
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

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((current) => [
      ...current,
      { id: crypto.randomUUID(), name: trimmed, count: 0 },
    ]);
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
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
