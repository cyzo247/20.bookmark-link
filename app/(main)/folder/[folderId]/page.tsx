import FolderView from "@/components/FolderView";

export default async function FolderPage({
  params,
}: PageProps<"/folder/[folderId]">) {
  const { folderId } = await params;

  return <FolderView folderId={folderId} />;
}
