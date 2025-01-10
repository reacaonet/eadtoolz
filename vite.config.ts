<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
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
=======
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)
