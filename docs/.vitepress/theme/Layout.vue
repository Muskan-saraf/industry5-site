<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AdSection from "./components/AdSection.vue";
import { Content, useData } from "vitepress";

const { page } = useData();

// ✅ List of pages where the ad should be hidden
const hideAdOnPages = ["subscribe", "contact"];
const shouldHideAd = hideAdOnPages.includes(page.value.relativePath?.replace(".md", ""));
</script>

<template>
  <div>
    <!-- ✅ Header (keeps it visible) -->
    <Header />


    <!-- ✅ Ad Section (Only shown on other pages) -->
    <div class="ad-wrapper" v-if="!shouldHideAd">
      <AdSection />
    </div>

    <!-- ✅ Main Content -->
    <div class="container">
      <main>
        <Content />
      </main>
    </div>

    <!-- ✅ Footer (Always Visible) -->
    <Footer />
  </div>
</template>

<style scoped>
.spacer {
  height: 100px;
}

.ad-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

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
</style>
