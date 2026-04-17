import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout } from '../../chunks/Layout_DNd50Fmw.mjs';
import { $ as $$TmateHero } from '../../chunks/tmate-hero_lQS8A9lQ.mjs';
import { $ as $$Features } from '../../chunks/features_DXLFzBy4.mjs';
import { $ as $$Logos, a as $$Newsletter } from '../../chunks/logos_B52gT6TU.mjs';
import { $ as $$Faq } from '../../chunks/faq_DpIwgn3d.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$TmateTiktokDownloader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TmateTiktokDownloader;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  getLangFromUrl(safeUrl);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Logos", $$Logos, {})} ${renderComponent($$result3, "Newsletter", $$Newsletter, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} `, "hero": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "hero" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$TmateHero, {})} ` })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/nl/tmate-tiktok-downloader.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/nl/tmate-tiktok-downloader.astro";
const $$url = "/nl/tmate-tiktok-downloader/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TmateTiktokDownloader,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
