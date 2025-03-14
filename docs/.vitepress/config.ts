import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: "/industry5-site/",  // ✅ Make sure this matches your GitHub Pages repo
  themeConfig: {
    nav: [
      { text: "Home", link: "/index.html" },  // ✅ Must include .html
      { text: "Subscribe", link: "/subscribe.html" },
      { text: "Contact", link: "/contact.html" },
    ],
    footer: {
      message: "© 2025 Industry 5.0 Hub. All Rights Reserved.",
    },
  },
});
