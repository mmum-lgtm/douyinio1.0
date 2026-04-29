// src/components/DouyinInputScreen.tsx
// Orchestrator for the Douyin downloader page.
// Drop-in equivalent of InputScreen.tsx but wired to /api/douyin.json

import { toast, Toaster } from "solid-toast";
import { createSignal, Show } from "solid-js";
import DouyinInputSection from "./DouyinInputSection";
import DouyinResultSection from "./DouyinResultSection";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DouyinLink {
  label: string;
  url: string;
}

export interface DouyinData {
  status: string | null;
  result: {
    type: string | null;
    author: {
      avatar: string | null;
      nickname: string | null;
    } | null;
    desc: string | null;
    videoSD: string | null;
    videoHD: string | null;
    video_hd: string | null;
    videoWatermark: string | null;
    music: string | null;
    uploadDate?: string | null;
    thumbnail?: string | null;
    duration?: string | null;
    preview?: string | null;
    links?: DouyinLink[];         // original [{label, url}] array from tikvideo.app
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  } | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

function DouyinInputScreen() {
  const [url, setUrl] = createSignal("");
  const [data, setData] = createSignal<DouyinData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  // Same ad URL pattern as the original TikTok screen
  const AD_URL =
    "https://www.profitablecpmratenetwork.com/f244ejywkg?key=56c64db7c52c93bc3de06a5fd6054221";

  // ── URL helpers ─────────────────────────────────────────────────────────────

  const isValidDouyinUrl = (u: string): boolean =>
    /douyin\.com|iesdouyin\.com/i.test(u);

  const cleanDouyinUrl = (u: string): string => {
    let clean = u.trim();
    if (clean.includes("?")) clean = clean.split("?")[0];
    if (clean.includes("#")) clean = clean.split("#")[0];
    if (!clean.startsWith("http")) clean = "https://" + clean;
    return clean.replace(/\/+$/, "");
  };

  const extractDouyinUrl = (text: string): string => {
    const patterns = [
      /https?:\/\/(?:www\.)?douyin\.com\/video\/\d+[^\s]*/g,
      /https?:\/\/(?:www\.)?douyin\.com\/[^\s]*/g,
      /https?:\/\/v\.douyin\.com\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/[^\/]*iesdouyin\.com\/[^\s]*/g,
    ];
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches?.[0]) return matches[0].replace(/[.,!?;]+$/, "");
    }
    return text.trim();
  };

  // ── Fetch ────────────────────────────────────────────────────────────────────

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const rawUrl = url().trim();
      if (!rawUrl) throw new Error("Please enter a Douyin URL");

      const extracted = extractDouyinUrl(rawUrl);
      const cleanUrl = cleanDouyinUrl(extracted);

      if (!isValidDouyinUrl(cleanUrl)) {
        throw new Error("Please enter a valid Douyin URL (douyin.com or v.douyin.com)");
      }

      const apiUrl = `/api/douyin.json?url=${encodeURIComponent(cleanUrl)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (!res.ok || json.status === "error" || json.error) {
        throw new Error(json.error || "Failed to fetch video data");
      }
      if (!json.result) {
        throw new Error("No video data found");
      }

      const normalised: DouyinData = {
        ...json,
        result: {
          ...json.result,
          author: {
            avatar: json.result.author?.avatar ?? null,
            nickname: json.result.author?.nickname ?? "Douyin Video",
          },
          links: json.result.links ?? [],
          views: json.result.views ?? 0,
          likes: json.result.likes ?? 0,
          comments: json.result.comments ?? 0,
          shares: json.result.shares ?? 0,
          thumbnail: json.result.thumbnail ?? null,
          preview: json.result.preview ?? null,
          duration: json.result.duration ?? null,
        },
      };

      setData(normalised);
      toast.success("Video loaded successfully!", {
        duration: 2000,
        position: "bottom-center",
      });
    } catch (err: any) {
      toast.error(err.message || "An error occurred", {
        duration: 5000,
        position: "bottom-center",
      });
      setError(err.message);
    }

    setLoading(false);
  };

  // ── Paste handler ────────────────────────────────────────────────────────────

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const extracted = extractDouyinUrl(text);
      const cleaned = cleanDouyinUrl(extracted);
      setUrl(cleaned);
      if (isValidDouyinUrl(cleaned)) {
        toast.success("Douyin URL pasted!");
      }
    } catch {
      toast.error("Clipboard access denied");
    }
  };

  // ── Download handler ─────────────────────────────────────────────────────────

  const handleDownloadClick = (downloadUrl: string, filename: string) => {
    // Open ad in background tab
    const adWin = window.open(AD_URL, "_blank");
    if (adWin) { adWin.blur(); window.focus(); }

    let finalFilename = filename;
    if (!finalFilename.startsWith("tiktokio.cam")) {
      finalFilename = `tiktokio.cam_${finalFilename}`;
    }

    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = finalFilename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 100);
      toast.success("Download started!", { duration: 2000, position: "bottom-center" });
    }
  };

  // ── Helper getters passed down to ResultSection ──────────────────────────────

  const getVideoUrl = () => {
    const r = data()?.result;
    // Prefer preview (direct playable src from tikvideo.app), then fall back
    return r?.preview || r?.videoSD || r?.videoHD || r?.video_hd || "";
  };

  const getAuthorInfo = () => ({
    avatar: data()?.result?.author?.avatar || "",
    nickname: data()?.result?.author?.nickname || "Douyin Video",
  });

  const getSafeFilename = () =>
    getAuthorInfo()
      .nickname.replace(/[^a-zA-Z0-9]/g, "_")
      .substring(0, 50);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    fetchData();
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div class="max-w-6xl mx-auto mt-8 px-4">
      <Toaster />

      <Show when={!data()}>
        <DouyinInputSection
          url={url()}
          setUrl={setUrl}
          loading={loading()}
          onSubmit={handleSubmit}
          onPaste={handlePaste}
          error={error()}
          extractDouyinUrl={extractDouyinUrl}
          cleanDouyinUrl={cleanDouyinUrl}
          isValidDouyinUrl={isValidDouyinUrl}
        />
      </Show>

      <Show when={data() && data()?.result}>
        <DouyinResultSection
          data={data()!}
          getVideoUrl={getVideoUrl}
          getAuthorInfo={getAuthorInfo}
          getSafeFilename={getSafeFilename}
          onDownloadClick={handleDownloadClick}
        />
      </Show>
    </div>
  );
}

export default DouyinInputScreen;
