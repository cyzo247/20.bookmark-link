import type { Bookmark } from "@/app/_lib/mock-data";
import BookmarkDeleteButton from "@/components/BookmarkDeleteButton";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const hostname = getHostname(bookmark.url);

  return (
    <div className="group relative">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card flex flex-col overflow-hidden rounded-2xl"
      >
        {bookmark.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.thumbnail}
            alt=""
            className="h-32 w-full object-cover"
          />
        )}

        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <span className="badge flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase">
              {hostname.charAt(0)}
            </span>
            <span className="truncate text-xs text-[var(--text-sub)]">
              {hostname}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="truncate text-[15px] font-semibold text-[var(--text)]">
              {bookmark.title}
            </h3>
            <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
              {bookmark.description}
            </p>
          </div>
        </div>
      </a>

      <BookmarkDeleteButton bookmark={bookmark} />
    </div>
  );
}
