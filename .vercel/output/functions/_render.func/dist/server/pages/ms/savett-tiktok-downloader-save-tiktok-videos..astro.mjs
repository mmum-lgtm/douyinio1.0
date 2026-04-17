import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$SavettHero, a as $$SavettFeatures, b as $$SavettFaq } from '../../chunks/savett-faq_CeJhatxH.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$SavettTiktokDownloaderSaveTiktokVideos = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SavettTiktokDownloaderSaveTiktokVideos;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  const title = t("savett.title") ?? "SaveTT -  Save TikTok Videos Without Watermark in Seconds";
  const description = t("savett.description") ?? "SaveTT is best way to download TikTok Videos online in seconds. Use SaveTT to save tiktok videos in HD without watermarks. Fast, free and works on all devices.";
  const keywords = t("savett.keywords") ?? "TikTokio, SaveTT, save tt, save tiktok, tiktok save, tik tok saving, download TikTok video without watermark, TikTok video downloader online, free TikTok downloader, download TikTok videos online, save TikTok videos without watermark";
  const image = "meta/stt-tiktok-downloader.webp";
  const variant = "savett";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "keywords": keywords, "image": image, "variant": variant, "lang": lang }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$SavettFeatures, {})} ${renderComponent($$result3, "Faq", $$SavettFaq, {})} ` })} `, "hero": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "hero" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$SavettHero, {})} ` })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ms/savett-tiktok-downloader-save-tiktok-videos..astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ms/savett-tiktok-downloader-save-tiktok-videos..astro";
const $$url = "/ms/savett-tiktok-downloader-save-tiktok-videos./";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SavettTiktokDownloaderSaveTiktokVideos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
