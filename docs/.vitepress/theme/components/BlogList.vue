<template>
  <div v-if="filteredBlogs.length > 0" class="latest-blogs-container">
    <ul class="blog-list">
      <li v-for="(blog, index) in filteredBlogs" :key="index" class="blog-item">
        <a :href="blog.url" class="blog-title">{{ blog.title }}</a>

        <div class="blog-metadata">
          <span class="blog-date">{{ formatDate(blog.date) }}</span>
          <div v-if="blog.tags.length" class="blog-tags">
            Tags:
            <span
              v-for="tag in blog.tags"
              :key="tag"
              class="blog-tag"
              @click="selectTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- ✅ Display the first 3 lines of content -->
        <p class="blog-excerpt">
          {{ getExcerpt(blog.content, 3) }} 
          <a :href="blog.url" class="read-more">Read More</a>
        </p>
      </li>
    </ul>
  </div>
  <div v-else class="no-blog-container">
    <p>No blog found.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTagStore } from "../composables/useTagStore";
import { useBlogData } from "../composables/useBlogData";

const { selectedTag } = useTagStore();
const { blogs } = useBlogData();

// Filter blogs based on selected tag
const filteredBlogs = computed(() => {
  if (!selectedTag.value) return blogs.value;
  return blogs.value.filter((blog) => blog.tags.includes(selectedTag.value));
});


// Format Date Utility
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

// ✅ Extract first few lines instead of just words
const getExcerpt = (content, sentenceCount = 3) => {
  if (!content) return "No content available.";

  // ✅ Split content by full stops (.) to extract meaningful sentences
  const sentences = content.split(/(?<=\.)\s+/); // Splits sentences correctly
  return sentences.slice(0, sentenceCount).join(" ") + (sentences.length > sentenceCount ? "..." : "");
};

</script>

<style scoped>

/* ✅ Tag Filter Section */
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* Add spacing between buttons */
  margin-bottom: 20px;
}

.tag-button {
  background: #f0f0f0;
  color: #555;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.2s;
}

.tag-button:hover {
  background: #ddd;
}

.tag-button.active {
  background: #4169E1;
  color: white;
}

.read-more {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

/* ✅ Make tags inside blogs clickable with spacing */
.blog-tags {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Space between tags */
}

.blog-tag {
  display: inline-block;
  background: #f0f0f0;
  color: #555;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.blog-tag:hover {
  background: #ddd;
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
