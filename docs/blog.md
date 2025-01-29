---
layout: doc
---

<script setup>
import { ref, onMounted, computed } from "vue";

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
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.tag-filter {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
}

.blog-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.blog-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}

.blog-meta {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand);
  color: white;
}
</style>