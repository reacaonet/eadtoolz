import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    force: true // Force the server to restart
  },
  clearScreen: false,
  // Force browser to reload and clear cache
  optimizeDeps: {
    force: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
