// src/pages/api/douyin.json.ts
// Drop this file at:  src/pages/api/douyin.json.ts
//
// Calls the universalDownloader Express API at /api/douyin/download
// and normalises the response into the same shape InputScreen / ResultSection expect.
//
// Set the env-var UNIVERSAL_DOWNLOADER_URL in your Vercel project settings
// (or .env.local for local dev) to point at your running universalDownloader instance.
// e.g.  UNIVERSAL_DOWNLOADER_URL=https://your-api.vercel.app
//       UNIVERSAL_DOWNLOADER_URL=http://localhost:3000   (local dev)

import type { APIRoute } from "astro";

export const prerender = false;

// ─── Types ────────────────────────────────────────────────────────────────────

interface DouyinLink {
  label: string;
  url: string;
}

interface DouyinServiceResponse {
  success: boolean;
  data?: {
    title: string | null;
    duration: string | null;
    thumbnail: string | null;
    preview: string | null;      // direct video preview src from tikvideo.app
    links: DouyinLink[];         // [{label, url}]  e.g. "Download MP4 HD"
  };
  error?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Validate the URL looks like a Douyin link */
function isDouyinUrl(url: string): boolean {
  return /douyin\.com|iesdouyin\.com/i.test(url);
}

/**
 * Pick the best video URL from the links array.
 * Priority: HD → any mp4 → first link available.
 */
function pickBestVideoUrl(links: DouyinLink[]): string | null {
  if (!links || links.length === 0) return null;

  const hd = links.find(l => l.label.toLowerCase().includes("hd"));
  if (hd) return hd.url;

  const mp4 = links.find(l => l.label.toLowerCase().includes("mp4"));
  if (mp4) return mp4.url;

  return links[0]?.url ?? null;
}

/** Resolve the base URL of the universalDownloader API */
function apiBase(): string {
  const base = import.meta.env.UNIVERSAL_DOWNLOADER_URL;
  if (!base) {
    // If the env-var is not set we default to localhost for local dev.
    // On Vercel you MUST set UNIVERSAL_DOWNLOADER_URL.
    console.warn(
      "[douyin.json.ts] UNIVERSAL_DOWNLOADER_URL is not set – falling back to http://localhost:3000"
    );
    return "http://localhost:3000";
  }
  return base.replace(/\/$/, ""); // strip trailing slash
}

// ─── Route handler ────────────────────────────────────────────────────────────

export const GET: APIRoute = async ({ request, url: requestUrl }) => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=300",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    const url = requestUrl.searchParams.get("url");

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL parameter is required", status: "error" }),
        { status: 400, headers }
      );
    }

    if (!isDouyinUrl(url)) {
      return new Response(
        JSON.stringify({
          error: "Invalid URL. Please provide a valid Douyin URL.",
          status: "error",
        }),
        { status: 400, headers }
      );
    }

    // ── Call the universalDownloader Express API ─────────────────────────────
    const apiUrl = `${apiBase()}/api/douyin/download?url=${encodeURIComponent(url)}`;
    console.log("[douyin.json.ts] Fetching:", apiUrl);

    const upstream = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!upstream.ok) {
      throw new Error(`Upstream API returned HTTP ${upstream.status}`);
    }

    const json: DouyinServiceResponse = await upstream.json();

    if (!json.success || !json.data) {
      throw new Error(json.error || "Upstream returned no data");
    }

    const { title, duration, thumbnail, preview, links } = json.data;

    // ── Normalise into the shape the frontend components expect ──────────────
    //
    // We reuse the same result shape as the TikTok endpoint so we can reuse
    // ResultSection / InputScreen with minimal changes.
    //
    //  videoSD         → best clean download link
    //  videoHD         → HD download link (may be same as SD if none available)
    //  videoWatermark  → not provided by Douyin scraper → null
    //  music           → not provided by Douyin scraper → null
    //  preview         → the tikvideo.app #vid data-src (useful for <video> tag)
    //  links           → full original links array forwarded for custom rendering

    const bestUrl = pickBestVideoUrl(links);

    const hdLink = links.find(l => l.label.toLowerCase().includes("hd"));
    const sdLink = links.find(
      l => !l.label.toLowerCase().includes("hd") && l.label.toLowerCase().includes("mp4")
    );

    const normalised = {
      status: "success",
      result: {
        type: "video",
        author: {
          // Douyin scraper doesn't expose author info – leave empty
          avatar: null as string | null,
          nickname: "Douyin Video",
        },
        desc: title || "No description available",
        // Use preview for the <video> player (it's a direct playable src)
        videoSD: sdLink?.url ?? bestUrl,
        videoHD: hdLink?.url ?? bestUrl,
        video_hd: hdLink?.url ?? null,
        videoWatermark: null as string | null,
        music: null as string | null,
        uploadDate: null as string | null,
        thumbnail: thumbnail,
        duration: duration,
        preview: preview,
        // Forward all original download links so DouyinResultSection can render them
        links: links,
        // Stats are not provided by the Douyin scraper
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
      },
    };

    console.log("[douyin.json.ts] Success – links:", links.length);

    return new Response(JSON.stringify(normalised), { status: 200, headers });
  } catch (error: any) {
    console.error("[douyin.json.ts] Error:", error.message);

    let message = "Unable to fetch Douyin video data.";
    let statusCode = 500;

    if (error.message?.includes("timeout")) {
      message = "Request timed out. Please try again.";
      statusCode = 408;
    } else if (error.message?.includes("404")) {
      message = "Video not found or may be private.";
      statusCode = 404;
    }

    return new Response(
      JSON.stringify({
        error: message,
        status: "error",
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      { status: statusCode, headers }
    );
  }
};

// Allow POST for compatibility (same logic)
export const POST: APIRoute = GET;
