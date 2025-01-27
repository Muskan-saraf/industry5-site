# Blog

<script setup>
import { ref, onMounted } from "vue";

// Reference to hold the blog posts
const posts = ref([]);

onMounted(async () => {
  // Globally import all Markdown files in the '/blog/' folder eagerly
  const blogFiles = import.meta.glob('/blog/*.md', { eager: true });

  // Map each file to extract frontmatter and construct post objects
  const blogPosts = Object.entries(blogFiles).map(([path, module]) => {
    const { frontmatter } = module;

    // Return an object for each blog post
    return {
      url: `/industry5-site${path.replace('.md', '')}`, // Generate the blog post URL
      title: frontmatter?.title || "Untitled Post", // Use frontmatter title or fallback
      date: frontmatter?.date || '1970-01-01', // Use frontmatter date or fallback
    };
  });

  // Sort posts by date in descending order (newest first)
  posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Debugging: Log the posts to ensure correct data
  console.log("Loaded blog posts:", posts.value);
});

// Function to format date in "Month Day, Year" format
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<!-- Render the list of blog posts -->
<div v-for="post in posts" :key="post.url" class="blog-item">
  <a :href="post.url" class="blog-title">{{ post.title }}</a>
  <div class="blog-date">{{ formatDate(post.date) }}</div>
</div>

<style scoped>
/* Styling for blog items */
.blog-item {
  margin-bottom: 1.5rem;
}

/* Styling for blog dates */
.blog-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

/* Styling for blog titles */
.blog-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-decoration: none;
}

/* Hover effect for titles */
.blog-title:hover {
  text-decoration: underline;
}
</style>
