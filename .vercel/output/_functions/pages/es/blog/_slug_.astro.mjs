import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { g as getCollection } from '../../../chunks/_astro_content_nKpnnJDh.mjs';
import { $ as $$Container } from '../../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout, a as $$Icon, b as getRelativeLocaleUrl } from '../../../chunks/Layout_DNd50Fmw.mjs';
import { g as getArticleReadingTime } from '../../../chunks/blog_CFImKJjS.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
async function getStaticPaths() {
  const blogEntries = await getCollection("blog");
  const localizedBlogEntries = blogEntries.filter(
    (entry) => entry.slug && entry.slug.startsWith("es/")
  );
  return localizedBlogEntries.map((post) => {
    let slug = post.slug;
    slug = slug.substring(3).replaceAll("blog/", "");
    return {
      params: { slug },
      props: { post }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { data, render } = post;
  const { Content } = await render();
  const readTime = getArticleReadingTime(post.body);
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  function localizePath(path) {
    if (!path || path && path.startsWith("http") || path === "#") return path;
    return getRelativeLocaleUrl(lang, path);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": post.data.title, "lang": lang, "dir": lang === "es" ? "ltr" : "ltr" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto prose prose-lg dark:prose-invert mt-14"> <a${addAttribute(localizePath(`/blog/category/${post.data.category?.toLowerCase()}`), "href")} class="text-blue-400 dark:text-stone-400 uppercase tracking-wider text-sm font-medium no-underline"> ${post.data.category} </a> <h1 class="text-4xl mb-3 lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight dark:text-white"> ${post.data.title} </h1> <div class="flex gap-2 items-center"> <div class="w-full md:w-auto flex flex-wrap gap-3"> ${post.data.tags.map((tag) => renderTemplate`<a${addAttribute(localizePath(`/blog/tag/${tag?.toLowerCase()}`), "href")} class="text-sm text-gray-500 dark:text-stone-300">
#${tag} </a>`)} </div> </div> <div class="flex gap-2 mt-4 items-center flex-wrap md:flex-nowrap"> <span class="text-gray-400 dark:text-stone-400"> ${post.data.author} </span> <span class="text-gray-400 dark:text-stone-400">•</span> <span class="text-gray-400 dark:text-stone-400"> ${readTime} min
</span> <span class="text-gray-400 dark:text-stone-400">•</span> <time class="text-gray-400 dark:text-stone-400"${addAttribute(post.data.publishDate.toISOString(), "datetime")}> ${post.data.publishDate.toDateString()} </time> </div> </div> <div class="mx-auto prose prose-lg dark:prose-invert mt-6 dark:text-gray-200"> ${renderComponent($$result3, "Content", Content, {})} </div> <div class="mx-auto mt-20"> <a${addAttribute(localizePath("/blog"), "href")}> <div class="flex flex-row align-middle justify-center dark:text-stone-200"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ion:arrow-back", "class": "w-6 h-6" })} <p class="ml-2">Back to blog</p> </div> </a> </div> <div class="mx-auto prose prose-lg dark:prose-invert mt-20" x-data="{
				initGiscus: function() {
					let script = document.createElement('script');
					script.src = 'https://giscus.app/client.js';
					script.dataset.repo = 'zankhq/astros';
					script.dataset.repoId = 'R_kgDOGa6DOg';
					script.dataset.category = 'Blog';
					script.dataset.categoryId = 'DIC_kwDOGa6DOs4CXazF';
					script.dataset.mapping = 'pathname';
					script.dataset.strict = '0';
					script.dataset.reactionsEnabled = '1';
					script.dataset.emitMetadata = '0';
					script.dataset.inputPosition = 'top';
					script.dataset.theme = localStorage.theme == 'dark' ? 'dark' : localStorage.theme == 'light' ? 'light' : 'preferred_color_scheme';
					script.dataset.lang = 'es';
					script.dataset.loading = 'lazy';
					script.crossOrigin = 'anonymous';
					script.async = true;
					this.$el.appendChild(script);
				}
			}" x-init="initGiscus()"></div> ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/es/blog/[slug].astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/es/blog/[slug].astro";
const $$url = "/es/blog/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
