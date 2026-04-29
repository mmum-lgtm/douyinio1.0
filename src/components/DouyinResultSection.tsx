// src/components/DouyinResultSection.tsx
// Results display for the Douyin downloader.
//
// Key difference from ResultSection.tsx:
//   - Renders the `links` array from tikvideo.app (each has a {label, url})
//     so the user sees every quality option the scraper found.
//   - Shows duration badge (provided by Douyin scraper, not TikTok).
//   - No stats section (Douyin scraper doesn't return likes/views/etc.).
//   - Same proxy CDN pattern for downloads:
//       https://dl.tiktokiocdn.workers.dev/api/download?url=...

import AdBanner from "./AdBanner";
import type { DouyinData, DouyinLink } from "./DouyinInputScreen";

interface DouyinResultSectionProps {
  data: DouyinData;
  getVideoUrl: () => string;
  getAuthorInfo: () => { avatar: string; nickname: string };
  getSafeFilename: () => string;
  onDownloadClick: (downloadUrl: string, filename: string) => void;
}

function DouyinResultSection(props: DouyinResultSectionProps) {
  if (!props.data?.result) return null;

  const result = props.data.result;
  let adBannerEl: HTMLDivElement | undefined;

  // ── Ad banner ref + trigger (same pattern as ResultSection) ─────────────────

  const handleAdRef = (el: HTMLDivElement) => { adBannerEl = el; };

  const triggerBannerAdClick = () => {
    if (!adBannerEl) return;
    const anchor = adBannerEl.querySelector<HTMLAnchorElement>("a[href]");
    if (anchor) { anchor.click(); return; }
    const iframe = adBannerEl.querySelector<HTMLIFrameElement>("iframe");
    if (iframe?.src) { window.open(iframe.src, "_blank"); return; }
    const clickable = adBannerEl.querySelector<HTMLElement>("[onclick]");
    if (clickable) { clickable.click(); return; }
    adBannerEl.click();
  };

  const handleDownloadWithAd = (downloadUrl: string, filename: string) => {
    props.onDownloadClick(downloadUrl, filename);
    setTimeout(triggerBannerAdClick, 150);
  };

  // ── Filename helpers ─────────────────────────────────────────────────────────

  const generateFilename = (baseName: string, suffix: string, ext: string) => {
    let name = (baseName || "douyin-video").trim();
    if (suffix) name += `_${suffix}`;
    if (!name.startsWith("tiktokio.cam")) name = `tiktokio.cam_${name}`;
    if (!name.toLowerCase().endsWith(`.${ext}`)) name += `.${ext}`;
    return name;
  };

  // ── Build proxy download URL (same CDN as TikTok site) ──────────────────────

  const proxyUrl = (rawUrl: string, ext: "mp4" | "mp3") =>
    `https://dl.tiktokiocdn.workers.dev/api/download?url=${encodeURIComponent(rawUrl)}&type=.${ext}&title=${props.getSafeFilename()}`;

  // ── Derive display values ────────────────────────────────────────────────────

  const thumbnail  = result.thumbnail;
  const authorInfo = props.getAuthorInfo();
  const links: DouyinLink[] = result.links ?? [];
  const videoUrl   = props.getVideoUrl();   // preview or best SD url

  // Colour mapping for link labels → button colour classes
  const buttonColour = (label: string): string => {
    const l = label.toLowerCase();
    if (l.includes("hd"))     return "bg-amber-600 hover:bg-amber-700";
    if (l.includes("audio") || l.includes("mp3")) return "bg-purple-600 hover:bg-purple-700";
    if (l.includes("watermark")) return "bg-blue-600 hover:bg-blue-700";
    return "bg-amber-600 hover:bg-amber-700";
  };

  const fileExt = (label: string): "mp4" | "mp3" =>
    label.toLowerCase().includes("mp3") || label.toLowerCase().includes("audio")
      ? "mp3"
      : "mp4";

  return (
    <div class="py-8">
      <div class="mt-4 max-w-6xl mx-auto">
        <div
          class="relative rounded-lg overflow-hidden border border-white/10 p-4"
          style={{ minHeight: "500px" }}
        >
          {/* ── Blurred thumbnail background ──────────────────────────────────── */}
          {thumbnail && (
            <>
              <img
                src={thumbnail}
                alt="background"
                class="absolute top-0 left-0 w-full h-full object-cover"
                style={{ zIndex: 1, pointerEvents: "none" }}
              />
              <div
                class="absolute top-0 left-0 w-full h-full bg-white"
                style={{ zIndex: 2, opacity: 0.5, pointerEvents: "none" }}
              />
            </>
          )}

          {/* ── Content layer ─────────────────────────────────────────────────── */}
          <div class="relative" style={{ zIndex: 10 }}>
            <div class="flex flex-col md:flex-row gap-4">

              {/* Left column – video preview ─────────────────────────────────── */}
              <div class="md:w-1/3 flex-shrink-0">
                <div class="relative rounded-lg overflow-hidden max-h-[430px] bg-black">
                  {videoUrl ? (
                    <video
                      controls
                      src={videoUrl}
                      poster={thumbnail ?? undefined}
                      class="w-full h-full object-cover"
                      referrerpolicy="no-referrer"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="Douyin thumbnail"
                      class="w-full h-full object-cover"
                    />
                  ) : (
                    <div class="w-full h-64 flex items-center justify-center bg-gray-800 text-white text-sm">
                      No preview available
                    </div>
                  )}
                </div>
              </div>

              {/* Right column – info, ad, download buttons ─────────────────────── */}
              <div class="md:w-2/3 flex flex-col justify-between">
                <div class="mb-3">

                  {/* Author row */}
                  <div class="flex items-center gap-3 mb-4">
                    {/* Douyin scraper doesn't return avatars – show placeholder */}
                    <div class="rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 class="text-xl font-bold text-gray-900">
                        {authorInfo.nickname}
                      </h2>
                      {/* Duration badge */}
                      {result.duration && (
                        <span class="inline-block mt-1 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                          ⏱ {result.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div class="text-gray-900 text-base mb-4 bg-white/70 p-3 rounded-lg">
                    {result.desc || "No description available"}
                  </div>

                  {/* No stats section – Douyin scraper doesn't return them */}
                </div>

                {/* ── Ad Banner ────────────────────────────────────────────────── */}
                <AdBanner
                  onRef={handleAdRef}
                  class="ad-banner w-full rounded-lg overflow-hidden mb-4"
                  width="100%"
                  height="auto"
                />

                {/* ── Download buttons ──────────────────────────────────────────── */}
                <div class="space-y-2">

                  {/* Render one button per link returned by tikvideo.app */}
                  {links.length > 0 ? (
                    links.map((link) => (
                      <button
                        class={`download-button ${buttonColour(link.label)} w-full p-3 rounded text-white font-bold flex items-center justify-center cursor-pointer transition-colors`}
                        onClick={() =>
                          handleDownloadWithAd(
                            proxyUrl(link.url, fileExt(link.label)),
                            generateFilename(
                              props.getSafeFilename(),
                              link.label.toLowerCase().replace(/[^a-z0-9]/g, "_"),
                              fileExt(link.label)
                            )
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        {link.label || "Download"}
                      </button>
                    ))
                  ) : (
                    /* Fallback if links array is empty but we have a video URL */
                    videoUrl && (
                      <button
                        class="download-button bg-amber-600 hover:bg-amber-700 w-full p-3 rounded text-white font-bold flex items-center justify-center cursor-pointer transition-colors"
                        onClick={() =>
                          handleDownloadWithAd(
                            proxyUrl(videoUrl, "mp4"),
                            generateFilename(props.getSafeFilename(), "", "mp4")
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download Video
                      </button>
                    )
                  )}

                  {/* Download Another */}
                  <button
                    class="download-button bg-gray-700 hover:bg-gray-800 w-full p-3 rounded text-white font-bold flex items-center justify-center cursor-pointer transition-colors"
                    onClick={() => (window.location.href = "/")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Download Another Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DouyinResultSection;
