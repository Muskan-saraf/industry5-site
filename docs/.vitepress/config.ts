export default {
    title: "Industry 5.0 Hub",
    description: "Your go-to resource for Industry 5.0 insights and tools.",
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Categories', link: '/categories/what-is-industry5' },
        { text: 'Resources', link: '/resources/tools' },
        { text: 'Store', link: '/store' }, // Add the Store link here
        { text: 'Blog', link: '/blog/' },
      ],
      sidebar: {
        '/categories/': [
          { text: 'What is Industry 5.0?', link: '/categories/what-is-industry5' },
          { text: 'Case Studies', link: '/categories/case-studies' },
        ],
        '/resources/': [
          { text: 'Tools & Templates', link: '/resources/tools' },
        ],
        '/blog/': [
          { text: 'How AI is Shaping Industry 5.0', link: '/blog/ai-industry5' },
          { text: 'Human-Centric Design', link: '/blog/human-centric-design' },
        ],
        '/store/': [
          { text: 'Books on Industry 5.0', link: '/store#books-on-industry-5-0' },
          { text: 'Research Papers & Articles', link: '/store#research-papers-articles' },
        ],
      },
      search: true,
    },
  }
  