<script setup>
import { ref, computed, onMounted } from "vue";

// Reactive references for posts, categories, selected category, and search query
const posts = ref([]);
const categories = ref(["All"]);
const selectedCategory = ref("All");
const searchQuery = ref("");

// Fetch blog posts dynamically on mount
onMounted(() => {
  const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

  const blogPosts = Object.values(blogFiles).map((module) => {
    const { frontmatter } = module;

    const category = frontmatter?.category || "Uncategorized";

    // Dynamically add categories if not already included
    if (!categories.value.includes(category)) {
      categories.value.push(category);
    }

    return {
      url: `/industry5-site/blog/${frontmatter?.title.replace(/\s+/g, "-").toLowerCase()}`,
      title: frontmatter?.title || "Untitled",
      date: frontmatter?.date || "1970-01-01",
      category,
    };
  });

  // Sort posts by date (newest first)
  posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Computed property to filter posts based on category and search query
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

// Helper to format dates
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<template>
  <div class="search-container">
    <!-- Search Input -->
    <input v-model="searchQuery" type="text" placeholder="Search blogs..." />

    <!-- Category Dropdown -->
    <select v-model="selectedCategory">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>

  <!-- Blog List -->
  <div v-if="filteredPosts.length">
    <div v-for="post in filteredPosts" :key="post.url" class="blog-item">
      <a :href="post.url" class="blog-title">{{ post.title }}</a>
      <p class="blog-date">{{ formatDate(post.date) }} | {{ post.category }}</p>
    </div>
  </div>
  <p v-else>No blogs found.</p>
</template>

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
