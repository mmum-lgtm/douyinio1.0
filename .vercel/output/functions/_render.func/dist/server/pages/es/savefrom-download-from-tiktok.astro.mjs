import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$SavefromHero, a as $$SavefromNewsletter, b as $$SavefromFeatures, c as $$SavefromFaq } from '../../chunks/savefrom-faq_BBYCaYKg.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$SavefromDownloadFromTiktok = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SavefromDownloadFromTiktok;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  const title = t("savef.title") ?? "SaveFrom - TikTok Video Downloads - Savefromnet Tiktok Downloader";
  const description = t("savef.description") ?? "Discover the fastest TikTok video downloader by savefromnet. download any TikTok video in HD without watermark in seconds. Start downloading now!";
  const keywords = t("savef.keywords") ?? "TikTokio, tiktok video download, tiktok video downloader, download tiktok video, tiktok video download without watermark, tiktok download video";
  const image = "meta/md-tiktok-downloader.webp";
  const variant = "savefrom";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "keywords": keywords, "image": image, "variant": variant }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$SavefromHero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Newsletter", $$SavefromNewsletter, {})} ${renderComponent($$result3, "Features", $$SavefromFeatures, {})} ${renderComponent($$result3, "Faq", $$SavefromFaq, {})} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/es/savefrom-download-from-tiktok.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/es/savefrom-download-from-tiktok.astro";
const $$url = "/es/savefrom-download-from-tiktok/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SavefromDownloadFromTiktok,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
