import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Habilita la observación en algunos sistemas de archivos
    },
    hmr: true, // Habilita Hot Module Replacement
  },
});
