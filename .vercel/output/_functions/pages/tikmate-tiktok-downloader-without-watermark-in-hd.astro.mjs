import { a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_BNBUchRD.mjs';
import { $ as $$Layout } from '../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$TikmateHero } from '../chunks/tikmate-hero_DkioxMsz.mjs';
import { $ as $$Features } from '../chunks/features_DXLFzBy4.mjs';
import { $ as $$Logos, a as $$Newsletter } from '../chunks/logos_B52gT6TU.mjs';
import { $ as $$Faq } from '../chunks/faq_DpIwgn3d.mjs';
export { renderers } from '../renderers.mjs';

const $$TikmateTiktokDownloaderWithoutWatermarkInHd = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Logos", $$Logos, {})} ${renderComponent($$result3, "Newsletter", $$Newsletter, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} `, "hero": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "hero" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$TikmateHero, {})} ` })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/tikmate-tiktok-downloader-without-watermark-in-hd.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/tikmate-tiktok-downloader-without-watermark-in-hd.astro";
const $$url = "/tikmate-tiktok-downloader-without-watermark-in-hd/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TikmateTiktokDownloaderWithoutWatermarkInHd,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
