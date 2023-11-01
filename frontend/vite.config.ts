/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/project2",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/vitest-setup.ts"],
  },
});
