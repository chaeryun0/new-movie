import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      page: "/src/page",
      components: "/src/components",
      storage: "/src/storage",
      api: "/src/api",
      assets: "/src/assets",
    },
  },
});
