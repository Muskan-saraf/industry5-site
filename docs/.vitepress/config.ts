import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Industry 5.0 Hub',
  description: 'Your go-to resource for Industry 5.0 insights and tools.',
  base: '/industry5-site/',
  themeConfig: {
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Blog', link: '/blog' },
      { text: 'Store', link: '/store' },
      { text: 'Getting Started', link: '/getting-started' },
    ],
    footer: {
      message: '© 2025 Industry 5.0 Hub. All Rights Reserved.',
    },
  },
  head: [
    [
      'style',
      {},
      `
      /* Set the body background to the image */
      body {
        background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)) no-repeat center/cover;
        background-attachment: fixed; /* Ensures the background stays fixed while scrolling */
      }

      /* Style for the main content container */
      .VPContent {
        background: white;
        max-width: 90%;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      /* Apply a gradient background to the header */
      header.VPNav {
        background: linear-gradient(135deg, #3498db, #2ecc71) !important; /* Gradient colors */
        color: white !important;
        position: sticky; /* Makes the header stick to the top */
        top: 0;
        z-index: 1000;
        height: 60px; /* Adjust height as needed */
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

      /* Responsive adjustments for smaller screens */
      @media (max-width: 768px) {
        header.VPNav {
          font-size: 0.9em !important;
        }

        .VPContent {
          margin: 20px 10px; /* Add smaller margin on smaller screens */
        }
      }
      `,
    ],
  ],
});
