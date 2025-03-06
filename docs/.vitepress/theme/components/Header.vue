<template>
  <header>
    <!-- Logo Section -->
    <div class="logo-container">
      <div class="logo">
        <a href="/">Industry 5.0 Hub</a>
      </div>
    </div>

    <!-- Navigation Menu with Categories -->
    <nav class="menu-container">
      <div class="menu">
        <a 
          v-for="category in categories" 
          :key="category"
          @click.prevent="selectCategory(category)"
          :class="{ active: selectedCategory === category }"
          class="menu-item"
        >
          {{ category }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const categories = ref([
    "Industry 5.0 Tech",
    "Human Centric",
  "Sustainability"
]);

const selectedCategory = ref("All");

// Emit the selected category to parent
const emit = defineEmits(["categorySelected"]);
const selectCategory = (category) => {
  selectedCategory.value = category;
  emit("categorySelected", category);
};
</script>

<style scoped>
/* ✅ Logo Section (Light Blue) */
.logo-container {
  width: 100%;
  background: #4169E1; /* Light Blue */
  display: flex;

  justify-content: center;
  align-items: center;
  padding: 15px 0;
}

/* ✅ Logo Styling */
.logo a {
  font-size: 60px;
  font-weight: bold;
  font-family: Decorative;
  color: white;
  text-decoration: none;
}

/* ✅ Menu Section (Black) */
.menu-container {
  width: 100%;
  background: #FEFEFA; /* Black */
  display: flex;
  justify-content: center;
}

/* ✅ Navigation Menu */
.menu {
  display: flex;
  gap: 20px;
  justify-content: center;
  max-width: 1200px; /* Align with content */
  width: 100%;
  padding: 10px 0;
}

.menu a {
  font-size: 14px;
  color: #92a0ad;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 15px;
}

.menu a:hover {
  color: #4169E1; /* Light Blue Hover Effect */
}
</style>