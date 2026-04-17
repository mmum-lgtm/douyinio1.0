import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate } from './astro/server_CMB_St_3.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations } from './Layout_DNd50Fmw.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$TikmateHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TikmateHero;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  const { dynamic = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<hr class="my-4 border-t border-gray-300"> <div class="relative isolate bg-zinc-50"> <div class="sm:pt-10"> <div class="mx-auto py-8 max-w-7xl"> <div class="mx-auto max-w-6xl text-center"> <h1 class="text-2xl font-bold tracking-tight text-black sm:text-4xl">${t("hero.title")}</h1> <p class="mt-2 text-lg leading-8 text-black">${t("hero.subtitle")}</p> ${renderComponent($$result, "InputScreen", null, { "client:only": "solid-js", "client:component-hydration": "only", "client:component-path": "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/TikmateInputScreen", "client:component-export": "default" })} </div> </div> </div> </div> <hr class="my-4 border-t border-gray-300">`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/tikmate-hero.astro", void 0);

export { $$TikmateHero as $ };
