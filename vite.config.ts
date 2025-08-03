import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'framer-motion', '@react-three/fiber', '@react-three/drei']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['@react-three/fiber', '@react-three/drei', 'three'],
          animations: ['framer-motion'],
          ui: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
