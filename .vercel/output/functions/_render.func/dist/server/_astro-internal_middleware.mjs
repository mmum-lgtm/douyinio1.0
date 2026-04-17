import { d as defineMiddleware, s as sequence } from './chunks/index_oqH0Fnb8.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Boaqp4w0.mjs';
import 'piccolore';
import './chunks/astro/server_CMB_St_3.mjs';
import 'clsx';

const supportedLocales = [
  "en",
  "it",
  "vi",
  "ar",
  "fr",
  "de",
  "es",
  "hi",
  "id",
  "ru",
  "pt",
  "ko",
  "tl",
  "nl",
  "ms",
  "tr"
];
const defaultLocale = "en";
function getLocaleFromCountry(countryCode) {
  if (!countryCode) return null;
  const code = countryCode.toUpperCase();
  if (code === "ID") return "id";
  if (code === "VN") return "vi";
  if (code === "IN") return "hi";
  if (code === "PH") return "tl";
  if (code === "MY") return "ms";
  if (["SA", "AE", "EG", "MA", "DZ", "IQ", "JO", "KW", "LB", "OM", "QA", "SY", "YE", "BH", "TN", "LY"].includes(code)) return "ar";
  if (["ES", "MX", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU", "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY"].includes(code)) return "es";
  if (["FR", "BE", "CH", "CA", "LU", "MC", "CI", "CM", "CD", "MG", "SN", "ML"].includes(code)) return "fr";
  if (["PT", "BR", "AO", "MZ"].includes(code)) return "pt";
  if (["DE", "AT", "LI"].includes(code)) return "de";
  if (["IT", "SM", "VA"].includes(code)) return "it";
  if (code === "KR") return "ko";
  if (["NL", "SR"].includes(code)) return "nl";
  if (["RU", "BY", "KZ", "KG"].includes(code)) return "ru";
  if (["TR", "CY"].includes(code)) return "tr";
  return null;
}
const onRequest$1 = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  if (pathname.startsWith("/api/") || pathname.startsWith("/admin/") || pathname.startsWith("/_") || pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico|json|xml|txt|avif|woff|woff2|ttf|eot)$/) || pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname === "/ads.txt" || pathname.includes("/rss.xml")) {
    return next();
  }
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0] || "";
  const nonDefaultLocales = supportedLocales.filter((l) => l !== defaultLocale);
  const hasLocalePrefix = nonDefaultLocales.includes(firstSegment);
  if (!hasLocalePrefix && (pathname === "/" || !nonDefaultLocales.some((l) => pathname.startsWith(`/${l}/`)))) {
    let detectedLocale = defaultLocale;
    let shouldRedirect = false;
    const localeCookie = context.cookies.get("user-locale")?.value;
    if (localeCookie && supportedLocales.includes(localeCookie)) {
      detectedLocale = localeCookie;
      if (detectedLocale !== defaultLocale) shouldRedirect = true;
    } else {
      const countryHeader = context.request.headers.get("x-vercel-ip-country") || context.request.headers.get("cf-ipcountry") || context.request.headers.get("x-country-code");
      const countryLocale = getLocaleFromCountry(countryHeader);
      if (countryLocale && countryLocale !== defaultLocale) {
        detectedLocale = countryLocale;
        shouldRedirect = true;
      } else {
        const acceptLanguage = context.request.headers.get("accept-language");
        if (acceptLanguage) {
          const languages = acceptLanguage.split(",").map((part) => {
            const [locale, q = "q=1"] = part.trim().split(";");
            const quality = parseFloat(q.replace("q=", "") || "1");
            return { locale: locale.split("-")[0].toLowerCase(), quality };
          }).sort((a, b) => b.quality - a.quality);
          for (const { locale } of languages) {
            if (supportedLocales.includes(locale) && locale !== defaultLocale) {
              detectedLocale = locale;
              shouldRedirect = true;
              break;
            }
          }
        }
      }
    }
    if (shouldRedirect && detectedLocale !== defaultLocale) {
      let cleanPath = pathname.replace(/^\/(it|vi|ar|fr|de|es|hi|id|ru|pt|ko|tl|nl|ms|tr)\//, "/");
      const newPath = `/${detectedLocale}${cleanPath === "/" ? "" : cleanPath}${url.search}`;
      return context.redirect(newPath, 302);
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
