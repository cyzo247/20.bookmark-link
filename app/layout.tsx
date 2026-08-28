import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Link",
  description: "북마크 링크 관리 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
