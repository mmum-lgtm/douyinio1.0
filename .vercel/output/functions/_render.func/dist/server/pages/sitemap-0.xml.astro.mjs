export { renderers } from '../renderers.mjs';

const GET = async () => {
  const pages = [
    { url: "https://tiktokio.cam/", changefreq: "daily", priority: 1 },
    { url: "https://tiktokio.cam/about/", changefreq: "yearly", priority: 0.5 },
    { url: "https://tiktokio.cam/blog/how-to-save-tiktok-videos-without-watermark/", changefreq: "monthly", priority: 0.8 },
    { url: "https://tiktokio.cam/contact/", changefreq: "yearly", priority: 0.5 },
    { url: "https://tiktokio.cam/privacy-policy/", changefreq: "yearly", priority: 0.3 },
    { url: "https://tiktokio.cam/savetik-downloader-download-tiktok-videos-without-watermark/", changefreq: "weekly", priority: 0.9 },
    { url: "https://tiktokio.cam/musically-down/", changefreq: "weekly", priority: 0.9 }
  ];
  const lastmod = (/* @__PURE__ */ new Date()).toISOString();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
