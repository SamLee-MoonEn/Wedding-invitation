import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Wedding-invitation/',
  build: {
    outDir: 'docs',
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