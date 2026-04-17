import { a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_BNBUchRD.mjs';
import { $ as $$Layout } from '../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$SnaptikHero } from '../chunks/snaptik-hero_B8QuGY2T.mjs';
import { $ as $$Features } from '../chunks/features_DXLFzBy4.mjs';
import { $ as $$Logos, a as $$Newsletter } from '../chunks/logos_B52gT6TU.mjs';
import { $ as $$Faq } from '../chunks/faq_DpIwgn3d.mjs';
export { renderers } from '../renderers.mjs';

const $$SnaptikTiktokDownloaderDownloadVideoTiktokWithoutWatermark = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Logos", $$Logos, {})} ${renderComponent($$result3, "Newsletter", $$Newsletter, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} `, "hero": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "hero" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$SnaptikHero, {})} ` })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/snaptik-tiktok-downloader-download-video-tiktok-without-watermark.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/snaptik-tiktok-downloader-download-video-tiktok-without-watermark.astro";
const $$url = "/snaptik-tiktok-downloader-download-video-tiktok-without-watermark/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SnaptikTiktokDownloaderDownloadVideoTiktokWithoutWatermark,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
