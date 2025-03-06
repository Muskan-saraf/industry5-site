import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: "/industry5-site/", // Ensure correct deployment base
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Sustainability", link: "/sustainability" },
      { text: "Human Centric", link: "/human-centric" },
      { text: "Industry 5.0 Tech", link: "/industry-tech" },
      { text: "Case Studies", link: "/case-studies" },
      { text: "Workforce Development", link: "/workforce-development" },
      { text: "Business Strategies", link: "/business-strategies" },
      { text: "Resources", link: "/resources" },
    ],
    footer: {
      message: "© 2025 Industry 5.0 Hub. All Rights Reserved.",
    },
  },
});
