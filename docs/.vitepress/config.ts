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
      background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), 
              url('/image-background.jpg') no-repeat center/cover;
        background-attachment: fixed; /* Ensures the background stays fixed while scrolling */
        

      }

      /* Style for the main content container */
      .VPContent {
        background: white; /* Ensure content has a white background */
        max-width: 1200px; /* Limit the content width */
        margin: 0 auto; /* Center the content horizontally */
        padding: 20px; /* Add padding inside the content area */
        border-radius: 8px; /* Optional: Add rounded corners */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better contrast */
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
          margin: 10px; /* Add margin on smaller screens */
        }
      }
      `,
    ],
  ],
});
