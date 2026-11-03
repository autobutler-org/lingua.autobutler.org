import { site } from "./data/copy";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-08-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  /*
   * Fonts are self-hosted: @fontsource packages are bundled into the build, so
   * no request ever leaves for a font CDN.
   */
  css: [
    "@fontsource-variable/newsreader/opsz.css",
    "@fontsource-variable/newsreader/opsz-italic.css",
    "@fontsource-variable/geist",
    "@fontsource-variable/geist-mono",
    "~/assets/main.css",
  ],
  nitro: {
    static: true,
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Lingua",
      meta: [
        { name: "description", content: site.description },
        { property: "og:site_name", content: "Lingua" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Lingua" },
        { property: "og:description", content: site.description },
        { property: "og:url", content: site.url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: "Lingua" },
        { name: "twitter:description", content: site.description },
        { name: "theme-color", content: "#f7f6f3", media: "(prefers-color-scheme: light)" },
        { name: "theme-color", content: "#161615", media: "(prefers-color-scheme: dark)" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
});
