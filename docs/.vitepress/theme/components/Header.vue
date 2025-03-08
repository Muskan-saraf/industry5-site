<template>
  <header>
    <div class="header-container">
      <div class="logo-container">
        <!-- ✅ Clicking the logo resets selected tag (Shows all blogs) -->
        <a href="/industry5-site/" class="logo" @click.prevent="resetTag">
          Industry 5.0 Hub
        </a>
      </div>

      <div class="spacer"></div>

      <div class="button-container">
        <a href="/industry5-site/subscribe" class="header-btn">📩 Subscribe</a>
        <a href="/industry5-site/contact" class="header-btn">Contact</a>
      </div>
    </div>

    <nav class="menu-container">
      <div class="menu">
        <a
          v-for="category in categories"
          :key="category"
          href="#"
          class="menu-item"
          :class="{ active: category === selectedTag }"
          @click.prevent="selectCategory(category)"
        >
          {{ category }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useTagStore } from "../composables/useTagStore"; // ✅ Import shared state

const { selectedTag, selectTag } = useTagStore();

// ✅ Menu categories that should filter blogs
const categories = ["Industry 5.0 Tech", "Human Centric", "Sustainability"];

// ✅ Function to reset the selected tag (Show all blogs)
const resetTag = () => {
  selectTag(null);
};

// ✅ Function to select a category and filter blogs
const selectCategory = (category) => {
  selectTag(category);
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
  flex: 3; /* Ensures it stays slightly left */
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
  flex: 1; /* Keeps the layout responsive */
}

/* ✅ Right-Aligned Buttons */
.button-container {
  display: flex;
  gap: 15px;
  flex: 3; /* Ensures buttons stay on the right */
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
