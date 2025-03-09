import { computed } from "vue";

const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

export function useBlogData() {
  const blogs = computed(() => {
    if (!blogFiles || Object.keys(blogFiles).length === 0) {
      console.warn("⚠️ No Markdown files found in /blog/. Ensure the directory contains .md files.");
      return [];
    }

    console.log(`🚀 Loaded ${Object.keys(blogFiles).length} Blog Files:`, Object.keys(blogFiles));

    return Object.entries(blogFiles)
      .map(([path, mod]) => {
        let frontmatter = mod.frontmatter || mod.default?.frontmatter || mod.__pageData?.frontmatter || {};

        const title = frontmatter.title || "Untitled Blog";
        const content = frontmatter.content || "No content available.";
        let formattedDate = "Invalid Date";

        if (frontmatter.date) {
          const dateObj = new Date(frontmatter.date);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toDateString();
          }
        }

        return {
          url: path.replace("/blog", "/industry5-site/blog").replace(".md", ""),
          title,
          tags: frontmatter.tags || [],
          date: formattedDate,
          content,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  console.log("📢 Final Blogs Loaded:", blogs.value);
  return { blogs };
}
