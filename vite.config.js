import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from "fs-extra";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

fs.copySync("src/assets", "dist/assets");