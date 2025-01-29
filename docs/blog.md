<script setup>
import { ref, computed, onMounted } from "vue";

// Initialize with empty arrays
const posts = ref([]);
const categories = ref(["All"]);
const selectedCategory = ref("All");
const searchQuery = ref("");

// Define computed property with null checks
const filteredPosts = computed(() => {
  if (!posts.value) return [];
  
  return posts.value.filter((post) => {
    if (!post) return false;
    
    const matchesCategory =
      selectedCategory.value === "All" || post.category === selectedCategory.value;
    const matchesSearch = post.title
      ?.toLowerCase()
      ?.includes(searchQuery.value?.toLowerCase() || "");
    
    return matchesCategory && matchesSearch;
  });
});

// Format date with error handling
const formatDate = (date) => {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return date;
  }
};

onMounted(async () => {
  try {
    const blogFiles = import.meta.glob("/blog/*.md", { eager: true });
    
    const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
      try {
        const { frontmatter } = module;
        if (!frontmatter) return null;

        const category = frontmatter.category || "Uncategorized";
        if (!categories.value.includes(category)) {
          categories.value.push(category);
        }

        return {
          url: `/blog/${(frontmatter.title || "untitled").replace(/\s+/g, '-').toLowerCase()}`,
          title: frontmatter.title || "Untitled",
          date: frontmatter.date || "1970-01-01",
          category,
        };
      } catch (e) {
        console.error(`Error processing blog post at ${path}:`, e);
        return null;
      }
    }).filter(Boolean); // Remove null entries

    posts.value = blogPosts.sort((a, b) => {
      try {
        return new Date(b.date) - new Date(a.date);
      } catch (e) {
        return 0;
      }
    });
  } catch (e) {
    console.error("Error loading blog posts:", e);
    posts.value = [];
  }
});
</script>

<template>
  <div>
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search blogs..." 
      />
    </div>

    <div class="category-filter">
      <label for="category">Category:</label>
      <select 
        v-model="selectedCategory" 
        id="category"
      >
        <option 
          v-for="category in categories" 
          :key="category" 
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div v-if="filteredPosts && filteredPosts.length > 0">
      <div 
        v-for="post in filteredPosts" 
        :key="post.url" 
        class="blog-item"
      >
        <a :href="post.url" class="blog-title">{{ post.title }}</a>
        <p class="blog-date">
          {{ formatDate(post.date) }} | {{ post.category }}
        </p>
      </div>
    </div>
    <p v-else>No blogs found.</p>
  </div>
</template>

<style scoped>
/* Your existing styles remain the same */
</style>