import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgrPlugin({ svgrOptions: { icon: true } })],
  base: "/GeetSunam-Nepali-Music-Streaming-Platform/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
