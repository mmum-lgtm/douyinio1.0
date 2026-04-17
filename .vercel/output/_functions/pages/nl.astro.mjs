import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_BNBUchRD.mjs';
import { $ as $$Faq } from '../chunks/faq_DpIwgn3d.mjs';
import { $ as $$Features } from '../chunks/features_DXLFzBy4.mjs';
import { $ as $$Hero } from '../chunks/hero_DszPf9Ws.mjs';
import { g as getLangFromUrl, $ as $$Layout } from '../chunks/Layout_DNd50Fmw.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "dir": lang === "nl" ? "ltr" : "ltr" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/nl/index.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/nl/index.astro";
const $$url = "/nl/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
