import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, ag as spreadAttributes, al as renderSlot, b as renderTemplate, r as renderComponent } from './astro/server_CMB_St_3.mjs';
import 'piccolore';
import { g as getLangFromUrl, b as getRelativeLocaleUrl, a as $$Icon, u as useTranslations } from './Layout_DNd50Fmw.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://tiktokio.cam");
const $$Link = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    href,
    block,
    size = "md",
    style = "primary",
    class: className,
    ...rest
  } = Astro2.props;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  function localizePath(path) {
    if (!path || path && path.startsWith("http") || path === "#") return path;
    return getRelativeLocaleUrl(lang, path);
  }
  const sizes = {
    xs: "",
    sm: "px-3 py-1.5",
    md: "px-4 py-2.5",
    lg: "px-5 py-2.5"
  };
  const styles = {
    outline: "text-center border outline-2 transition-colors border-gray-300 text-gray-700 dark:text-gray-100 hover:border-gray-400 dark:text-white active:outline dark:hover:bg-dark dark:hover:border-white dark:hover:text-white",
    primary: "text-center bg-stone-950 outline-2 dark:bg-gray-100 hover:bg-stone-800 dark:hover:bg-white focus-visible:bg-stone-500 dark:focus-visible:bg-gray-100 text-white dark:text-black border-transparent active:outline shadow-sm",
    muted: "text-sm font-semibold leading-6 text-gray-800 dark:text-gray-100",
    hover: "text-center text-stone-950 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200"
  };
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href && href.startsWith("http") ? href : localizePath(href), "href")}${spreadAttributes(rest)}${addAttribute([
    "rounded-md text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    block && "w-full",
    sizes[size],
    styles[style],
    className
  ], "class:list")}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/ui/link.astro", void 0);

const $$Astro = createAstro("https://tiktokio.cam");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const {
    prevUrl,
    nextUrl,
    prevText = "blog.prev",
    nextText = "blog.next",
    class: className
  } = Astro2.props;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const t = useTranslations(lang);
  function localizePath(path) {
    if (!path) return path;
    return getRelativeLocaleUrl(lang, path);
  }
  return renderTemplate`${(prevUrl || nextUrl) && renderTemplate`${maybeRenderHead()}<div${addAttribute(["container flex", className], "class:list")}><div class="flex flex-row mx-auto container justify-center gap-8">${renderComponent($$result, "Link", $$Link, { "href": localizePath(prevUrl), "style": "muted", "class": `${!prevUrl ? "invisible" : ""}` }, { "default": ($$result2) => renderTemplate`<div class="flex flex-row align-middle">${renderComponent($$result2, "Icon", $$Icon, { "name": "ion:arrow-back", "class": "w-6 h-6" })}<p class="ml-2">${t(prevText)}</p></div>` })}${renderComponent($$result, "Link", $$Link, { "href": localizePath(nextUrl), "style": "muted", "class": `${!nextUrl ? "invisible" : ""}` }, { "default": ($$result2) => renderTemplate`<div class="flex flex-row align-middle"><span class="mr-2">${t(nextText)}</span>${renderComponent($$result2, "Icon", $$Icon, { "name": "ion:arrow-back", "class": "w-6 h-6" })}</div>` })}</div></div>`}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/blog/pagination.astro", void 0);

export { $$Pagination as $ };
