import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/app/_lib/mock-data";

export default function NewLinkPage() {
  return <NewLinkForm folders={folders} />;
}
