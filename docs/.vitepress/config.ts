import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: "/industry5-site/", // ✅ Ensure this matches your GitHub repo
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },  // ✅ No `.html`
      { text: "Subscribe", link: "/subscribe" },
      { text: "Contact", link: "/contact" },
    ],
    footer: {
      message: "© 2025 Industry 5.0 Hub. All Rights Reserved.",
    },
  },
});
