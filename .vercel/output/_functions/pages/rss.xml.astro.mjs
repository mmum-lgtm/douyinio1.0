import { g as getCollection } from '../chunks/_astro_content_nKpnnJDh.mjs';
import rss from '@astrojs/rss';
export { renderers } from '../renderers.mjs';

const get = async () => {
  const posts = await getCollection("blog", ({ data }) => {
    return !data.draft && data.publishDate < /* @__PURE__ */ new Date();
  });
  posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  return rss({
    title: `Astros`,
    description: "Astros - Starter Template for Astro with Tailwind CSS",
    site: "https://tiktokio.cam",
    items: posts.map((post) => ({
      link: post.slug,
      title: post.data.title,
      description: post.data.snippet,
      pubDate: post.data.publishDate
    }))
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	get
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
