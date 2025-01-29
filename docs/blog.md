# Blog
<script setup>
import { ref, computed, onMounted } from "vue";
const posts = ref([]);
const categories = ref(["All"]);
const selectedCategory = ref("All");
const searchQuery = ref("");

onMounted(() => {
  // Add console.log to see what files are being found
  const blogFiles = import.meta.glob("/blog/*.md", { eager: true });
  console.log('Found blog files:', blogFiles);

  const blogPosts = Object.values(blogFiles).map((module) => {
    console.log('Processing module:', module); // Add this debug line
    const { frontmatter } = module;
    const category = frontmatter?.category || "Uncategorized";
    if (!categories.value.includes(category)) {
      categories.value.push(category);
    }
    return {
      url: `/blog/${frontmatter?.title.replace(/\s+/g, '-').toLowerCase()}`, // Simplified URL
      title: frontmatter?.title || "Untitled",
      date: frontmatter?.date || "1970-01-01",
      category,
    };
  });
  
  posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log('Processed posts:', posts.value); // Add this debug line
});

// Rest of your code remains the same...
</script>

<template>
  <div class="search-bar">
    <input v-model="searchQuery" type="text" placeholder="Search blogs..." />
  </div>

  <div class="category-filter">
    <label for="category">Category:</label>
    <select v-model="selectedCategory" id="category">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>

  <div v-if="filteredPosts.length > 0">
    <div v-for="post in filteredPosts" :key="post.url" class="blog-item">
      <a :href="post.url" class="blog-title">{{ post.title }}</a>
      <p class="blog-date">{{ formatDate(post.date) }} | {{ post.category }}</p>
    </div>
  </div>
  <p v-else>No blogs found.</p>
</template>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.category-filter {
  margin-bottom: 1rem;
}

.category-filter label {
  margin-right: 0.5rem;
  font-weight: bold;
}

.category-filter select {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
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
