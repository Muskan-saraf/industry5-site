<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AdSection from "./components/AdSection.vue";
import { Content, useData } from "vitepress";

const { page } = useData();
</script>

<template>
  <div>
    <Header />
    
    <!-- ✅ Only One Ad Section -->
    <div class="ad-wrapper">
      <AdSection />
    </div>

    <!-- ✅ Only One Main Content -->
    <div class="container">
      <main>
        <Content />
      </main>
    </div>

    <!-- ✅ Only One Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* ✅ Adds space between the header and content */
.ad-wrapper {
  margin-top: 120px;
  display: flex;
  justify-content: center;
}

/* ✅ Page container */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

main {
  padding: 20px;
}

/* ✅ Responsive styles */
@media (max-width: 768px) {
  .ad-wrapper {
    margin-top: 60px;
  }

  .container {
    max-width: 95%;
    padding: 15px;
  }

  main {
    padding: 15px;
  }
}
</style>
