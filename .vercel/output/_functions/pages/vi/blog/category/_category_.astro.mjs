import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../../../../chunks/astro/server_CMB_St_3.mjs';
import 'piccolore';
import { g as getCollection } from '../../../../chunks/_astro_content_nKpnnJDh.mjs';
import { $ as $$Sectionhead, a as $$Posts } from '../../../../chunks/sectionhead_nAzeXUiS.mjs';
import { $ as $$Container } from '../../../../chunks/container_BNBUchRD.mjs';
import { g as getLangFromUrl, $ as $$Layout } from '../../../../chunks/Layout_DNd50Fmw.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => {
    return !data.draft && data.publishDate < /* @__PURE__ */ new Date();
  });
  const localizedPosts = posts.filter((page) => {
    const [lang, ...slug] = page.slug.split("/");
    return lang === "tr";
  });
  const categories = /* @__PURE__ */ new Set();
  localizedPosts.map((post) => {
    typeof post.data.category === "string" && categories.add(post.data.category.toLowerCase());
  });
  return Array.from(categories).map((category) => {
    return {
      params: { category },
      props: {
        posts: localizedPosts.filter(
          (post) => typeof post.data.category === "string" && post.data.category.toLowerCase() === category
        ),
        category,
        lang: "tr"
      }
    };
  });
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { posts, category, lang } = Astro2.props;
  getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "dir": lang === "tr" ? "ltr" : "ltr" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Sectionhead", $$Sectionhead, {}, { "desc": async ($$result4) => renderTemplate`${renderComponent($$result4, "Fragment", Fragment, { "slot": "desc" }, { "default": async ($$result5) => renderTemplate`We write about building startups and thoughts going on our mind.` })}`, "title": async ($$result4) => renderTemplate`${renderComponent($$result4, "Fragment", Fragment, { "slot": "title" }, { "default": async ($$result5) => renderTemplate`#${category}` })}` })} ${renderComponent($$result3, "Posts", $$Posts, { "posts": posts })} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/vi/blog/category/[category].astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/vi/blog/category/[category].astro";
const $$url = "/vi/blog/category/[category]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$category,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
