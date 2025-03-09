import { computed } from "vue";

const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

export function useBlogData() {
  const blogs = computed(() =>
    Object.entries(blogFiles)
      .map(([path, mod]) => {
        let frontmatter = mod.frontmatter || mod.default?.frontmatter || mod.__pageData?.frontmatter || {};
        
        return {
          url: path.replace("/blog", "/industry5-site/blog").replace(".md", ""),
          title: frontmatter.title || "Untitled Blog",
          tags: frontmatter.tags || [],
          date: frontmatter.date || null,
          content: frontmatter.content || "No content available.",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  console.log("📢 Final Blogs Loaded:", blogs.value);
  return { blogs };
}
