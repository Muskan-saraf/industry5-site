import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: "/industry5-site/",  // Ensure this matches your repo name
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Industry 5.0 Tech", link: "/blog/industry5-tech" },
      { text: "Human Centric", link: "/blog/human-centric" },
      { text: "Sustainability", link: "/blog/sustainability" },
      { text: "Subscribe", link: "/subscribe" },
      { text: "Contact", link: "/contact" },
    ],
    sidebar: {
      "/blog/": [
        { text: "All Blogs", link: "/blog/" },
        { text: "Industry 5.0 Tech", link: "/blog/industry5-tech" },
        { text: "Human Centric", link: "/blog/human-centric" },
        { text: "Sustainability", link: "/blog/sustainability" },
      ]
    },
    footer: {
      message: "© 2025 Industry 5.0 Hub. All Rights Reserved.",
    },
  },
});
