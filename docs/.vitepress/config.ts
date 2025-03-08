import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: "/industry5-site/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/industry5-site/" },
      { text: "Subscribe", link: "/industry5-site/subscribe" },
      { text: "Contact", link: "/industry5-site/contact" },
    ],
    footer: {
      message: "© 2025 Industry 5.0 Hub. All Rights Reserved.",
    },
  },
});
