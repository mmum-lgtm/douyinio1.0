import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$MdHero, a as $$Mdfeatures, b as $$Mdlogos, c as $$Mdfaq } from '../../chunks/mdfaq_BAeYtRuw.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$MusicalDownTiktokDownloader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MusicalDownTiktokDownloader;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  const title = t("md.title") ?? "TikTok Video Downloader - Free HD Downloads Without Watermark | TikTokio";
  const description = t("md.description") ?? "Download TikTok videos in HD quality, no watermark, for free. Supports MP4 and audio export.";
  const keywords = t("md.keywords") ?? "tiktok video downloader, download tiktok videos, tiktok hd downloader, no watermark tiktok, tiktokiocam";
  const image = "meta/md-tiktok-downloader.webp";
  const variant = "md";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "keywords": keywords, "image": image, "variant": variant, "lang": lang }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$MdHero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$Mdfeatures, {})} ${renderComponent($$result3, "Mdlogos", $$Mdlogos, {})} ${renderComponent($$result3, "Faq", $$Mdfaq, {})} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/fr/musical-down-tiktok-downloader.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/fr/musical-down-tiktok-downloader.astro";
const $$url = "/fr/musical-down-tiktok-downloader/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MusicalDownTiktokDownloader,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
