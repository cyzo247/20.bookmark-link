import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[.08] px-6 dark:border-white/[.145]">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Bookmark Link
      </Link>

      <Link
        href="/new"
        className="flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
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
    </header>
  );
}
