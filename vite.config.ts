import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Relative base so the build works both at the custom domain root
  // (friendlypressurewa.com) and at sakhalteam.github.io/friendly-pressure/.
  base: "./",
});
