<template>
  <div class="blog-list">
    <div v-for="post in posts" :key="post.url" class="blog-item">
      <div class="blog-date">{{ formatDate(post.date) }}</div>
      <a :href="post.url" class="blog-title">{{ post.title }}</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "BlogList",
  setup() {
    const posts = ref([]);

    onMounted(async () => {
      try {
        // Import all blog posts dynamically
        const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

        // Process and extract posts with metadata
        const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
          const { frontmatter } = module;
          return {
            url: path.replace(".md", ""), // Remove `.md` for proper routing
            title: frontmatter?.title || path.split("/").pop().replace(".md", ""),
            date: frontmatter?.date || "1970-01-01", // Default to a very old date
          };
        });

        // Sort posts by date (most recent first)
        posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      } catch (error) {
        console.error("Error loading blog posts:", error);
      }
    });

    // Format date for display
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return {
      posts,
      formatDate,
    };
  },
});
</script>

<style scoped>
.blog-list {
  margin-top: 2rem;
}

.blog-item {
  margin-bottom: 1.5rem;
}

.blog-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}
</style>
