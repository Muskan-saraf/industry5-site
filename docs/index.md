<!-- Industry 5.0 Hub Homepage -->

# Welcome to the Industry 5.0 Hub

Discover how humans and advanced technologies collaborate to create a sustainable and personalized future.

---

## Featured Topics

### [What is Industry 5.0?](/categories/what-is-industry5)
Explore the principles and innovations of Industry 5.0.

### [Tools & Templates](/resources/tools)
Get access to essential tools and templates for implementation.

### [Case Studies](/categories/case-studies)
Learn from real-world Industry 5.0 examples.

---

## Latest Blog Posts
<div id="latest-blogs"></div>

<script>
  if (typeof window !== 'undefined') {
    // Dynamically import all `.md` files from the `/blog` folder
    const blogImports = import.meta.glob('/blog/*.md', { eager: true });

    const blogs = [];
    for (const path in blogImports) {
      const blog = blogImports[path];
      blogs.push({
        url: path.replace('.md', ''), // Remove `.md` from the URL for proper routing
        title: blog.title || path.split('/').pop().replace('.md', ''), // Use title from frontmatter or filename
      });
    }

    // Render blog titles dynamically in the same format as Featured Topics
    const latestBlogsContainer = document.getElementById("latest-blogs");
    blogs.forEach(blog => {
      const blogItem = document.createElement("div");
      blogItem.innerHTML = `### <a href="${blog.url}" style="text-decoration: none; color: inherit;">${blog.title}</a>`;
      blogItem.style.marginBottom = "8px"; // Add some spacing between blog items
      latestBlogsContainer.appendChild(blogItem);
    });
  }
</script>
