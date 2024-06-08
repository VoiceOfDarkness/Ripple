import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"], // .jsx uzantısını ekleyin
  },
  server: {
    open: true,
  },
});
