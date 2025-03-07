<template>
  <header>
    <!-- Header Container (Contains Logo & Buttons) -->
    <div class="header-container">
      <!-- Left Section: Logo (Positioned Above Content, Slightly Left) -->
      <div class="logo-container">
        <a href="/" class="logo">Industry 5.0 Hub</a>
      </div>

      <!-- Spacer to Maintain Positioning -->
      <div class="spacer"></div>

      <!-- Right Section: Buttons (Positioned Above Content, Slightly Right) -->
      <div class="button-container">
        <button class="header-btn">Subscribe</button>
        <button class="header-btn">Contact</button>
      </div>
    </div>

    <!-- Navigation Menu -->
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
/* ✅ Header Container */
.header-container {
  width: 100%;
  background: #4169E1; /* Light Blue */
  display: flex;
  align-items: center;
  padding: 15px 5%; /* 5% padding makes it responsive */
}

/* ✅ Left-Aligned Logo */
.logo-container {
  display: flex;
  flex: 1; /* Ensures it stays slightly left */
}

.logo {
  font-size: 30px;
  font-weight: bold;
  font-family: Decorative;
  color: white;
  text-decoration: none;
}

/* ✅ Spacer for Centering */
.spacer {
  flex: 2; /* Keeps the layout responsive */
}

/* ✅ Right-Aligned Buttons */
.button-container {
  display: flex;
  gap: 15px;
  flex: 1; /* Ensures buttons stay on the right */
  justify-content: flex-end;
}

/* ✅ Buttons */
.header-btn {
  background: white;
  color: #4169E1;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.header-btn:hover {
  background: #f0f0f0;
}

/* ✅ Menu Section */
.menu-container {
  width: 100%;
  background: #FEFEFA;
  display: flex;
  justify-content: center;
}

/* ✅ Navigation Menu */
.menu {
  display: flex;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
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
  color: #4169E1;
}

/* ✅ Make it Fully Responsive */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo-container, .button-container {
    flex: none;
    margin-bottom: 10px;
  }

  .button-container {
    justify-content: center;
  }
}
</style>
