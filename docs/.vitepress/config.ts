import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getBlogPosts() {
  const postsDir = path.join(__dirname, '../blog'); // Path to the blog folder
  try {
    return fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md')) // Only process Markdown files
      .map(file => {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content); // Parse frontmatter
        
        return {
          text: data.title || file.replace('.md', ''), // Title or fallback to filename
          link: `/blog/${file.replace('.md', '')}`, // Correct link to blog
          date: data.date || '1970-01-01', // Date or fallback
          tags: data.tags || [] // Extract tags from frontmatter
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
  } catch (e) {
    console.error('Error reading blog posts:', e);
    return [];
  }
}

export default {
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
  }
};
