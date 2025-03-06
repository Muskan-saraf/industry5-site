<template>
  <div v-if="latestBlogs.length > 0" class="latest-blogs-container">
    <h2>Latest Blog Posts</h2>
    <ul class="blog-list">
      <li v-for="(blog, index) in latestBlogs" :key="index" class="blog-item">
        <!-- Blog Title -->
        <a :href="blog.url" class="blog-title">{{ blog.title }}</a>

        <!-- Blog Metadata -->
        <div class="blog-metadata">
          <span class="blog-date">{{ formatDate(blog.date) }}</span>
          <div v-if="blog.tags.length" class="blog-tags">
            Tags:
            <span
              v-for="tag in blog.tags"
              :key="tag"
              class="blog-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-else class="no-blog-container">
    <p>No blog found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// Reactive state to store all blogs
const blogs = ref([]);

// Utility function to format dates
const formatDate = (date) => {
  if (!date) return "Date not provided";
  const options = { 
    year: "numeric", 
    month: "long", 
    day: "numeric",
    timeZone: "UTC", // Ensure consistent date display
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Fetch blogs and sort them by date
onMounted(() => {
  const blogFiles = import.meta.glob("/blog/*.md", { eager: true });


  blogs.value = Object.entries(blogFiles)
    .map(([path, mod]) => {
      console.log("module for path:", path, mod); // Debug log for modules

      // Extract frontmatter (handle both `__pageData` and `frontmatter`)
      let frontmatter = {};
      if (mod.__pageData) {
        const pageData =
          typeof mod.__pageData === "string"
            ? JSON.parse(mod.__pageData)
            : mod.__pageData;
        frontmatter = pageData.frontmatter || {};
      }
      if (!Object.keys(frontmatter).length && mod.frontmatter) {
        frontmatter = mod.frontmatter;
      } else if (!Object.keys(frontmatter).length && mod.default?.frontmatter) {
        frontmatter = mod.default.frontmatter;
      }

      const basePath = "/industry5-site"; // Adjust base path based on VitePress config

      return {
        url: path
          .replace("../docs/blog", `${basePath}/blog`) // Include base path
          .replace(".md", ""), // Remove .md for clean URLs
        title: frontmatter.title || "Untitled Blog",
        tags: frontmatter.tags || [],
        date: frontmatter.date || null,
      };
    })
    // Sort blogs by date in descending order
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Compute the top 5 newest blogs
const latestBlogs = computed(() => blogs.value.slice(0, 5)); // Get first 5 blogs
</script>

<style scoped>
.latest-blogs-container {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.blog-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.blog-item {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.blog-title:hover {
  text-decoration: underline;
}

.blog-metadata {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  color: #555;
}

.blog-date {
  margin-right: 1rem;
  font-style: italic;
}

.blog-tags {
  margin-top: 0.3rem;
}

.blog-tag {
  display: inline-block;
  background: #f0f0f0;
  color: #555;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.no-blog-container {
  color: #777;
}
</style>
