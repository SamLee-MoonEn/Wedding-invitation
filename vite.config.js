import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Wedding-invitation/',
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['firebase/app', 'firebase/firestore'],
          ui: ['swiper', 'aos']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
}) 