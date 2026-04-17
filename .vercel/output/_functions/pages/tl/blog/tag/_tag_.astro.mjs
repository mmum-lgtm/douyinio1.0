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
    return lang === "tl";
  });
  const tags = /* @__PURE__ */ new Set();
  localizedPosts.map((post) => {
    Array.isArray(post.data.tags) && post.data.tags.map((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).map((tag) => {
    return {
      params: { tag },
      props: {
        posts: localizedPosts.filter(
          (post) => Array.isArray(post.data.tags) && post.data.tags.find((elem) => elem.toLowerCase() === tag)
        ),
        tag,
        lang: "tl"
      }
    };
  });
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { posts, tag, lang } = Astro2.props;
  getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "dir": lang === "tl" ? "ltr" : "ltr" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Sectionhead", $$Sectionhead, {}, { "desc": async ($$result4) => renderTemplate`${renderComponent($$result4, "Fragment", Fragment, { "slot": "desc" }, { "default": async ($$result5) => renderTemplate`We write about building startups and thoughts going on our mind.` })}`, "title": async ($$result4) => renderTemplate`${renderComponent($$result4, "Fragment", Fragment, { "slot": "title" }, { "default": async ($$result5) => renderTemplate`#${tag}` })}` })} ${renderComponent($$result3, "Posts", $$Posts, { "posts": posts })} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/tl/blog/tag/[tag].astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/tl/blog/tag/[tag].astro";
const $$url = "/tl/blog/tag/[tag]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$tag,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
