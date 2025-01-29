<script setup>
import { ref } from "vue";

const blogs = ref([
  {
    title: "Getting Started",
    url: "/getting-started",
    date: "2025-01-28",
    description: "Learn how to get started with VitePress.",
  },
  {
    title: "AI and Industry 5.0",
    url: "/20250129-ai",
    date: "2025-01-29",
    description: "How AI drives Industry 5.0 innovation.",
  },
]);

</script>

<template>
  <div class="blog-list">
    <h1>All Blogs</h1>
    <div class="blog-item" v-for="blog in blogs" :key="blog.url">
      <a :href="blog.url" class="blog-title">
        <h2>{{ blog.title }}</h2>
      </a>
      <p class="blog-date">Published on {{ blog.date }}</p>
      <p class="blog-description">{{ blog.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.blog-list {
  padding: 16px;
}

.blog-item {
  margin-bottom: 16px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 16px;
}

.blog-title {
  color: #007acc;
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}

.blog-date {
  font-size: 0.9rem;
  color: #666;
}

.blog-description {
  margin: 8px 0;
  color: #333;
}
</style>
