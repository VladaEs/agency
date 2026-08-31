import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8765',
        changeOrigin: true,
      },
    },
  },
 
})
