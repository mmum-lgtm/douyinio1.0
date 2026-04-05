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

  // Debug effect to track data changes
  createEffect(() => {
    const currentData = data();
    console.log("🔄 Data signal changed:", currentData);
    if (currentData?.result) {
      console.log("📊 Stats:", {
        views: currentData.result.views,
        likes: currentData.result.likes,
        comments: currentData.result.comments,
        shares: currentData.result.shares,
        thumbnail: currentData.result.thumbnail,
        avatar: currentData.result.author?.avatar
      });
    }
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
    if (isValidTikTokUrl(cleanText)) {
      return cleanText;
    }
    return text;
  };

  const isValidTikTokUrl = (url: string): boolean => {
    const tikTokPatterns = [
      /tiktok\.com/,
      /douyin/,
      /vm\.tiktok\.com/,
      /vt\.tiktok\.com/,
      /m\.tiktok\.com/
    ];
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

    if (cleanUrl.includes('?')) {
      cleanUrl = cleanUrl.split('?')[0];
    }

    if (cleanUrl.includes('#')) {
      cleanUrl = cleanUrl.split('#')[0];
    }

    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    cleanUrl = cleanUrl.replace(/\/+$/, '');
    return cleanUrl;
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    // Clear previous data to ensure fresh render
    setData(null);

    try {
      const tiktokUrl = url().trim();
      console.log("=== FETCH STARTED ===");
      console.log("URL:", tiktokUrl);

      if (!tiktokUrl) {
        throw new Error("Please enter a TikTok URL");
      }
      if (!isValidTikTokUrl(tiktokUrl)) {
        const suggestedUrl = suggestUrlFix(tiktokUrl);
        if (suggestedUrl !== tiktokUrl) {
          setUrl(suggestedUrl);
          throw new Error(`Invalid TikTok URL. Try: ${suggestedUrl}`);
        } else {
          throw new Error("Please enter a valid TikTok URL");
        }
      }

      const apiUrl = `/api/tik.json?url=${encodeURIComponent(tiktokUrl)}`;
      console.log("API URL:", apiUrl);

      let res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response status:", res.status);
      console.log("Response headers:", Object.fromEntries(res.headers.entries()));

      // Check if response is actually JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON! Content-Type:", contentType);
        const textResponse = await res.text();
        console.error("Response text:", textResponse.substring(0, 500));
        throw new Error("Server returned invalid response. Please check if the API endpoint is configured correctly.");
      }

      let json = await res.json();
      console.log("=== API RESPONSE ===");
      console.log(JSON.stringify(json, null, 2));

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(json.error || 'Invalid request. Please check your TikTok URL.');
        } else if (res.status === 404) {
          throw new Error('Video not found. The video might have been deleted or is private.');
        } else if (res.status === 500) {
          throw new Error('Server error. Please try again in a moment.');
        } else {
          throw new Error(`HTTP error! status: ${res.status} - ${json.error || 'Unknown error'}`);
        }
      }

      if (json.status === "error" || json.error) {
        throw new Error(json.error || json.message || "Failed to fetch video data");
      }
      
      if (!json.result) {
        throw new Error("No video data found. The video might be private or restricted.");
      }

      const hasVideo = json.result.videoSD || json.result.videoHD || json.result.video_hd || json.result.videoWatermark;
      const hasAudio = json.result.music;

      if (!hasVideo && !hasAudio) {
        throw new Error("No downloadable content found. The video might be protected or unavailable.");
      }

      // Ensure all stats fields exist with default values
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

      console.log("✅ Setting normalized data:", normalizedData);
      console.log("🎯 Avatar URL being set:", normalizedData.result.author.avatar);
      setData(normalizedData);
      setError("");

      toast.success("Video loaded successfully!", {
        duration: 2000,
        position: "bottom-center",
      });

    } catch (error: any) {
      console.error("=== FETCH ERROR ===", error);

      let errorMessage = error.message || "An error occurred while fetching data";

      if (errorMessage.includes("Invalid TikTok URL")) {
        errorMessage += "\n\nSupported formats:\n• https://www.tiktok.com/@username/video/123456789\n• https://vm.tiktok.com/shortcode/\n• https://m.tiktok.com/v/123456789.html";
      }

      toast.error(errorMessage, {
        duration: 5000,
        position: "bottom-center",
        style: {
          "font-size": "16px",
          "max-width": "400px",
          "white-space": "pre-line",
        },
      });

      setData(null);
      setError(error.message);
    }
    setLoading(false);
  };

  const handlePaste = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'clipboard-read' as any });
      if (permission.state === 'granted' || permission.state === 'prompt') {
        const text = await navigator.clipboard.readText();
        console.log("Pasted text:", text);

        const extractedUrl = extractTikTokUrl(text);
        const cleanedUrl = cleanTikTokUrl(extractedUrl);

        setUrl(cleanedUrl);

        if (cleanedUrl && isValidTikTokUrl(cleanedUrl)) {
          const isPromotionalContent = (
            text.length > cleanedUrl.length + 15 &&
            (
              text.toLowerCase().includes('tiktok lite') ||
              text.toLowerCase().includes('download tiktok') ||
              text.toLowerCase().includes('shared via') ||
              text.toLowerCase().includes('this post is') ||
              text.includes('://www.tiktok.com/tiktoklite') ||
              text.split(' ').length > 8
            )
          );

          if (isPromotionalContent) {
            setAutoProcessing(true);
            toast.success("TikTok URL extracted! Starting download automatically...", {
              duration: 2500,
              position: "bottom-center",
            });

            setTimeout(() => {
              fetchData();
            }, 1200);

          } else {
            toast.success("Valid TikTok URL pasted! Click Download to process.", {
              duration: 1500,
              position: "bottom-center",
            });
          }
        }
      }
    } catch (err) {
      console.error("Paste error:", err);
      toast.error("Clipboard access denied");
    }
  };

  const cancelAutoProcessing = () => {
    setAutoProcessing(false);
    toast.info("Auto-processing cancelled", {
      duration: 1000,
      position: "bottom-center",
    });
  };

  const handleDownloadClick = (downloadUrl: string, filename: string) => {
    // Fire ad in background tab (behind current page)
    const adWin = window.open(AD_URL, '_blank');
    if (adWin) {
      adWin.blur();
      window.focus();
    }

    // Trigger download immediately
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 100);

      toast.success("Download started!", {
        duration: 2000,
        position: "bottom-center",
      });
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

    if (autoProcessing()) {
      toast.info("Auto-processing in progress...", {
        duration: 1000,
        position: "bottom-center",
      });
      return;
    }

    const currentUrl = url().trim();

    if (currentUrl && currentUrl.length > 100 && currentUrl.includes('tiktok')) {
      const extractedUrl = extractTikTokUrl(currentUrl);
      if (extractedUrl !== currentUrl) {
        setUrl(extractedUrl);
        toast.info("Extracted TikTok URL from shared content", {
          duration: 1500,
          position: "bottom-center",
        });
        setTimeout(() => fetchData(), 500);
        return;
      }
    }

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

      <Show when={!data()}>
        <div class="my-8 w-full flex justify-center">
          
        </div>
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