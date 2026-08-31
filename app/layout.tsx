import type { Metadata } from "next";
import "./globals.css";

// 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경 변수로 덮어쓴다.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Bookmark Link";
const description = "북마크 링크 관리 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/thumbnail.png",
        width: 2400,
        height: 1260,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
