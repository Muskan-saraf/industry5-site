import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Industry 5.0 Hub',
  description: 'Your go-to resource for Industry 5.0 insights and tools.',
  base: '/industry5-site/',
  themeConfig: {
    nav: [
    
      {text: 'About', link: '/about'},
      { text: 'Blog', link: '/blog' },
      { text: 'Store', link: '/Store' },
      { text: 'Getting Started', link: '/getting-started' }
    ]
  },
  head: [
    [
      'style',
      {},
      `
      /* Apply a gradient background to the header */
      header.VPNav {
        background: linear-gradient(135deg, #3498db, #2ecc71) !important;
        color: white !important;
      }

      /* Style navigation links inside the header */
      header.VPNav a {
        color: white !important;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s, transform 0.3s;
      }

      /* Hover effect for links */
      header.VPNav a:hover {
        color: gray !important;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        transform: scale(1.1);
      }

      /* Make header responsive */
      @media (max-width: 768px) {
        header.VPNav {
          font-size: 0.9em !important;
        }
      }
      `
    ]
  ]
});
