import DefaultTheme from "vitepress/theme";
import Theme from "./theme.vue"; // ✅ Use your custom theme file

export default {
  ...DefaultTheme,
  Layout: Theme, // ✅ Override the default layout
};
