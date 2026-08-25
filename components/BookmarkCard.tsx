import type { Bookmark } from "@/app/_lib/mock-data";

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
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-black/[.08] p-4 transition-colors hover:border-black/[.15] hover:bg-black/[.02] dark:border-white/[.145] dark:hover:border-white/[.25] dark:hover:bg-white/[.04]"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[.06] text-xs font-semibold uppercase text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          {hostname.charAt(0)}
        </span>
        <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {hostname}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="truncate text-sm font-medium text-foreground">
          {bookmark.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {bookmark.description}
        </p>
      </div>
    </a>
  );
}
