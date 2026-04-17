import { c as createAstro, a as createComponent, m as maybeRenderHead, aj as unescapeHTML, b as renderTemplate } from './astro/server_CMB_St_3.mjs';
import 'piccolore';
import 'clsx';
import { g as getLangFromUrl, u as useTranslations } from './Layout_DNd50Fmw.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Faq;
  const { plan } = Astro2.props;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto max-w-7xl px-6 py-12 sm:py-12 lg:px-8 lg:py-12"> <div class="mx-auto divide-y divide-gray-900/10"> <div class="text-center mb-16"> <h2 class="text-2xl md:text-3xl font-bold text-gray-900">${t("faq.title_sec1")} <span class="text-orange-400">Tiktokio</span> - ${t("faq.title_sec2")}</h2> <div class="w-24 h-1 mx-auto bg-orange-400"></div> <p class="mt-4 mx-auto text-lg text-gray-900">${t("faq.faq_text")}</p> </div> <section style="opacity: 1;"> <div class="grid md:grid-cols-2 gap-6"> <div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${t("faq.question1")}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${t("faq.answer1")}</p> </div> </div> <div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${t("faq.question2")}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${t("faq.answer2")}</p> </div> </div> <div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${t("faq.question3")}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${t("faq.answer3")}</p> </div> </div> <div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${t("faq.question4")}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${t("faq.answer4")}</p> </div> </div> <div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${t("faq.question5")}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${t("faq.answer5")}</p> </div> </div> <div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${t("faq.question6")}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${unescapeHTML(t("faq.answer6"))}</p> </div> </div> </div> </section> </div> </div>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/faq.astro", void 0);

export { $$Faq as $ };
