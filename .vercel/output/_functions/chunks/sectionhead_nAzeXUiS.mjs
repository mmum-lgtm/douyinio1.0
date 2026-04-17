import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent, al as renderSlot } from './astro/server_CMB_St_3.mjs';
import 'piccolore';
import { g as getLangFromUrl, a as $$Icon, b as getRelativeLocaleUrl } from './Layout_DNd50Fmw.mjs';
import { g as getArticleReadingTime } from './blog_CFImKJjS.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://tiktokio.cam");
const $$Posts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Posts;
  const { posts } = Astro2.props;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  function localizePath(path) {
    if (!path || path && path.startsWith("http") || path === "#") return path;
    return getRelativeLocaleUrl(lang, path);
  }
  return renderTemplate`${maybeRenderHead()}<div class="grid gap-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3"> ${posts.map((post) => {
    const readTime = getArticleReadingTime(post.body);
    const postUrl = localizePath(`/blog/${post.slug}`);
    localizePath(`/blog/category/${post.data.category?.toLowerCase()}`);
    return renderTemplate`<div class="cursor-pointer group"> <div class="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105"> ${post.data.image && renderTemplate`<a class="relative block aspect-video"${addAttribute(postUrl, "href")}> <img${addAttribute(post.data.image.alt || "", "alt")} class="object-cover w-full h-full transition duration-300" height="240" loading="lazy" sizes="(max-width: 768px) 30vw, 33vw"${addAttribute(post.data.image.src, "src")} width="360"> </a>`} </div> <div class="mt-4"></div> <div class="mt-2"> <a class="text-xl font-semibold leading-snug tracking-tight"${addAttribute(postUrl, "href")}> <span class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]"> ${post.data.title} </span> </a> </div> <div class="flex gap-2 mt-3"> <span class="text-gray-400"> ${renderComponent($$result, "Icon", $$Icon, { "name": "fluent:person-24-filled", "width": "20" })} </span> <span class="text-sm text-gray-400"> ${post.data.author} </span> <span class="text-sm text-gray-400">•</span> <span class="text-sm text-gray-400"> ${readTime} min read
</span> </div> <p class="text-sm leading-6 text-gray-500 mt-2"> ${post.data.snippet} </p> </div>`;
  })} </div>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/blog/posts.astro", void 0);

const $$Astro = createAstro("https://tiktokio.cam");
const $$Sectionhead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sectionhead;
  const { align = "center" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["mt-8", "md:mt-16", align === "center" && "text-center"], "class:list")}> <h1 class="text-4xl lg:text-5xl font-bold lg:tracking-tight capitalize"> ${renderSlot($$result, $$slots["title"], renderTemplate`Title`)} </h1> <p class="text-lg mt-4 text-slate-600"> ${renderSlot($$result, $$slots["desc"], renderTemplate`Some description goes here`)} </p> </div>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/sectionhead.astro", void 0);

export { $$Sectionhead as $, $$Posts as a };
