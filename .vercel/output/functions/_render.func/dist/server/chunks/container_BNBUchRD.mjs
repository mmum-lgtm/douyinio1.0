import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, al as renderSlot, b as renderTemplate } from './astro/server_CMB_St_3.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://tiktokio.cam");
const $$Container = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Container;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["max-w-screen-xl mx-auto", className], "class:list")}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/container.astro", void 0);

export { $$Container as $ };
