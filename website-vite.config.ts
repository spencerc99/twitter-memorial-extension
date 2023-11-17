import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const src = resolve(__dirname, "src");
const pagesDir = resolve(src, "pages");
const assetsDir = resolve(src, "assets");
const publicDir = resolve(__dirname, "website-public");

export default defineConfig({
  resolve: {
    alias: {
      "@src": src,
      "@assets": assetsDir,
      "@pages": pagesDir,
    },
  },
  base: "/",
  plugins: [react()],
  publicDir,
  build: {
    outDir: resolve(__dirname, "website-dist"),
    sourcemap: process.env.__DEV__ === "true",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
