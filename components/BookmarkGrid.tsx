import type { Bookmark } from "@/app/_lib/mock-data";
import BookmarkCard from "@/components/BookmarkCard";

export default function BookmarkGrid({ bookmarks }: { bookmarks: Bookmark[] }) {
  if (bookmarks.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-[var(--text-sub)]">
        등록된 링크가 없습니다.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
