import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

function getBlogPosts() {
  const postsDir = path.join(__dirname, '../blog');
  try {
    return fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => b.localeCompare(a)) // Newest first
      .map(file => ({
        text: file.replace('.md', '')
                  .replace(/\d{4}-\d{2}-\d{2}-/g, '') // Remove date prefix
                  .replace(/-/g, ' '),
        link: `/blog/${file.replace('.md', '')}`
      }));
  } catch (e) {
    return []; // Return empty array if directory doesn't exist
  }
}

export default defineConfig({
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: '/industry5-site/',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Store', link: '/Store' },
      { text: 'Blog', link: '/blog' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: 'Latest Posts',
          items: getBlogPosts()
        }
      ]
    }
  },
  
});