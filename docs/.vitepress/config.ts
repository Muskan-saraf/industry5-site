import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: process.env.NODE_ENV === "production" ? "/industry5-site/" : "/", // ✅ Fix base for dev/prod
  themeConfig: {
    nav: [
      { text: "Home", link: "/" }, // ✅ Keep it root-relative
      { text: "Subscribe", link: "/subscribe" },
      { text: "Contact", link: "/contact" },
    ],
    footer: {
      message: "© 2025 Industry 5.0 Hub. All Rights Reserved.",
    },
  },
});
