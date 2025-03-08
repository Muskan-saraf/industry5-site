import { ref, onMounted } from "vue";

const blogs = ref([]);

export function useBlogData() {
  onMounted(() => {
    const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

    console.log("🚀 Loaded Blog Files:", Object.keys(blogFiles)); // Debugging

    if (Object.keys(blogFiles).length === 0) {
      console.error("❌ No Markdown files found in /blog/");
    }

    blogs.value = Object.entries(blogFiles)
      .map(([path, mod]) => {
        let frontmatter = mod.frontmatter || mod.default?.frontmatter || mod.__pageData?.frontmatter || {};

        // ✅ Get content directly from frontmatter
        const content = frontmatter.content || "No content available.";

        const title = frontmatter.title || "Untitled Blog";
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

    console.log("📢 Final Blogs Loaded:", blogs.value);
  });

  return { blogs };
}
