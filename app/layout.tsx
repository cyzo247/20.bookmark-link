import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderProvider from "@/components/FolderProvider";
import BookmarkProvider from "@/components/BookmarkProvider";
import { bookmarks } from "@/app/_lib/mock-data";
import { getFolders } from "@/app/_lib/folders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Link",
  description: "북마크 링크 관리 서비스",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const folders = await getFolders();

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <FolderProvider initialFolders={folders}>
          <BookmarkProvider initialBookmarks={bookmarks}>
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 px-8 pt-9 pb-8">{children}</main>
            </div>
          </BookmarkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
