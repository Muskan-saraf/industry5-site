<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);

onMounted(async () => {
  const blogFiles = import.meta.glob('/blog/*.md', { eager: true });

  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    const { frontmatter } = module;
    return {
      url: `/industry5-site${path.replace('.md', '')}`, // URL for the blog post
      title: frontmatter?.title || "Untitled Post",    // Title from frontmatter or fallback
      date: frontmatter?.date || '1970-01-01',        // Date from frontmatter or default
    };
  });

  // Sort posts by date (most recent first)
  posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Helper function to format dates
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<template>
  <div v-for="post in posts" :key="post.url" class="blog-item">
    <a :href="post.url" class="blog-title">{{ post.title }}</a>
    <div class="blog-date">{{ formatDate(post.date) }}</div>
  </div>
</template>

<style scoped>
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
