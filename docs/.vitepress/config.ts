import fs from 'fs'
import path from 'path'

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
                .readdirSync(path.resolve(__dirname, '../blog')) // Corrected path
                .filter((file) => file.endsWith('.md'))
                .map((file) => ({
                  text: file.replace('.md', '').replace(/-/g, ' '),
                  link: `/blog/${file.replace('.md', '')}`,
                })),
            },
          ]
        : [],
    },
  },
}
