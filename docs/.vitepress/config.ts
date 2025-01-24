import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: '/industry5-site/', // Use '/' for local development
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Store', link: '/Store' },
      { text: 'Blog', link: '/blog/' }, // Add a main Blog link
    ],
    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: fs.readdirSync(path.resolve(__dirname, './blog'))
            .filter((file) => file.endsWith('.md')) // Only include Markdown files
            .map((file) => ({
              text: file.replace('.md', '').replace(/-/g, ' '), // Convert filenames to titles
              link: `/blog/${file.replace('.md', '')}`, // Generate links for each blog
            })),
        },
      ],
    },
  },
})
