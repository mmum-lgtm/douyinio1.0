import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$SavetikHero, a as $$Savetikfeatures, b as $$Stfaq } from '../../chunks/stfaq_GFwukX_i.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$SavetikDownloadTiktokVideoWithoutWatermarkFree = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SavetikDownloadTiktokVideoWithoutWatermarkFree;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  const title = t("savetik.title") ?? "Savetik Tiktok Video Downloader - Save Tiktok Videos Without WaterMark!";
  const description = t("savetik.description") ?? "SaveTik Downloader is Tiktok video downloader without watermark. You can Save TikTok videos from any device.";
  const keywords = t("savetik.keywords") ?? "tiktok video downloader, download tiktok videos, tiktok hd downloader, no watermark tiktok, tiktokiocam";
  const image = "meta/md-tiktok-downloader.webp";
  const favicon = "https://savetik.co/icons/favicon.ico?v=32";
  const variant = "savetik";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "keywords": keywords, "image": image, "favicon": favicon, "variant": variant, "lang": lang }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$SavetikHero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$Savetikfeatures, {})} ${renderComponent($$result3, "Faq", $$Stfaq, {})} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ar/savetik-download-tiktok-video-without-watermark-free.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ar/savetik-download-tiktok-video-without-watermark-free.astro";
const $$url = "/ar/savetik-download-tiktok-video-without-watermark-free/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SavetikDownloadTiktokVideoWithoutWatermarkFree,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
