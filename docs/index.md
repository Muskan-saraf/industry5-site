<!-- docs/index.md or similar homepage file -->

# Welcome to the Industry 5.0 Hub

Discover how humans and advanced technologies collaborate to create a sustainable and personalized future.


<script setup>
import { ref, onMounted } from "vue";
import BlogLatest from "../components/LatestBlog.vue";

// Optional: If you still want to fetch some posts for other reasons:
const posts = ref([]);

onMounted(() => {
  // Example: If your blog markdown files are actually located in /docs/blog/*.md
  // Adjust this path if your .md files are in a different folder
  const blogFiles = import.meta.glob("/docs/blog/*.md", { eager: true });

  console.log("Blog Files:", blogFiles); // Check what’s detected

  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    // If you want to parse front matter or do something else, do it here.
    // For now, just log the module:
    console.log("Module for:", path, module);

    // Return a simplified object or do nothing:
    return { path };
  });

  console.log("Processed Blog Posts:", blogPosts);
  posts.value = blogPosts;
});
</script>

<!-- Render your LatestBlog component here -->
<BlogLatest />

<style scoped>
.blog-item {
  margin-bottom: 1.5rem;
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
