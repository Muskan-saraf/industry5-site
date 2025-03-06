<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AdSection from "./components/AdSection.vue";
import { Content } from "vitepress";
</script>

<template>
  <div>
    <!-- ✅ Fixed Header -->
    <Header />

    <!-- ✅ Add spacing to push content down -->
    -<div class="spacer"></div>

    <!-- ✅ Ad Section (Properly Separated) -->
    <div class="ad-wrapper">
      <AdSection />
    </div>

    <!-- ✅ Main Content -->
    <div class="container">
      <main>
        <Content /> <!-- ✅ Loads Markdown content -->
      </main>
    </div>

    <!-- ✅ Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* ✅ Push content down to avoid overlap */
.spacer {
  height: 100px; /* Adjust this to match your header height */
}

/* ✅ Ensure Ad Section is correctly positioned */
.ad-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;

}

/* ✅ Ensure content is not hidden under navbar */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

main {
  padding: 20px;
}

/* ✅ Fixed Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #4169E1;
}
</style>
