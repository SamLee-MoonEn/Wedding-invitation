import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
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