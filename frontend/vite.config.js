import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' garante que as rotas de assets funcionem no GitHub Pages
  base: "./",
  server: {
    port: 5173
  }
});
