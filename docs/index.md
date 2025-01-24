<!-- Industry 5.0 Hub Homepage -->

# Welcome to the Industry 5.0 Hub

Discover how humans and advanced technologies collaborate to create a sustainable and personalized future.

---

## Featured Topics

### [What is Industry 5.0?](/categories/what-is-industry5)
Explore the principles and innovations of Industry 5.0.

### [Tools & Templates](/resources/tools)
Get access to essential tools and templates for implementation.

### [Case Studies](/categories/case-studies)
Learn from real-world Industry 5.0 examples.

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);

onMounted(() => {
  // Dynamically import all blog files
  const blogFiles = import.meta.glob('/blog/*.md', { eager: true });

  const blogPosts = Object.entries(blogFiles)
    .map(([path, module]) => {
      const content = module.default || ''; // Get the file content
      // Extract the first line starting with # as the title
      const title = content
        .split('\n') // Split content into lines
        .find((line) => line.trim().startsWith('#')) // Find the first line starting with #
        ?.replace('#', '') // Remove the `#`
        .trim(); // Trim leading and trailing whitespace

      // If no title is found, skip this file
      if (!title) return null;

      return {
        url: path.replace('.md', ''), // Remove .md from the path for clean URLs
        title, // Use the extracted title
      };
    })
    .filter((post) => post !== null); // Remove null entries (files without a title)

  posts.value = blogPosts; // Assign processed posts to the ref
});
</script>

## Latest Blog Posts

<div v-for="post in posts" :key="post.url" class="blog-item">
  <a :href="post.url" class="blog-title">{{ post.title }}</a>
</div>

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
