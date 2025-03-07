<template>
  <div>
    <!-- Blog List -->
    <div v-if="filteredBlogs.length === 0" class="no-blogs">
      <p>No blogs found for the selected category.</p>
    </div>
    <ul v-else class="blog-list">
      <li v-for="post in filteredBlogs" :key="post.url" class="blog-item">
        <a :href="post.url" class="blog-title">{{ post.title }}</a>
        <div class="blog-metadata">
          <span class="blog-date">{{ formatDate(post.date) }}</span>
          <div v-if="post.tags.length" class="blog-tags">
            Tags:
            <span v-for="tag in post.tags" :key="tag" class="blog-tag">
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

// ✅ Props for category filtering
const props = defineProps(["selectedCategory"]);
const blogs = ref([]);

// ✅ Function to format date
const formatDate = (date) => {
  if (!date) return "Date not provided";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

// ✅ Fetch blog metadata
onMounted(() => {
  const blogFiles = import.meta.glob("/blog/*.md", { eager: true });

  blogs.value = Object.entries(blogFiles)
    .map(([path, mod]) => {
      console.log("Blog Module:", mod); // Debugging output

      // ✅ Fix: Extract frontmatter properly
      let frontmatter = mod.frontmatter || mod.__pageData?.frontmatter || mod.default?.frontmatter || {};

      return {
        url: path.replace("/blog", "/industry5-site/blog").replace(".md", ""),
        title: frontmatter.title || "Untitled Blog",
        tags: frontmatter.tags || [],
        date: frontmatter.date || null,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log("Processed Blogs:", blogs.value); // ✅ Debugging
});

// ✅ Filter blogs based on category
const filteredBlogs = computed(() => {
  if (!props.selectedCategory || props.selectedCategory === "All") {
    return blogs.value;
  }
  return blogs.value.filter((blog) => blog.tags.includes(props.selectedCategory));
});
</script>

<style scoped>


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
  color: black;
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
