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
    const blogImports = import.meta.glob('/blog/*.md');

    const blogs = [];
    for (const path in blogImports) {
      blogs.push({
        url: path.replace(/^\/blog/, '/blog'), // Construct the correct URL
        title: path.split('/').pop().replace('.md', ''), // Derive the title from the filename
        date: "2025-01-01", // Placeholder date (use frontmatter for actual dates)
      });
    }

    // Sort blogs by date (update if dates are dynamic from frontmatter)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render blogs dynamically
    const latestBlogsContainer = document.getElementById("latest-blogs");
    blogs.forEach(blog => {
      const blogItem = document.createElement("div");
      blogItem.innerHTML = `<a href="${blog.url}">[${blog.title}](${blog.url})</a>`;
      blogItem.style.marginBottom = "8px"; // Optional: Add spacing
      latestBlogsContainer.appendChild(blogItem);
    });
  }
</script>
