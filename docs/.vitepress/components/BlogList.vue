<template>
  <div class="blog-list">
    <div v-for="post in posts" :key="post.url" class="blog-item">
      <div class="blog-date">{{ formatDate(post.date) }}</div>
      <a :href="post.url" class="blog-title">{{ post.title }}</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'BlogList',
  setup() {
    const posts = ref([])

    onMounted(async () => {
      // Get all blog posts
      const blogFiles = import.meta.glob('/blog/*.md')
      
      const blogPosts = await Promise.all(
        Object.entries(blogFiles).map(async ([path, loadPost]) => {
          const { frontmatter } = await loadPost()
          return {
            url: path.replace(/^\/blog/, '').replace(/\.md$/, ''),
            title: frontmatter.title || path.split('/').pop().replace('.md', ''),
            date: frontmatter.date || new Date(0)
          }
        })
      )

      // Sort by date, most recent first
      posts.value = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      posts,
      formatDate
    }
  }
})
</script>

<style scoped>
.blog-list {
  margin-top: 2rem;
}

.blog-item {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.blog-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.blog-title {
  font-size: 1.1rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.blog-title:hover {
  text-decoration: underline;
}
</style>
