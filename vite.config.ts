import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // base
  resolve: {
    alias: {
      '@': '/packages/'
    },
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es']
    },
    rollupOptions: {
      // external: /^lit/
    }
  }
})
