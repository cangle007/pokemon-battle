import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/pokemonAPI-elevenlabs.io/' : '/',
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
}));
