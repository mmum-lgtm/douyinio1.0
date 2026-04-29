// src/pages/api/tik.json.ts
import type { APIRoute } from "astro";

export const prerender = false;

import TikTok from "@tobyg74/tiktok-api-dl";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function resolveShortUrl(url: string): Promise<string> {
  try {
    console.log("Resolving short URL:", url);
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
      },
      signal: AbortSignal.timeout(10000),
    });
    const resolvedUrl = response.url;
    console.log("Resolved to:", resolvedUrl);
    return resolvedUrl;
  } catch (error: any) {
    console.log("URL resolution failed:", error.message);
    return url;
  }
}

function extractStats(result: any) {
  return {
    likes:
      result.statistics?.diggCount ||
      result.stats?.diggCount ||
      result.diggCount ||
      result.statistics?.likeCount ||
      result.stats?.likeCount ||
      0,
    views:
      result.statistics?.playCount ||
      result.stats?.playCount ||
      result.playCount ||
      result.statistics?.viewCount ||
      result.stats?.viewCount ||
      0,
    comments:
      result.statistics?.commentCount ||
      result.stats?.commentCount ||
      result.commentCount ||
      0,
    shares:
      result.statistics?.shareCount ||
      result.stats?.shareCount ||
      result.shareCount ||
      0,
    collects:
      result.statistics?.collectCount ||
      result.stats?.collectCount ||
      result.collectCount ||
      0,
  };
}

function transformLibraryResponse(libraryData: any) {
  const result = libraryData.result;
  if (!result) return null;

  const thumbnail =
    result.cover?.[0] ||
    result.originCover?.[0] ||
    result.video?.cover?.[0] ||
    result.video?.originCover?.[0] ||
    result.dynamicCover?.[0] ||
    result.video?.dynamicCover?.[0] ||
    null;

  const stats = extractStats(result);

  if (stats.views === 0 || stats.views < 100) {
    throw new Error("Invalid views count from library");
  }

  let avatar: string | null = null;
  if (result.author?.avatarLarger) {
    avatar = Array.isArray(result.author.avatarLarger)
      ? result.author.avatarLarger[0]
      : result.author.avatarLarger;
  }
  if (!avatar && result.author?.avatarMedium) {
    avatar = Array.isArray(result.author.avatarMedium)
      ? result.author.avatarMedium[0]
      : result.author.avatarMedium;
  }
  if (!avatar && result.author?.avatarThumb) {
    avatar = Array.isArray(result.author.avatarThumb)
      ? result.author.avatarThumb[0]
      : result.author.avatarThumb;
  }
  if (!avatar && result.author?.avatar) {
    avatar = Array.isArray(result.author.avatar)
      ? result.author.avatar[0]
      : result.author.avatar;
  }

  return {
    status: "success",
    result: {
      type: result.type || (result.images ? "image" : "video"),
      author: {
        avatar,
        nickname:
          result.author?.nickname ||
          result.author?.username ||
          result.author?.uniqueId ||
          "Unknown Author",
      },
      desc: result.desc || result.title || "No description available",
      videoSD:
        result.video?.downloadAddr?.[0] || result.video?.playAddr?.[0] || null,
      videoHD:
        result.video?.downloadAddr?.[1] ||
        result.video?.downloadAddr?.[0] ||
        result.video?.playAddr?.[1] ||
        result.video?.playAddr?.[0] ||
        null,
      video_hd: result.video?.downloadAddr?.[0] || result.video?.playAddr?.[0] || null,
      videoWatermark: result.video?.playAddr?.[0] || result.video?.wmplay || null,
      music: result.music?.playUrl?.[0] || result.music?.play || null,
      uploadDate: result.createTime
        ? new Date(result.createTime * 1000).toISOString()
        : null,
      images: result.images || null,
      thumbnail,
      likes: stats.likes,
      views: stats.views,
      comments: stats.comments,
      shares: stats.shares,
    },
  };
}

async function tryLibraryDownloader(url: string) {
  const versions = ["v3", "v2", "v1"];
  let lastError = null;

  for (const version of versions) {
    try {
      console.log(`\n=== Trying TikTok library version ${version} ===`);
      const result = await TikTok.Downloader(url, {
        version,
        showOriginalResponse: false,
      });
      console.log(`Raw ${version} response status:`, result.status);
      if (result.status === "success" && result.result) {
        const transformedData = transformLibraryResponse(result);
        if (transformedData?.result) {
          console.log(`✅ Success with library version ${version}`);
          return transformedData;
        }
      }
      throw new Error(
        result.message || `Library version ${version} returned no valid data`
      );
    } catch (error: any) {
      console.log(`❌ Library version ${version} failed:`, error.message);
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw lastError || new Error("All library downloader versions failed");
}

// ─── Fallback 1 – TikWM ───────────────────────────────────────────────────────

async function tryTikWM(url: string) {
  console.log("\n=== Trying fallback: TikWM ===");

  const response = await fetch(
    `https://www.tikwm.com/api/?url=${encodeURIComponent(url.trim())}`,
    {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
      },
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) throw new Error(`TikWM HTTP ${response.status}`);

  const data = await response.json();
  if (data.code !== 0 || !data.data) throw new Error("TikWM returned no data");

  const d = data.data;
  console.log("✅ TikWM succeeded");

  return {
    status: "success",
    result: {
      type: d.images ? "image" : "video",
      author: {
        avatar: d.author?.avatar || null,
        nickname: d.author?.unique_id || d.author?.nickname || "Unknown Author",
      },
      desc: d.title || "No description available",
      videoSD: d.play || null,
      videoHD: d.hdplay || d.play || null,
      video_hd: d.hdplay || null,
      videoWatermark: d.wmplay || null,
      music: d.music || null,
      uploadDate: d.create_time
        ? new Date(d.create_time * 1000).toISOString()
        : null,
      images: d.images || null,
      thumbnail: d.cover || d.origin_cover || d.dynamic_cover || null,
      likes: d.digg_count || 0,
      views: d.play_count || 0,
      comments: d.comment_count || 0,
      shares: d.share_count || 0,
    },
  };
}

// ─── Fallback 2 – universalDownloader (your self-hosted Express API) ──────────
//
// Set UNIVERSAL_DOWNLOADER_URL in your Vercel env vars, e.g.:
//   UNIVERSAL_DOWNLOADER_URL=https://your-api.vercel.app
// or for local dev:
//   UNIVERSAL_DOWNLOADER_URL=http://localhost:3000

function universalDownloaderBase(): string {
  const base = import.meta.env.UNIVERSAL_DOWNLOADER_URL;
  if (!base) {
    console.warn(
      "[tik.json.ts] UNIVERSAL_DOWNLOADER_URL not set – defaulting to http://localhost:3000"
    );
    return "http://localhost:3000";
  }
  return base.replace(/\/$/, "");
}

async function tryUniversalDownloader(url: string) {
  console.log("\n=== Trying fallback: universalDownloader (self-hosted) ===");

  const apiUrl = `${universalDownloaderBase()}/api/tiktok/download?url=${encodeURIComponent(url)}`;
  console.log("universalDownloader URL:", apiUrl);

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`universalDownloader HTTP ${response.status}`);
  }

  const json = await response.json();

  if (!json.success || !json.data) {
    throw new Error(json.error || "universalDownloader returned no data");
  }

  // universalDownloader's tiktokService returns:
  //   { status: true, title, thumbnail, downloads: [{text, url}] }
  const d = json.data;
  const downloads: Array<{ text?: string; url: string }> = d.downloads || [];

  // Separate video vs audio vs slides
  const videoLinks = downloads.filter(
    (dl) => dl.url && (!dl.text || !dl.text.toLowerCase().includes("audio"))
  );
  const audioLinks = downloads.filter(
    (dl) => dl.url && dl.text?.toLowerCase().includes("audio")
  );

  const videoSD = videoLinks[0]?.url || null;
  const videoHD = videoLinks[1]?.url || videoLinks[0]?.url || null;
  const music   = audioLinks[0]?.url || null;

  // Build a best-effort thumbnail: ssstik doesn't return one directly,
  // but we propagate whatever the service gave us.
  const thumbnail = d.thumbnail || null;

  console.log("✅ universalDownloader succeeded");

  return {
    status: "success",
    result: {
      type: "video",
      author: {
        avatar: null as string | null,
        nickname: d.title || "Unknown Author",
      },
      desc: d.title || "No description available",
      videoSD,
      videoHD,
      video_hd: videoHD,
      videoWatermark: null as string | null,
      music,
      uploadDate: null as string | null,
      images: null as any,
      thumbnail,
      // universalDownloader (ssstik) doesn't expose stats
      likes: 0,
      views: 0,
      comments: 0,
      shares: 0,
    },
  };
}

// ─── Orchestrator: library → TikWM → universalDownloader ─────────────────────

async function fallbackToExternalServices(url: string) {
  // Fallback 1 – TikWM
  try {
    return await tryTikWM(url);
  } catch (e: any) {
    console.log("❌ TikWM failed:", e.message);
  }

  // Fallback 2 – universalDownloader (ssstik.io via your Express API)
  try {
    return await tryUniversalDownloader(url);
  } catch (e: any) {
    console.log("❌ universalDownloader failed:", e.message);
  }

  throw new Error("All fallback services failed");
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
    console.log("\n" + "=".repeat(50));
    console.log("=== NEW TIKTOK API REQUEST ===");
    console.log("Request URL:", requestUrl.href);

    const url = requestUrl.searchParams.get("url");
    console.log("URL parameter:", url);

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL parameter is required", status: "error" }),
        { status: 400, headers }
      );
    }

    if (!url.includes("tiktok.com") && !url.includes("douyin")) {
      return new Response(
        JSON.stringify({
          error: "Invalid URL. Please provide a valid TikTok URL.",
          status: "error",
        }),
        { status: 400, headers }
      );
    }

    let processedUrl = url;
    if (url.includes("/t/") || url.includes("vm.tiktok.com")) {
      processedUrl = await resolveShortUrl(url);
    }

    console.log("Processing URL:", processedUrl);

    // ── Try primary library first, then cascade through fallbacks ─────────────
    let data: any;

    try {
      data = await tryLibraryDownloader(processedUrl);
    } catch (libraryError: any) {
      console.log("\n⚠️ Library failed, trying fallback services...");
      console.log("Library error:", libraryError.message);
      try {
        data = await fallbackToExternalServices(processedUrl);
      } catch (fallbackError: any) {
        console.log("❌ All services failed");
        throw new Error("Both library and all fallback services failed to return valid data");
      }
    }

    if (!data?.result) {
      throw new Error("No data returned from any service");
    }

    const { videoSD, videoHD, video_hd, videoWatermark, music, images } =
      data.result;
    if (!videoSD && !videoHD && !video_hd && !videoWatermark && !music && !images) {
      return new Response(
        JSON.stringify({
          error:
            "This video appears to be private, deleted, or not available for download.",
          status: "error",
        }),
        { status: 404, headers }
      );
    }

    console.log("=== FINAL RESPONSE OK ===\n");
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (error: any) {
    console.error("=== FINAL ERROR ===", error.message);

    let errorMessage = "Unable to fetch TikTok video data.";
    let statusCode = 500;

    if (error.message?.includes("403")) {
      errorMessage = "TikTok is blocking requests. Try again later.";
      statusCode = 403;
    } else if (
      error.message?.includes("404") ||
      error.message?.includes("private") ||
      error.message?.includes("deleted")
    ) {
      errorMessage = "Video not found or is private.";
      statusCode = 404;
    } else if (error.message?.includes("timeout")) {
      errorMessage = "Request timed out. Service may be busy.";
      statusCode = 408;
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        status: "error",
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      { status: statusCode, headers }
    );
  }
};

export const POST: APIRoute = GET;
