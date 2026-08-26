export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
  thumbnail?: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "reading", name: "읽을거리", count: 2 },
];

export const bookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서, App Router와 최신 기능 가이드",
    folderId: "dev",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 기술에 대한 레퍼런스 문서",
    folderId: "dev",
  },
  {
    id: "3",
    title: "GitHub",
    url: "https://github.com",
    description: "코드 저장소 및 협업 플랫폼",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크",
    folderId: "dev",
  },
  {
    id: "5",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "디자인 영감을 얻을 수 있는 쇼케이스",
    folderId: "design",
  },
  {
    id: "6",
    title: "Figma",
    url: "https://figma.com",
    description: "협업 인터페이스 디자인 툴",
    folderId: "design",
  },
  {
    id: "7",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "개발자를 위한 뉴스 커뮤니티",
    folderId: "reading",
  },
  {
    id: "8",
    title: "Smashing Magazine",
    url: "https://smashingmagazine.com",
    description: "웹 디자인/개발 아티클 매거진",
    folderId: "reading",
  },
];
