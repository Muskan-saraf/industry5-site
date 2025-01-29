# blog
---
layout: doc
---

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const searchQuery = ref('');
const selectedTag = ref('');

onMounted(async () => {
  const blogFiles = import.meta.glob('../blog/*.md', { eager: true });
  
  posts.value = Object.entries(blogFiles).map(([path, module]) => {
    const { frontmatter } = module;
    const filename = path.split('/').pop().replace('.md', '');
    
    return {
      url: `/blog/${filename}`,
      title: frontmatter?.title || filename,
      date: frontmatter?.date || '',
      tags: Array.isArray(frontmatter?.tags) ? frontmatter.tags : []
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
});

const formatDate = (date) => 
  date ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : '';

// Filtered posts computation
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTag = !selectedTag.value || post.tags.includes(selectedTag.value);
    return matchesSearch && matchesTag;
  });
});

const allTags = computed(() => {
  const tags = new Set();
  posts.value.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
});
</script>

<template>
  <div class="blog-container">
    <div class="filters">
      <input 
        v-model="searchQuery" 
        type="search" 
        placeholder="Search posts..."
        class="search-input"
      >
      
      <select v-model="selectedTag" class="tag-filter">
        <option value="">All Categories</option>
        <option v-for="tag in allTags" :key="tag" :value="tag">
          {{ tag }}
        </option>
      </select>
    </div>

    <div v-for="post in filteredPosts" :key="post.url" class="blog-item">
      <a :href="post.url" class="blog-title">{{ post.title }}</a>
      <div class="blog-meta">
        <span v-if="post.date" class="blog-date">{{ formatDate(post.date) }}</span>
        <div class="tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag" 
            class="tag"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep your existing styles here */
</style>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.search-container input,
.search-container select {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.blog-item {
  margin-bottom: 1rem;
}

.blog-date {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}
</style>
