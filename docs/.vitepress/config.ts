import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: "/", // Use '/' for local development
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Store', link: '/Store' },
    ],
  },
})
