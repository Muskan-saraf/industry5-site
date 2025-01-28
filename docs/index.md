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

onMounted(async () => {
  const blogFiles = import.meta.glob('/blog/*.md', { eager: true });

  console.log('Blog Files:', blogFiles); // Log all blog files detected

  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    const content = module.default || '';
    console.log('Raw Content for:', path, '\n', content); // Log raw content for each file

    // Extract the first line starting with #
    const title = content
      .split('\n')
      .find((line) => line.trim().startsWith('#'))
      ?.replace('#', '')
      .trim();

    console.log('Extracted Title for:', path, '\n', title); // Log the extracted title

    if (!title) return null; // Skip files without a valid title

    return {
      url: path.replace('.md', ''), // Remove .md from the URL
      title, // Extracted title
    };
  });

  console.log('Processed Blog Posts:', blogPosts); // Log final processed posts

  posts.value = blogPosts.filter((post) => post !== null); // Remove null entries
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
