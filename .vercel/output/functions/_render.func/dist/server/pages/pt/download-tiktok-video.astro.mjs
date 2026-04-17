import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_BNBUchRD.mjs';
import { $ as $$DtvHero, a as $$Dtvfeatures, b as $$DtvFaq } from '../../chunks/dtv-hero_BvKjVqe1.mjs';
import { g as getLangFromUrl, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DNd50Fmw.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$DownloadTiktokVideo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DownloadTiktokVideo;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  const title = t("dtv.title") ?? "TikTok Video Downloader - Free HD Downloads Without Watermark | TikTokio";
  const description = t("dtv.description") ?? "Download TikTok videos in HD quality, no watermark, for free. Supports MP4 and audio export.";
  const keywords = t("dtv.keywords") ?? "tiktok video downloader, download tiktok videos, tiktok hd downloader, no watermark tiktok, tiktokiocam";
  const image = "images/tiktok-downloader.webp";
  const variant = "dtv";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "keywords": keywords, "image": image, "variant": variant, "lang": lang }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$DtvHero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$Dtvfeatures, {})} ${renderComponent($$result3, "Faq", $$DtvFaq, {})} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/pt/download-tiktok-video.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/pt/download-tiktok-video.astro";
const $$url = "/pt/download-tiktok-video/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DownloadTiktokVideo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
