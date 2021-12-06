import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/packages/'
    },
  },
  build: {
    lib: {
      entry: 'packages/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^(lit)/,
      output: {
        manualChunks: {
          icons: ['ionicons/icons']
        },
        chunkFileNames: "[name]-[hash].js",
      }
    }
  }
})
