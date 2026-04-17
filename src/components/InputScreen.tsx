// src/components/InputScreen.tsx
import { toast, Toaster } from "solid-toast";
import { createSignal, Show, createEffect } from "solid-js";
import InputSection from "./InputSection";
import ResultSection from "./ResultSection";

interface TikTokData {
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
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  } | null;
}

type Props = {};

function InputScreen({}: Props) {
  const [url, setUrl] = createSignal("");
  const [data, setData] = createSignal<TikTokData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [autoProcessing, setAutoProcessing] = createSignal(false);
  const AD_URL = "https://www.profitablecpmratenetwork.com/f244ejywkg?key=56c64db7c52c93bc3de06a5fd6054221";

  createEffect(() => {
    const currentData = data();
    console.log("🔄 Data signal changed:", currentData);
  });

  // Function to extract TikTok URL from text
  const extractTikTokUrl = (text: string): string => {
    const patterns = [
      /https?:\/\/(?:www\.)?tiktok\.com\/@[^\/\s]*\/video\/\d+[^\s]*/g,
      /https?:\/\/(?:www\.)?tiktok\.com\/t\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/vm\.tiktok\.com\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/vm\.tiktok\.com\/\d+[^\s]*/g,
      /https?:\/\/vt\.tiktok\.com\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/m\.tiktok\.com\/v\/\d+\.html[^\s]*/g,
      /https?:\/\/[^\/]*tiktok\.com\/[^\s]*/g
    ];

    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        let url = matches[0];
        url = url.replace(/[.,!?;]+$/, '');
        return url;
      }
    }
    
    const cleanText = text.trim();
    if (isValidTikTokUrl(cleanText)) return cleanText;
    return text;
  };

  const isValidTikTokUrl = (url: string): boolean => {
    const tikTokPatterns = [/tiktok\.com/, /douyin/, /vm\.tiktok\.com/, /vt\.tiktok\.com/, /m\.tiktok\.com/];
    return tikTokPatterns.some(pattern => pattern.test(url));
  };

  const suggestUrlFix = (url: string): string => {
    if (url.includes('tiktok') && !url.startsWith('http')) {
      return 'https://' + url;
    }
    return url;
  };

  const cleanTikTokUrl = (url: string): string => {
    let cleanUrl = url.trim();
    cleanUrl = extractTikTokUrl(cleanUrl);

    if (cleanUrl.includes('?')) cleanUrl = cleanUrl.split('?')[0];
    if (cleanUrl.includes('#')) cleanUrl = cleanUrl.split('#')[0];

    if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;
    cleanUrl = cleanUrl.replace(/\/+$/, '');
    return cleanUrl;
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const tiktokUrl = url().trim();
      if (!tiktokUrl) throw new Error("Please enter a TikTok URL");
      if (!isValidTikTokUrl(tiktokUrl)) {
        const suggested = suggestUrlFix(tiktokUrl);
        if (suggested !== tiktokUrl) {
          setUrl(suggested);
          throw new Error(`Invalid TikTok URL. Try: ${suggested}`);
        }
        throw new Error("Please enter a valid TikTok URL");
      }

      const apiUrl = `/api/tik.json?url=${encodeURIComponent(tiktokUrl)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (!res.ok || json.status === "error" || json.error) {
        throw new Error(json.error || "Failed to fetch video data");
      }
      if (!json.result) {
        throw new Error("No video data found");
      }

      const normalizedData = {
        ...json,
        result: {
          ...json.result,
          views: json.result.views || 0,
          likes: json.result.likes || 0,
          comments: json.result.comments || 0,
          shares: json.result.shares || 0,
          thumbnail: json.result.thumbnail || null,
          author: {
            avatar: json.result.author?.avatar || null,
            nickname: json.result.author?.nickname || "Unknown Author"
          }
        }
      };

      setData(normalizedData);
      toast.success("Video loaded successfully!", { duration: 2000, position: "bottom-center" });

    } catch (error: any) {
      console.error("FETCH ERROR:", error);
      toast.error(error.message || "An error occurred", {
        duration: 5000,
        position: "bottom-center",
      });
      setError(error.message);
    }
    setLoading(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const extractedUrl = extractTikTokUrl(text);
      const cleanedUrl = cleanTikTokUrl(extractedUrl);
      setUrl(cleanedUrl);

      if (cleanedUrl && isValidTikTokUrl(cleanedUrl)) {
        const isPromotional = text.length > cleanedUrl.length + 15 && 
          (text.toLowerCase().includes('tiktok lite') || 
           text.toLowerCase().includes('download tiktok') ||
           text.split(' ').length > 8);

        if (isPromotional) {
          setAutoProcessing(true);
          toast.success("Auto-processing promotional content...", { duration: 2500 });
          setTimeout(fetchData, 1200);
        } else {
          toast.success("Valid TikTok URL pasted!");
        }
      }
    } catch (err) {
      toast.error("Clipboard access denied");
    }
  };

  const cancelAutoProcessing = () => {
    setAutoProcessing(false);
    toast.info("Auto-processing cancelled");
  };

  // UPDATED: Add "tiktokio.cam_" prefix to every download
  const handleDownloadClick = (downloadUrl: string, filename: string) => {
    const adWin = window.open(AD_URL, '_blank');
    if (adWin) {
      adWin.blur();
      window.focus();
    }

    let finalFilename = filename;
    if (!finalFilename.startsWith('tiktokio.cam')) {
      finalFilename = `tiktokio.cam_${finalFilename}`;
    }

    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = finalFilename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 100);

      toast.success("Download started!", { duration: 2000, position: "bottom-center" });
    }
  };

  const getVideoUrl = () => {
    const result = data()?.result;
    return result?.videoSD || result?.videoHD || result?.video_hd || result?.videoWatermark || result?.music || "";
  };

  const getAuthorInfo = () => {
    const author = data()?.result?.author;
    return {
      avatar: author?.avatar || "",
      nickname: author?.nickname || "Unknown Author"
    };
  };

  const getSafeFilename = () => {
    const author = getAuthorInfo().nickname;
    return author.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (autoProcessing()) return;
    fetchData();
  };

  return (
    <div class="max-w-6xl mx-auto mt-8 px-4">
      <Toaster />

      <Show when={!data()}>
        <InputSection
          url={url()}
          setUrl={setUrl}
          loading={loading()}
          autoProcessing={autoProcessing()}
          onSubmit={handleSubmit}
          onPaste={handlePaste}
          onCancelAutoProcessing={cancelAutoProcessing}
          error={error()}
          extractTikTokUrl={extractTikTokUrl}
          cleanTikTokUrl={cleanTikTokUrl}
          isValidTikTokUrl={isValidTikTokUrl}
        />
      </Show>

      <Show when={data() && data()?.result}>
        <ResultSection
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

export default InputScreen;