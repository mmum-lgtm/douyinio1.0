import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { g as getCollection } from '../../../chunks/_astro_content_nKpnnJDh.mjs';
import { $ as $$Pagination } from '../../../chunks/pagination_BDWHH5TZ.mjs';
import { $ as $$Sectionhead, a as $$Posts } from '../../../chunks/sectionhead_nAzeXUiS.mjs';
import { $ as $$Container } from '../../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout } from '../../../chunks/Layout_DNd50Fmw.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
async function getStaticPaths({ paginate }) {
  var posts = await getCollection("blog", ({ data }) => {
    return !data.draft;
  });
  var processedPosts = posts.map((post) => {
    const [...slug] = post.slug.split("/");
    let lang = "pt";
    var firstSlug = post.slug.match(/^([^\/]*)\//);
    if (firstSlug) {
      lang = firstSlug[1];
    }
    return {
      ...post,
      slug: slug.join("/"),
      lang
    };
  });
  const localizedPosts = processedPosts.filter(
    (post) => post.lang === "pt"
  );
  localizedPosts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  return paginate(localizedPosts, {
    params: { blog: "blog" },
    pageSize: 4
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "dir": lang === "pt" ? "ltr" : "ltr" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Sectionhead", $$Sectionhead, {}, { "desc": async ($$result4) => renderTemplate`${renderComponent($$result4, "Fragment", Fragment, { "slot": "desc" }, { "default": async ($$result5) => renderTemplate`Discover Industry Insights, Company News, and Expert Opinions.` })}`, "title": async ($$result4) => renderTemplate`${renderComponent($$result4, "Fragment", Fragment, { "slot": "title" }, { "default": async ($$result5) => renderTemplate`Our Blog` })}` })} ${renderComponent($$result3, "Posts", $$Posts, { "posts": page.data })} ${renderComponent($$result3, "Pagination", $$Pagination, { "class": "mt-20", "prevUrl": page.url.prev, "nextUrl": page.url.next })} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/pt/blog/[...page].astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/pt/blog/[...page].astro";
const $$url = "/pt/blog/[...page]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
