import BookmarkGrid from "@/components/BookmarkGrid";
import { bookmarks } from "@/app/_lib/mock-data";

export default function Home() {
  return <BookmarkGrid bookmarks={bookmarks} />;
}
