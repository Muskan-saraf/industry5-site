import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default {
  base: '/industry5-site/', // Ensure this matches your GitHub repository name
  title: "Industry 5.0 Hub",
  description: "Your go-to resource for Industry 5.0 insights and tools.",
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Store', link: '/Store' },
      { text: 'Blog', link: '/blog' },
    ],
    sidebar: {
      '/blog/': fs
        .readdirSync(path.resolve(__dirname, '../blog'))
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
          const filePath = path.resolve(__dirname, '../blog', file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(content); // Extract front matter
          return {
            text: data.title || file.replace('.md', ''), // Use front matter `title` or filename as fallback
            link: `/blog/${file.replace('.md', '')}`,
          };
        }),
    },
  },
  markdown: {
    config: (md) => {
      const defaultRender =
        md.renderer.rules.heading_open ||
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

      // Render front matter metadata
      md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        if (idx === 0 && env.frontmatter) {
          const frontmatter = env.frontmatter;
          const title = frontmatter.title ? `<h1>${frontmatter.title}</h1>` : '';
          const date = frontmatter.date ? `<p><strong>Date:</strong> ${frontmatter.date}</p>` : '';
          const category = frontmatter.category
            ? `<p><strong>Category:</strong> ${frontmatter.category}</p>`
            : '';
          return `${title}${date}${category}${defaultRender(tokens, idx, options, env, self)}`;
        }
        return defaultRender(tokens, idx, options, env, self);
      };
    },
  },
};
