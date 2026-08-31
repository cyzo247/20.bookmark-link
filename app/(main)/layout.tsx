import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderProvider from "@/components/FolderProvider";
import BookmarkProvider from "@/components/BookmarkProvider";
import AuthSync from "@/components/AuthSync";
import { createClient } from "@/utils/supabase/server";
import { getFolders } from "@/app/_lib/folders";
import { getLinks } from "@/app/_lib/links";

export default async function MainLayout({ children }: LayoutProps<"/">) {
  // 로그인한 사용자만 접근할 수 있다. (미들웨어 보호에 대한 서버 측 2차 방어)
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [folderList, bookmarks] = await Promise.all([
    getFolders(user.id),
    getLinks(user.id),
  ]);
  // 사이드바 폴더 카운트를 불러온 링크 기준으로 채운다.
  const folders = folderList.map((folder) => ({
    ...folder,
    count: bookmarks.filter((bookmark) => bookmark.folderId === folder.id).length,
  }));

  return (
    <>
      <AuthSync userId={user.id} />
      {/* 계정이 바뀌면 key가 달라져 아래 트리를 새 데이터로 다시 마운트한다. */}
      <FolderProvider key={user.id} initialFolders={folders}>
        <BookmarkProvider initialBookmarks={bookmarks}>
          <div className="flex min-h-full flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 px-8 pt-9 pb-8">{children}</main>
            </div>
          </div>
        </BookmarkProvider>
      </FolderProvider>
    </>
  );
}
