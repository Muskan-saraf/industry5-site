# Blog
<script setup>
import { ref, computed, onMounted } from "vue";

const posts = ref([]);
const selectedCategory = ref("All");
const searchQuery = ref("");

// Categories for filtering
const categories = [
  "All",
  "Human Centric",
  "Industry 5.0 Tech",
  "Sustainability",
  "Case Study / Applications",
  "Workforce Development",
  "Business Strategies",
  "Resources",
];

onMounted(() => {
  // Import Markdown files from the `docs/blog` directory
  const blogFiles = import.meta.glob('/docs/blog/*.md', { eager: true });

  console.log("Loaded Blog Files:", blogFiles); // Debug imported files

  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    const { frontmatter } = module;
    return {
      url: `/blog${path.replace('/docs/blog', '').replace('.md', '')}`, // Correct blog post URLs
      title: frontmatter?.title || path.split('/').pop().replace('.md', ''),
      date: frontmatter?.date || '1970-01-01',
      category: frontmatter?.category || "Uncategorized",
    };
  });

  posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log("Processed Blog Posts:", posts.value); // Debug processed posts
});

// Filter posts dynamically based on category and search query
const filteredPosts = computed(() => {
  let filtered = posts.value;

  if (selectedCategory.value !== "All") {
    filtered = filtered.filter((post) => post.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    filtered = filtered.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});
</script>

<template>
  <div>
    <!-- Category Filter -->
    <div class="filter-container">
      <label for="category-select" class="filter-label">Select Category:</label>
      <select id="category-select" v-model="selectedCategory" class="category-dropdown">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Search Bar -->
    <div class="search-container">
      <label for="search-input" class="search-label">Search:</label>
      <input
        id="search-input"
        v-model="searchQuery"
        class="search-input"
        placeholder="Search by title"
      />
    </div>

    <!-- Blog Posts -->
    <div v-if="filteredPosts.length === 0" class="no-posts">
      No posts found. Please refine your search or category selection.
    </div>
    <div v-else>
      <div v-for="post in filteredPosts" :key="post.url" class="blog-item">
        <a :href="post.url" class="blog-title">{{ post.title }}</a>
        <div class="blog-date">{{ post.date }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-container,
.search-container {
  margin-bottom: 1.5rem;
}

.filter-label,
.search-label {
  font-size: 1rem;
  font-weight: bold;
}

.category-dropdown,
.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.blog-item {
  margin-bottom: 1rem;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand, #007acc);
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}

.no-posts {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-top: 2rem;
}
</style>
