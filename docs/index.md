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
    // Dynamically import all `.md` files from the `blog` folder
    const blogImports = import.meta.glob('/blog/*.md', { eager: true });

    const blogs = [];
    for (const path in blogImports) {
      const blog = blogImports[path];
      blogs.push({
        url: path.replace('.md', ''), // Remove `.md` for proper routing
        title: blog.title || path.split('/').pop().replace('.md', ''), // Use frontmatter title or filename
        date: blog.date || '1970-01-01', // Use frontmatter date or default to a very old date
      });
    }

    // Sort blogs by date (most recent first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render the top 5 latest blogs dynamically
    const latestBlogsContainer = document.getElementById("latest-blogs");
    blogs.slice(0, 5).forEach(blog => {
      const blogItem = document.createElement("div");
      blogItem.innerHTML = `### [${blog.title}](${blog.url})`;
      blogItem.style.marginBottom = "12px"; // Add spacing between blog titles
      latestBlogsContainer.appendChild(blogItem);
    });
  }
</script>

