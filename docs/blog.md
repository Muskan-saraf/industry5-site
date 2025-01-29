<script setup>
import { ref, computed, onMounted } from "vue";

const posts = ref([]);
const categories = ref(new Set());
const selectedCategory = ref("All");
const searchQuery = ref("");

onMounted(async () => {
  const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    const { frontmatter } = module;
    const category = frontmatter?.category || "Uncategorized";
    
    categories.value.add(category);

    return {
      url: `/industry5-site${path.replace('.md', '')}`,
      title: frontmatter?.title || path.split('/').pop().replace('.md', ''),
      date: frontmatter?.date || "1970-01-01",
      category,
    };
  });

  posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Filtered posts based on category and search query
const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesCategory =
      selectedCategory.value === "All" || post.category === selectedCategory.value;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<template>
  <div class="search-bar">
    <input v-model="searchQuery" type="text" placeholder="Search blogs..." />
  </div>

  <div class="category-filter">
    <label for="category">Category:</label>
    <select v-model="selectedCategory" id="category">
      <option value="All">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>

  <div v-for="post in filteredPosts" :key="post.url" class="blog-item">
    <a :href="post.url" class="blog-title">{{ post.title }}</a>
    <p class="blog-date">{{ formatDate(post.date) }} | {{ post.category }}</p>
  </div>
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
