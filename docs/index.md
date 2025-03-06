<!-- ✅ Ensure spacing before content -->


<script setup>
import { ref, onMounted } from "vue";
import BlogLatest from "@theme/components/BlogList.vue";

// Optional: If you still want to fetch some posts for other reasons:
const posts = ref([]);

onMounted(() => {
  // Example: If your blog markdown files are actually located in /docs/blog/*.md
  // Adjust this path if your .md files are in a different folder
  const blogFiles = import.meta.glob("/docs/blog/*.md", { eager: true });

  console.log("Blog Files:", blogFiles); // Check what’s detected

  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    // If you want to parse front matter or do something else, do it here.
    console.log("Module for:", path, module);
    return { path };
  });

  console.log("Processed Blog Posts:", blogPosts);
  posts.value = blogPosts;
});
</script>

<!-- ✅ Render Blog List Below Ad -->
<BlogLatest />

<style scoped>
/* ✅ Ensure proper ad spacing */
.ad-banner {
  text-align: center;
  margin: 20px auto;
  max-width: 900px;
  padding: 15px;
  background: #fff; /* White background */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.ad-banner img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

/* ✅ Blog List Styles */
.blog-item {
  margin-bottom: 1.5rem;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: black !important;
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}
</style>
