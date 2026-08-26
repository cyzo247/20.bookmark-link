import { NextResponse } from "next/server";
import type { OgResult } from "@/app/_lib/og";

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function getMetaTagsMap(html: string) {
  const map = new Map<string, string>();
  const metaTags = html.match(/<meta\s+[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const attrs: Record<string, string> = {};
    const attrRegex = /([a-zA-Z0-9:_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let match: RegExpExecArray | null;
    while ((match = attrRegex.exec(tag))) {
      attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
    }

    const key = attrs.property ?? attrs.name;
    if (key && attrs.content !== undefined) {
      map.set(key.toLowerCase(), attrs.content);
    }
  }

  return map;
}

function getTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      { error: "url query parameter is required" },
      { status: 400 },
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  let html: string;
  try {
    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkLinkBot/1.0)",
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "failed to fetch url" },
        { status: 502 },
      );
    }

    html = await response.text();
  } catch {
    return NextResponse.json(
      { error: "failed to fetch url" },
      { status: 502 },
    );
  }

  const meta = getMetaTagsMap(html);
  const rawTitle = meta.get("og:title") ?? getTitleTag(html);
  const rawDescription =
    meta.get("og:description") ?? meta.get("description") ?? "";
  const rawImage = meta.get("og:image") ?? meta.get("twitter:image") ?? null;

  let thumbnail: string | null = null;
  if (rawImage) {
    try {
      thumbnail = new URL(rawImage, targetUrl).toString();
    } catch {
      thumbnail = null;
    }
  }

  const result: OgResult = {
    title: rawTitle ? decodeHtmlEntities(rawTitle) : targetUrl.hostname,
    description: decodeHtmlEntities(rawDescription),
    thumbnail,
    url: targetUrl.toString(),
  };

  return NextResponse.json(result);
}
