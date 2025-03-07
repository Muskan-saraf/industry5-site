<!-- ✅ Ensure spacing before content -->


<script setup>
import { ref, onMounted } from "vue";
import BlogLatest from "@theme/components/BlogList.vue";

// Optional: If you still want to fetch some posts for other reasons:
const posts = ref([]);

onMounted(() => {
  // Example: If your blog markdown files are actually located in /docs/blog/*.md
  // Adjust this path if your .md files are in a different folder
  const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

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

