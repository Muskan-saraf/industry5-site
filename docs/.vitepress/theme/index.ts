import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";

export default {
  ...DefaultTheme,
  Layout, // ✅ Ensures only one layout is used
};

