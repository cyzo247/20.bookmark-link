import type { Metadata } from "next";
import AllBookmarks from "@/components/AllBookmarks";

export const metadata: Metadata = {
  title: "전체 북마크",
  description: "저장한 모든 링크를 한눈에 확인하세요.",
};

export default function Home() {
  return <AllBookmarks />;
}
