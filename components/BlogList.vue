<template>
  <div>
    <!-- Categories -->
    <ul class="categories">
      <li
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="{ active: selectedCategory === category }"
        class="category-item"
      >
        {{ category }}
      </li>
    </ul>

    <!-- Blog List -->
    <div v-if="filteredBlogs.length === 0" class="no-blogs">
      <p>No blogs found for the selected category or search query.</p>
    </div>
    <ul v-else class="blog-list">
      <li v-for="post in filteredBlogs" :key="post.url" class="blog-item">
        <a :href="post.url" class="blog-title">{{ post.title }}</a>
        <div class="blog-metadata">
          <span class="blog-date">{{ formatDate(post.date) }}</span>
          <div v-if="post.tags.length" class="blog-tags">
            Tags:
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="blog-tag"
              @click.stop="selectCategory(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const blogs = ref([]);
const categories = ref([
  "All",
  "Sustainability",
  "Human Centric",
  "Industry 5.0 Tech",
  "Case Study / Applications",
  "Workforce development",
  "Business Strategies",
  "Resources",
]);
const selectedCategory = ref("All");

const formatDate = (date) => {
  if (!date) return "Date not provided";
  const options = { 
    year: "numeric", 
    month: "long", 
    day: "numeric",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

onMounted(() => {
  const blogFiles = import.meta.glob("../docs/blog/*.md", { eager: true });
  blogs.value = Object.entries(blogFiles)
    .map(([path, mod]) => {
      let frontmatter = {};
      if (mod.__pageData) {
        const pageData =
          typeof mod.__pageData === "string"
            ? JSON.parse(mod.__pageData)
            : mod.__pageData;
        frontmatter = pageData.frontmatter || {};
      }
      const basePath = "/industry5-site";
      return {
        url: path.replace("../docs/blog", `${basePath}/blog`).replace(".md", ""),
        title: frontmatter.title || "Untitled Blog",
        tags: frontmatter.tags || [],
        date: frontmatter.date || null,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
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
  return filtered;
});
</script>



<style scoped>
.categories {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

.category-item {
  cursor: pointer;
  font-weight: 500;
  color: #555;
}

.category-item.active {
  font-weight: bold;
  color: #0073e6;
}

.search-bar {
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.no-blogs {
  color: #777;
}

.blog-list {
  list-style: none;
  padding: 0;
}

.blog-item {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.blog-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}

.blog-metadata {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.blog-date {
  margin-right: 1rem;
  font-style: italic;
}

.blog-tags {
  margin-top: 0.5rem;
}

.blog-tag {
  display: inline-block;
  background: #f0f0f0;
  color: #555;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
