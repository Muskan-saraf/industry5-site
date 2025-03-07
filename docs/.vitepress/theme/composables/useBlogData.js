import { ref, onMounted } from "vue";

const blogs = ref([]);

export function useBlogData() {
  onMounted(() => {
    const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

    console.log("🚀 Blog Files Loaded:", blogFiles); // Debug log

    blogs.value = Object.entries(blogFiles)
      .map(([path, mod]) => {
        console.log(`📂 Processing file: ${path}`, mod); // Log module details

        let frontmatter = {};
        let content = "";

        // ✅ Extract frontmatter correctly
        if (mod.frontmatter) {
          frontmatter = mod.frontmatter;
        } else if (mod.default?.frontmatter) {
          frontmatter = mod.default.frontmatter;
        } else if (mod.__pageData?.frontmatter) {
          frontmatter = mod.__pageData.frontmatter;
        }

        // ✅ Extract content correctly from multiple sources
        if (mod.default?.content) {
          content = mod.default.content;
        } else if (mod.__pageData?.content) {
          content = mod.__pageData.content;
        } else if (mod.default) {
          content = typeof mod.default === "string" ? mod.default : "";
        }

        // ✅ Fix title issue
        const title = frontmatter.title || "Untitled Blog";

        // ✅ Fix date issue
        let formattedDate = "Invalid Date";
        if (frontmatter.date) {
          const dateObj = new Date(frontmatter.date);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toDateString();
          }
        }

        console.log("✅ Extracted Blog Data:", {
          title,
          date: formattedDate,
          tags: frontmatter.tags,
          content: content.slice(0, 100) + "...", // First 100 chars
        });

        return {
          url: path.replace("/blog", "/industry5-site/blog").replace(".md", ""),
          title,
          tags: frontmatter.tags || [],
          date: formattedDate,
          content: content || "No content available.",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log("📢 Final Processed Blogs:", blogs.value); // Log final output
  });

  return { blogs };
}
