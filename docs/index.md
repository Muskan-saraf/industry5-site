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
    // Example blog data (Replace with a backend call if using a dynamic framework)
    const blogs = [
      { title: "How AI is Shaping Industry 5.0", url: "/blog/ai-industry5", date: "2025-01-24" },
      { title: "Human-Centric Design in the Future of Manufacturing", url: "/blog/human-centric-design", date: "2025-01-23" },
      { title: "The Role of Cobots in Industry 5.0", url: "/blog/cobots", date: "2025-01-22" },
    ];

    // Sort blogs by date (most recent first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render blogs
    const latestBlogsContainer = document.getElementById("latest-blogs");
    blogs.forEach(blog => {
      const blogItem = document.createElement("div");
      blogItem.innerHTML = `<a href="${blog.url}">${blog.title}</a>`;
      latestBlogsContainer.appendChild(blogItem);
    });
  }
</script>
