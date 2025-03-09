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

      <!-- ✅ Mobile Menu Toggle (Hidden on Desktop) -->
      <button class="menu-toggle" @click="toggleMenu">
        ☰
      </button>

      <!-- ✅ Desktop Buttons (Visible on Laptop) -->
      <div class="button-container">
        <a href="/industry5-site/subscribe.html" class="header-btn" @click="closeMenu">📩 Subscribe</a>
        <a href="/industry5-site/contact.html" class="header-btn" @click="closeMenu">Contact</a>
      </div>
    </div>

    <!-- ✅ Desktop Menu (Always Visible) -->
    <nav class="menu-container" :class="{ open: isMenuOpen || isDesktop }">
      <div class="menu">
       <a
  v-for="category in categories"
  :key="category"
  href="#"
  class="menu-item"
  :class="{ active: category === selectedTag }"
  @click.prevent="updateCategory(category)"
>
  {{ category }}
</a>


        <!-- ✅ Subscribe & Contact Buttons (Mobile Only) -->
        <div class="mobile-buttons" v-if="!isDesktop">
          <a href="/industry5-site/subscribe.html" class="header-btn" @click="closeMenu">📩 Subscribe</a>
          <a href="/industry5-site/contact.html" class="header-btn" @click="closeMenu">Contact</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vitepress";
import { useTagStore } from "../composables/useTagStore";

const { selectedTag, selectTag } = useTagStore();
const categories = ["Industry 5.0 Tech", "Human Centric", "Sustainability"];
const isMenuOpen = ref(false);
const isDesktop = ref(window.innerWidth > 768);
const route = useRoute(); // ✅ Detect route changes

// ✅ Close menu on navigation
watch(route, () => {
  isMenuOpen.value = false;
});

const updateScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
  if (isDesktop.value) isMenuOpen.value = false; // Ensures menu stays closed on resize
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const resetTag = () => {
  selectTag(null);
  closeMenu();
};

import { useRouter } from "vitepress";

const router = useRouter();

const updateCategory = (category) => {
  selectTag(category);
  closeMenu();
  router.go(`/industry5-site/?category=${encodeURIComponent(category)}`);
};

</script>

<style scoped>
/* ✅ Header Container */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #4169e1;
  display: flex;
  align-items: center;
  padding: 15px 5%;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* ✅ Left-Aligned Logo */
.logo-container {
  display: flex;
  flex: 3;
}

.logo {
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

/* ✅ Spacer for Centering */
.spacer {
  flex: 1;
}

/* ✅ Desktop Buttons */
.button-container {
  display: flex;
  gap: 15px;
  flex: 3;
  justify-content: flex-end;
}

.header-btn {
  background: white;
  color: #4169e1;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.header-btn:hover {
  background: #f0f0f0;
}

/* ✅ Mobile Menu Button */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

/* ✅ Menu Section */
.menu-container {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  background: #fefefa;
  display: flex;
  justify-content: center;
  z-index: 999;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
}

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
  color: #4169e1;
}

/* ✅ Responsive Styles */
@media (max-width: 768px) {
  .header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    flex: none;
  }

  /* ✅ Hide buttons on mobile */
  .button-container {
    display: none;
  }

  /* ✅ Show Mobile Menu Button */
  .menu-toggle {
    display: block;
  }

  /* ✅ Mobile Menu */
  .menu-container {
    flex-direction: column;
    align-items: center;
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    display: none;
  }

  .menu-container.open {
    display: flex;
    transform: translateY(0);
  }

  .menu {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .menu a {
    padding: 15px;
    display: block;
    width: 100%;
    text-align: center;
  }

  /* ✅ Mobile Subscribe & Contact Buttons */
  .mobile-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    width: 100%;
    text-align: center;
  }

  .mobile-buttons .header-btn {
    display: block;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
