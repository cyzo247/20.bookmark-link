import Link from "next/link";
import NewFolderButton from "@/components/NewFolderButton";
import NewLinkButton from "@/components/NewLinkButton";

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
        <NewLinkButton />
      </div>
    </header>
  );
}
