import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/app/_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[26px] font-bold text-[var(--text)]">새 링크</h1>
      <NewLinkForm folders={folders} />
    </div>
  );
}
