import Link from "next/link";
import NewFolderButton from "@/components/NewFolderButton";

export default function Header() {
  return (
    <header className="app-header flex h-14 shrink-0 items-center justify-between px-5">
      <Link
        href="/"
        className="text-[20px] font-bold tracking-tight text-[var(--text)]"
      >
        Bookmark Link
      </Link>

      <div className="flex items-center gap-2">
        <NewFolderButton />

        <Link
          href="/new"
          className="btn-primary flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          새 링크
        </Link>
      </div>
    </header>
  );
}
