import { defineConfig } from 'vitepress';
import '../styles/custom.css';

export default defineConfig({
  title: 'Industry 5.0 Hub',
  description: 'Your go-to resource for Industry 5.0 insights and tools.',
  base: '/industry5-site/',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Store', link: '/Store' },
      { text: 'Blog', link: '/blog' }
    ]
  },
  markdown: {
    config: (md) => {
      md.renderer.rules.frontmatter = (tokens, idx, options, env) => {
        console.log('Frontmatter Debug:', env.frontmatter);
        return '';
      };
    }
  },
  head: [
    ['link', { rel: 'stylesheet', href: '/styles/custom.css' }]
  ]
});
