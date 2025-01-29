import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default {
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  base: '/industry5-site/',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Store', link: '/Store' },
      { text: 'Blog', link: '/blog' },
    ],
    sidebar: {
      '/blog/': fs.existsSync(path.resolve(__dirname, '../blog'))
        ? [
            {
              text: 'Blog',
              items: fs
                .readdirSync(path.resolve(__dirname, '../blog'))
                .filter((file) => file.endsWith('.md'))
                .map((file) => {
                  const filePath = path.resolve(__dirname, '../blog', file);
                  const content = fs.readFileSync(filePath, 'utf-8');
                  const { data } = matter(content); // Extract front matter
                  return {
                    text: data.title || file.replace('.md', ''),
                    link: `/blog/${file.replace('.md', '')}`,
                  };
                }),
            },
          ]
        : [],
    },
  },
  markdown: {
    config: (md) => {
      // Customize Markdown rendering if needed
    },
  },
};
