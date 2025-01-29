<template>
  <div>
    <!-- Categories -->
    <ul class="categories">
      <li
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="{ active: selectedCategory === category }"
        style="cursor: pointer; margin-right: 1rem; display: inline-block;"
      >
        {{ category }}
      </li>
    </ul>

    <!-- Search Bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search blogs..."
      style="padding: 0.5rem; margin-bottom: 1rem; width: 100%;"
    />

    <!-- Blog List -->
    <div v-if="filteredBlogs.length === 0">
      <p>No blogs found for the selected category or search query.</p>
    </div>
    <ul v-else>
      <li v-for="post in filteredBlogs" :key="post.url" class="blog-item">
        <!-- Blog Title -->
        <a :href="post.url" class="blog-title">{{ post.title }}</a>
        <!-- Tags Below Title -->
        <div v-if="post.tags.length" class="blog-tags">
          Tags:
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="blog-tag"
          >
            {{ tag }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const blogs = ref([]);
const categories = ref(["All", "Sustainability", "Human Centric","Industry 5.0 Tech","Case Study / Applications","Workforce development","Business Strategies","Resources"]);
const selectedCategory = ref("All");
const searchQuery = ref("");

onMounted(() => {
  const blogFiles = import.meta.glob('../docs/blog/*.md', { eager: true });
  blogs.value = Object.entries(blogFiles).map(([path, module]) => {
    const { frontmatter } = module;
    return {
      url: path.replace('../docs/blog', '/blog').replace('.md', '.html'),
      title: frontmatter?.title || "Untitled Blog",
      tags: frontmatter?.tags || []
    };
  });
});

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const filteredBlogs = computed(() => {
  let filtered = blogs.value;

  if (selectedCategory.value !== "All") {
    filtered = filtered.filter((blog) =>
      blog.tags.includes(selectedCategory.value)
    );
  }

  if (searchQuery.value) {
    filtered = filtered.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});
</script>

<style scoped>
.categories {
  margin-bottom: 1.5rem;
}

.active {
  font-weight: bold;
  color: #0073e6;
}

.blog-item {
  margin-bottom: 1.5rem;
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

.blog-tags {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.blog-tag {
  display: inline-block;
  background: #f0f0f0;
  color: #555;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}
</style>
